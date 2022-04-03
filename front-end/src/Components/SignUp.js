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

  const handleEmailAddressChange = (event) => {
    setEmailAddress(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
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
          </div>
        </FormControl>
      </Box>
    </main>
  );
}
