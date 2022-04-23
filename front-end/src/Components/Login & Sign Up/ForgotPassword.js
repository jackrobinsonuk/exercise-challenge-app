import { React, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  TextField,
  CircularProgress,
} from "@mui/material";

export default function ForgotPassword(props) {
  const [emailAddress, setEmailAddress] = useState("");
  const [textFieldErrorState, setTextFieldErrorState] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleEmailAddressChange = (event) => {
    setEmailAddress(event.target.value);
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
      <h2>Forgot Password</h2>

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
              onClick={() => props.handleForgotPassword(emailAddress)}
            >
              Send reset code
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

          <div sx={{ paddingTop: "20px" }}>{props.error}</div>
        </FormControl>
      </Box>
    </main>
  );
}
