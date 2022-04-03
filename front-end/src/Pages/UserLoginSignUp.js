import { React, useState } from "react";
import { Auth } from "aws-amplify";

import Login from "../Components/Login";
import SignUp from "../Components/SignUp";
import SignUpComplete from "../Components/SignUpComplete";
import SetNewPasswordScreen from "../Components/SetNewPasswordScreen";

export default function UserLoginSignUp(props) {
  const [loginScreen, setLoginScreen] = useState(true);
  const [signUpScreen, setSignUpScreen] = useState(false);
  const [newPasswordScreen, setNewPasswordScreen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signUpComplete, setSignUpComplete] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  function handleLogin(username, password) {
    setLoading(true);
    Auth.signIn(username, password)
      .then((result) => {
        if (result.challengeName === "NEW_PASSWORD_REQUIRED") {
          setNewPasswordScreen(true);
          setLoginScreen(false);
          setCurrentUser(result);
        } else if (result.challengeName !== "NEW_PASSWORD_REQUIRED") {
          props.setUserId(result.attributes.sub);
          props.setUserInfo(result.attributes);
          props.setIsLoggedIn(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (
          err.message ===
          "Password did not conform with policy: Password not long enough"
        ) {
          setError("Your password is not long enough.");
          setLoading(false);
        } else {
          console.log(err.message);
          setError("Your username or password is incorrect.");
          setLoading(false);
        }
      });
  }

  function handleSignUp(username, password) {
    setLoading(true);
    Auth.signUp(username, password)
      .then((result) => {
        setSignUpComplete(true);
        setSignUpScreen(false);
        setCurrentUser(result);
        setLoading(false);
      })
      .catch((err) => {
        if (
          err.message ===
          "Password did not conform with policy: Password not long enough"
        ) {
          setError("Your password is not long enough.");
          setLoading(false);
        } else if (err.message === "User already exists") {
          setError("This user already exists.");
          setLoading(false);
        } else if (
          err.message ===
          "Password did not conform with policy: Password must have lowercase characters"
        ) {
          setError(
            "Your password does not contain at least 1 uppercase, 1 lowercase and 1 symmbol."
          );
          setLoading(false);
        } else {
          console.log(err.message);
          setError("Your username or password is incorrect.");
          setLoading(false);
        }
      });
  }

  function handleSignUpVerification(username, code) {
    console.log("attempt verification");

    Auth.confirmSignUp(username, code)
      .then(() => {
        props.setIsLoggedIn(true);
        setLoading(false);
        setSignUpComplete(false);
      })
      .catch((err) => {
        if (
          err.message === "Invalid code provided, please request a code again."
        ) {
          setError("Your code has expired");
        }
        console.log("error confirming sign up", error);
      });
  }

  function handleRequestNewCode(username) {
    Auth.resendSignUp(username);
  }

  return (
    <main style={{ padding: "20px" }}>
      {loginScreen && (
        <Login
          handleLogin={handleLogin}
          setSignUpScreen={setSignUpScreen}
          setLoginScreen={setLoginScreen}
          error={error}
          loading={loading}
        />
      )}
      {signUpScreen && (
        <SignUp
          handleSignUp={handleSignUp}
          setLoginScreen={setLoginScreen}
          setSignUpScreen={setSignUpScreen}
          setSignUpComplete={setSignUpComplete}
          error={error}
          loading={loading}
        />
      )}
      {signUpComplete && (
        <SignUpComplete
          loading={loading}
          error={error}
          currentUser={currentUser}
          handleSignUpVerification={handleSignUpVerification}
          handleRequestNewCode={handleRequestNewCode}
        />
      )}
      {newPasswordScreen && <SetNewPasswordScreen currentUser={currentUser} />}
    </main>
  );
}
