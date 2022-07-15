import { React } from "react";
import { Box, FormControl, TextField } from "@mui/material";
export default function SignUpYourDetails(props) {
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
            color={props.nameFieldWarning}
            required
            id="outlined-basic"
            label="Your Name"
            variant="outlined"
            value={props.name}
            onChange={props.handleNameChange}
            style={{ paddingBottom: "20px" }}
          />
          <TextField
            error={props.textFieldErrorState}
            color={props.emailAddressFieldWarning}
            required
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            value={props.emailAddress}
            onChange={props.handleEmailAddressChange}
          />
        </FormControl>
      </Box>
    </div>
  );
}
