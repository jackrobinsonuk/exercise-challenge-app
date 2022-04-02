import { React, useState } from "react";
import { Box, Button, FormControl, TextField } from "@mui/material";

export default function Login(props) {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [textFieldErrorState, setTextFieldErrorState] = useState(false);

  const handleEmailAddressChange = (event) => {
    setEmailAddress(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  if (props.error && textFieldErrorState === false) {
    setTextFieldErrorState(true);
    return;
  }

  return (
    <main>
      <h2>Login</h2>

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
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            style={{ paddingBottom: "20px" }}
          />

          <Button
            variant="contained"
            onClick={() => props.handleLogin(emailAddress, password)}
          >
            Login
          </Button>
          <div style={{ paddingTop: "20px" }}>{props.error}</div>
        </FormControl>
      </Box>
    </main>
  );
}
