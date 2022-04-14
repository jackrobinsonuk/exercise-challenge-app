import { React, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  TextField,
  CircularProgress,
} from "@mui/material";
import { Auth } from "aws-amplify";

export default function SetNewPasswordScreen(props) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [textFieldErrorState, setTextFieldErrorState] = useState(false);
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const handlePasswordChangeSubmit = () => {
    if (newPassword === confirmNewPassword) {
      setButtonDisabled(true);
      console.log("set new password");
      const user = props.currentUser;
      Auth.completeNewPassword(user, newPassword).then((response) => {
        if (response.statusCode === 200) {
          setButtonDisabled(false);
        } else console.log("error");
      });
    } else {
      setError("Your passwords do not match.");
      setTextFieldErrorState(true);
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
      <h2>Change Password</h2>
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
            label="Current Password"
            type="password"
            variant="outlined"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            style={{ paddingBottom: "20px" }}
          />

          <TextField
            error={textFieldErrorState}
            fullWidth
            required
            id="outlined-password-input"
            label="New Password"
            type="password"
            autoComplete="current-password"
            value={newPassword}
            onChange={handleNewPasswordChange}
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
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
            style={{ paddingBottom: "20px" }}
          />
          <div style={{ paddingBottom: "10px" }}>
            <Button
              fullWidth
              variant="contained"
              disabled={buttonDisabled}
              onClick={handlePasswordChangeSubmit}
            >
              Change Password
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
          <div>{error}</div>
        </FormControl>
      </Box>
    </main>
  );
}
