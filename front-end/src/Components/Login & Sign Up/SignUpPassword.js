import { React } from "react";
import { Box, FormControl, TextField } from "@mui/material";
export default function SignUpPassword(props) {
  return (
    <div style={{ paddingTop: "10px" }}>
      <Box
        component="form"
        autoComplete="off"
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <FormControl fullWidth>
          <TextField
            error={props.textFieldErrorState}
            color={props.passwordFieldWarning}
            fullWidth
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={props.password}
            onChange={props.handlePasswordChange}
            style={{ paddingBottom: "20px" }}
          />
          <TextField
            error={props.textFieldErrorState}
            color={props.confirmPasswordFieldWarning}
            fullWidth
            required
            id="outlined-password-input"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            value={props.confirmPassword}
            onChange={props.handleConfirmPasswordChange}
            style={{ paddingBottom: "20px" }}
          />
        </FormControl>
      </Box>
    </div>
  );
}
