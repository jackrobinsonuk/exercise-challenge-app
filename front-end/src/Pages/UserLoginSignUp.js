import { React, useState } from "react";
import { Auth } from "aws-amplify";

import Login from "../Components/Login";
import SignUp from "../Components/SignUp";

export default function UserLoginSignUp(props) {
  const [loginScreen, setLoginScreen] = useState(true);
  const [signUpScreen, setSignUpScreen] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(username, password) {
    Auth.signIn(username, password)
      .then((result) => {
        props.setIsLoggedIn(true);
        props.setUserName(username);
      })
      .catch((err) => {
        console.log(err);
        setError("Your username or password is incorrect.");
      });
  }

  return (
    <main style={{ padding: "20px" }}>
      {loginScreen && <Login handleLogin={handleLogin} error={error} />}
      {signUpScreen && <SignUp />}
    </main>
  );
}
