import { React, useState } from "react";
import { Box, Button, FormControl, TextField } from "@mui/material";

export default function SignUp(props) {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailAddressChange = (event) => {
    setEmailAddress(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <main style={{ paddingLeft: "20px" }}>
      <h2>Sign Up</h2>
      <Box component="form" autoComplete="off">
        <FormControl>
          <TextField
            required
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            value={emailAddress}
            onChange={handleEmailAddressChange}
            style={{ paddingBottom: "20px" }}
          />

          <TextField
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
            required
            id="outlined-password-input"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            style={{ paddingBottom: "20px" }}
          />

          <Button variant="contained" onSubmit={props.handleSignUp}>
            Sign Up
          </Button>
        </FormControl>
      </Box>
    </main>
  );
}
