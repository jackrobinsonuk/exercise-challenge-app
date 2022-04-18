import { React, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  TextField,
  CircularProgress,
} from "@mui/material";

export default function SignUpVerify(props) {
  return (
    <main>
      <div style={{ paddingTop: "10px", paddingBottom: "20px" }}>
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
            error={props.textFieldErrorState}
            required
            id="outlined-basic"
            label="Verification Code"
            variant="outlined"
            value={props.verificationCode}
            onChange={props.handleVerificationCodeChange}
            style={{ paddingBottom: "20px" }}
          />

          <div style={{ paddingTop: "10px", color: "red" }}>
            <b>{props.error}</b>
            <b>{props.error}</b>
          </div>

          {props.error === "Your code has expired" && (
            <Button variant="outlined" onClick={props.handleRequestNewCode}>
              Request a new one?
            </Button>
          )}
        </FormControl>
      </Box>
    </main>
  );
}
