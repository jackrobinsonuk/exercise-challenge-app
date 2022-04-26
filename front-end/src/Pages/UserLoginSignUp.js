import { React, useState } from "react";
import { Auth } from "aws-amplify";

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Login from "../Components/Login & Sign Up/Login";
import SignUp from "../Components/Login & Sign Up/SignUp";
import SignUpComplete from "../Components/Login & Sign Up/SignUpComplete";
import SetNewPasswordScreen from "../Components/Login & Sign Up/SetNewPasswordScreen";
import ForgotPassword from "../Components/Login & Sign Up/ForgotPassword";
import ForgotPasswordVerify from "../Components/Login & Sign Up/ForgotPasswordVerify";

const theme = createTheme();

export default function UserLoginSignUp(props) {
  const [loginScreen, setLoginScreen] = useState(true);
  const [signUpScreen, setSignUpScreen] = useState(false);
  const [signUpComplete, setSignUpComplete] = useState(false);
  const [newPasswordScreen, setNewPasswordScreen] = useState(false);
  const [forgotPasswordScreen, setForgotPasswordScreen] = useState(false);
  const [
    forgotPasswordVerificationScreen,
    setForgotPasswordVerificationScreen,
  ] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
          console.log(err);
          setError("Your username or password is incorrect. Please try again.");
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
        setLoading(false);
        setSignUpComplete(false);
        setLoginScreen(true);
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

  function handleForgotPassword(username) {
    setLoading(true);

    // Send confirmation code to user's email
    Auth.forgotPassword(username)
      .then((result) => {
        console.log(result);
        setForgotPasswordScreen(false);
        setForgotPasswordVerificationScreen(true);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

  function handleForgotPasswordVerification(username, code, new_password) {
    setLoading(true);
    console.log("attempt reset password verification");

    // Collect confirmation code and new password, then
    Auth.forgotPasswordSubmit(username, code, new_password)
      .then((result) => {
        console.log(result);
        setLoading(false);
        setForgotPasswordVerificationScreen(false);
        setLoginScreen(true);
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

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://exercisechallengeapp.com/">
          Exercise Challenge App
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <main>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />

          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80)",
              backgroundRepeat: "no-repeat",
              backgroundColor: "rgba(0,0,0,.3)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                flexDirection: "column",
              }}
            >
              <Avatar
                sx={{ m: 1, bgcolor: "secondary.main", alignItems: "center" }}
              >
                <LockOutlinedIcon />
              </Avatar>

              {loginScreen && (
                <Login
                  handleLogin={handleLogin}
                  setSignUpScreen={setSignUpScreen}
                  setLoginScreen={setLoginScreen}
                  setForgotPasswordScreen={setForgotPasswordScreen}
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
              {newPasswordScreen && (
                <SetNewPasswordScreen currentUser={currentUser} />
              )}
              {forgotPasswordScreen && (
                <ForgotPassword
                  handleForgotPassword={handleForgotPassword}
                  setLoginScreen={setLoginScreen}
                  setForgotPasswordScreen={setForgotPasswordScreen}
                  setForgotPasswordVerificationScreen={
                    setForgotPasswordVerificationScreen
                  }
                  error={error}
                  loading={loading}
                />
              )}
              {forgotPasswordVerificationScreen && (
                <ForgotPasswordVerify
                  handleForgotPasswordVerification={
                    handleForgotPasswordVerification
                  }
                  setForgotPasswordScreen={setForgotPasswordScreen}
                  setForgotPasswordVerificationScreen={
                    setForgotPasswordVerificationScreen
                  }
                  setLoginScreen={setLoginScreen}
                  error={error}
                  loading={loading}
                />
              )}
            </Box>
          </Grid>
          <Container maxWidth="md" component="footer">
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </Grid>
      </ThemeProvider>
    </main>
  );
}
