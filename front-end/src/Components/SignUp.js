import { React, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  TextField,
  CircularProgress,
} from "@mui/material";

export default function SignUp(props) {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [textFieldErrorState, setTextFieldErrorState] = useState(false);
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [emailAddressFieldWarning, setEmailAddressFieldWarning] = useState("");
  const [passwordFieldWarning, setPasswordFieldWarning] = useState("");
  const [confirmPasswordFieldWarning, setConfirmPasswordFieldWarning] =
    useState("");
  const [warning, setWarning] = useState("");

  const validateEmailAddress = (event) => {
    return String(event)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const analyzeEmailAddress = (event) => {
    if (validateEmailAddress(event.target.value)) {
      setEmailAddressFieldWarning("");
      setWarning("");
    } else {
      setEmailAddressFieldWarning("warning");
      setWarning("Please check your email address.");
    }
  };

  const analyzePassword = (event) => {
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (strongRegex.test(event.target.value)) {
      setPasswordFieldWarning("");
      setWarning("");
    } else {
      setPasswordFieldWarning("warning");
      setWarning(
        "Your password should contain: 1 Uppercase, 1 Lowercase, 1 Number, 1 Symbol"
      );
    }
  };

  const analyzeConfirmPassword = (event) => {
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (strongRegex.test(event.target.value)) {
      setPasswordFieldWarning("");
      setWarning("");
    } else if (confirmPassword !== password) {
      setConfirmPasswordFieldWarning("warning");
      setWarning("Your passwords do not match.");
    } else {
      setPasswordFieldWarning("warning");
      setWarning(
        "Your password should contain: 1 Uppercase, 1 Lowercase, 1 Number, 1 Symbol"
      );
    }
  };

  const handleEmailAddressChange = (event) => {
    setEmailAddress(event.target.value);
    analyzeEmailAddress(event);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    analyzePassword(event);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    analyzeConfirmPassword(event);
  };

  const handleLoginClick = () => {
    props.setSignUpScreen(false);
    props.setLoginScreen(true);
  };

  const handleSignUp = (username, password) => {
    if (password !== confirmPassword) {
      setTextFieldErrorState(true);
      setError("Your passwords do not match, please try again.");
    } else {
      var signUpObject = {
        username: username,
        password: password,
        attributes: { email: username },
      };

      props.handleSignUp(signUpObject);
      setTextFieldErrorState(false);
      setError("");
    }
  };

  if (props.error && textFieldErrorState === false) {
    setTextFieldErrorState(true);
    return;
  }

  if (props.loading && buttonDisabled === false) {
    setButtonDisabled(true);
  } else if (props.loading === false && buttonDisabled === true) {
    setButtonDisabled(false);
  }

  return (
    <main>
      <h2>Sign Up</h2>
      <Box
        component="form"
        autoComplete="off"
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          maxWidth: "500px",
        }}
      >
        <FormControl fullWidth>
          <TextField
            error={textFieldErrorState}
            color={emailAddressFieldWarning}
            required
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            value={emailAddress}
            onChange={handleEmailAddressChange}
            style={{ paddingBottom: "20px" }}
          />

          <TextField
            error={textFieldErrorState}
            color={passwordFieldWarning}
            fullWidth
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            style={{ paddingBottom: "20px" }}
          />
          <TextField
            error={textFieldErrorState}
            color={confirmPasswordFieldWarning}
            fullWidth
            required
            id="outlined-password-input"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            style={{ paddingBottom: "20px" }}
          />
          <div style={{ paddingBottom: "10px" }}>
            <Button
              fullWidth
              variant="contained"
              disabled={buttonDisabled}
              onClick={() => handleSignUp(emailAddress, password)}
            >
              Sign Up
              {props.loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Button>
          </div>
          <div style={{ paddingBottom: "10px" }}>
            <Button fullWidth variant="outlined" onClick={handleLoginClick}>
              Login
            </Button>
          </div>
          <div style={{ color: "red" }}>
            <b>{props.error.toString()}</b>
            <b>{error}</b>
          </div>
          {warning && (
            <div>
              <b>Warning: </b>
              {warning}
            </div>
          )}
        </FormControl>
      </Box>
    </main>
  );
}
