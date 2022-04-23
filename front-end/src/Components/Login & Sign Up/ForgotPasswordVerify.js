import { React, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  TextField,
  CircularProgress,
} from "@mui/material";

export default function ForgotPasswordVerify(props) {
  const [textFieldErrorState, setTextFieldErrorState] = useState(false);
  return (
    <main>
      <div style={{ paddingTop: "10px", paddingBottom: "20px" }}>
        Please check your inbox for the reset code.
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
            error={props.textFieldErrorState}
            required
            id="outlined-basic"
            label="Password Reset Verification Code"
            variant="outlined"
            value={props.resetPasswordVerificationCode}
            onChange={props.handleVerificationCodeChange}
            style={{ paddingBottom: "20px" }}
          />

          <div style={{ paddingTop: "10px", color: "red" }}>
            <b>{props.error}</b>
            <b>{props.error}</b>
          </div>

          {/* {props.error === 'Your code has expired' && (
            <Button variant='outlined' onClick={props.handleForgotPassword}>
              Request a new one?
            </Button>
          )} */}

          <TextField
            error={textFieldErrorState}
            fullWidth
            required
            id="outlined-password-input"
            label="New Password"
            type="password"
            autoComplete="current-password"
            value={props.newPassword}
            onChange={props.handleNewPasswordChange}
            style={{ paddingBottom: "20px" }}
          />
          <TextField
            error={textFieldErrorState}
            fullWidth
            required
            id="outlined-password-input"
            label="Confirm New Password"
            type="password"
            autoComplete="current-password"
            value={props.confirmNewPassword}
            onChange={props.handleConfirmNewPasswordChange}
            style={{ paddingBottom: "20px" }}
          />
          <div style={{ paddingBottom: "10px" }}>
            <Button
              fullWidth
              variant="contained"
              disabled={props.buttonDisabled}
              onClick={props.handleForgotPasswordVerification(
                props.username,
                props.resetPasswordVerificationCode,
                props.confirmNewPassword
              )}
            >
              Set New Password
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
          <div>{props.error}</div>
        </FormControl>
      </Box>
    </main>
  );
}
