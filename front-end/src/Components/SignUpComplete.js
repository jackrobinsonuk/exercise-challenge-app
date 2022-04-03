import { React, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  TextField,
  CircularProgress,
} from "@mui/material";

export default function SignUpComplete(props) {
  const [textFieldErrorState, setTextFieldErrorState] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState("");

  let username;

  const handleVerificationCodeChange = (event) => {
    setVerificationCode(event.target.value);
  };

  const handleRequestNewCode = () => {
    const username = props.currentUser.user.username;
    props.handleRequestNewCode(username);
  };

  const handleSignUpVerification = (code) => {
    if (code) {
      const username = props.currentUser.user.username;
      props.handleSignUpVerification(username, code);
    } else {
      setError("Please enter a code.");
    }
  };

  return (
    <main>
      <h2>Verify Your Sign Up</h2>
      <div style={{ paddingBottom: "20px" }}>
        Please check your inbox for the verification code.
      </div>

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
            label="Verification Code"
            variant="outlined"
            value={verificationCode}
            onChange={handleVerificationCodeChange}
            style={{ paddingBottom: "20px" }}
          />

          <div style={{ paddingBottom: "10px" }}>
            <Button
              fullWidth
              variant="contained"
              disabled={buttonDisabled}
              onClick={() => handleSignUpVerification(verificationCode)}
            >
              Verify
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

          <div style={{ paddingTop: "10px", color: "red" }}>
            <b>{props.error}</b>
            <b>{error}</b>
          </div>

          {props.error == "Your code has expired" && (
            <Button variant="outlined" onClick={handleRequestNewCode}>
              Request a new one?
            </Button>
          )}
        </FormControl>
      </Box>
    </main>
  );
}
