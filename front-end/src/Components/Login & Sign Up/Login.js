import { React, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  TextField,
  CircularProgress,
  Typography
} from "@mui/material";

export default function Login(props) {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [textFieldErrorState, setTextFieldErrorState] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleEmailAddressChange = (event) => {
    setEmailAddress(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUpClick = () => {
    props.setSignUpScreen(true);
    props.setLoginScreen(false);
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
      <h2>Login</h2>

      <Box component="form" autoComplete="off">
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
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            style={{ paddingBottom: "20px" }}
          />
          <div style={{ paddingBottom: "10px" }}>
            <Button
              fullWidth
              disabled={buttonDisabled}
              type="submit"
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
              variant="contained"
              onClick={() => props.handleLogin(emailAddress, password)}
            >
              Login
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
          <Typography style={{marginLeft:"auto",marginRight:"auto",marginBottom:"10px"}}>or</Typography>

          <div>
            <Button fullWidth variant="outlined" onClick={handleSignUpClick}>
              Sign Up
            </Button>
          </div>

          <div style={{ paddingTop: "20px" }}>{props.error}</div>
        </FormControl>
      </Box>
    </main>
  );
}
