import { React, useState, Fragment } from "react";
import { Box, Button, StepLabel, Step, Stepper } from "@mui/material";

import SignUpYourDetails from "./SignUpYourDetails";
import SignUpPassword from "./SignUpPassword";
import SignUpVerify from "./SignUpVerify";

export default function SignUp(props) {
  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [textFieldErrorState, setTextFieldErrorState] = useState(false);
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [emailAddressFieldWarning, setEmailAddressFieldWarning] = useState("");
  const [passwordFieldWarning, setPasswordFieldWarning] = useState("");
  const [confirmPasswordFieldWarning, setConfirmPasswordFieldWarning] =
    useState("");
  const [warning, setWarning] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [verificationCode, setVerificationCode] = useState("");

  const handleVerificationCodeChange = (event) => {
    setVerificationCode(event.target.value);
  };

  const handleRequestNewCode = () => {
    const username = props.currentUser.user.username;
    props.handleRequestNewCode(username);
  };

  const handleSignUpVerification = (code) => {
    if (code) {
      setButtonDisabled(true);
      const username = props.currentUser.user.username;
      props.handleSignUpVerification(username, code).then(() => {
        setButtonDisabled(false);
        setError("");
        setTextFieldErrorState(false);
      });
    } else {
      setError("Please enter a code.");
      setTextFieldErrorState(true);
    }
  };

  const steps = ["Your details", "Password", "Verify"];

  const handleNext = () => {
    let newSkipped = skipped;

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validateEmailAddress = (event) => {
    return String(event)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const analyzeEmailAddress = (event) => {
    if (validateEmailAddress(event.target.value)) {
      setEmailAddressFieldWarning("");
      setWarning("");
    } else {
      setEmailAddressFieldWarning("warning");
      setWarning("Please check your email address.");
    }
  };

  const analyzePassword = (event) => {
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (strongRegex.test(event.target.value)) {
      setPasswordFieldWarning("");
      setWarning("");
    } else {
      setPasswordFieldWarning("warning");
      setWarning(
        "Your password should contain: 1 Uppercase, 1 Lowercase, 1 Number, 1 Symbol"
      );
    }
  };

  const analyzeConfirmPassword = (event) => {
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (strongRegex.test(event.target.value)) {
      setPasswordFieldWarning("");
      setWarning("");
    } else if (confirmPassword !== password) {
      setConfirmPasswordFieldWarning("warning");
      setWarning("Your passwords do not match.");
    } else {
      setPasswordFieldWarning("warning");
      setWarning(
        "Your password should contain: 1 Uppercase, 1 Lowercase, 1 Number, 1 Symbol"
      );
    }
  };

  const handleEmailAddressChange = (event) => {
    setEmailAddress(event.target.value);
    analyzeEmailAddress(event);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    analyzePassword(event);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    analyzeConfirmPassword(event);
  };

  const handleLoginClick = () => {
    props.setSignUpScreen(false);
    props.setLoginScreen(true);
  };

  const handleSignUp = (username, password) => {
    if (password !== confirmPassword) {
      setTextFieldErrorState(true);
      setError("Your passwords do not match, please try again.");
    } else {
      var signUpObject = {
        username: username,
        password: password,
        attributes: { email: username, name: name },
      };

      props.handleSignUp(signUpObject);
      setTextFieldErrorState(false);
      setError("");
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
      <h2>Sign Up</h2>

      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <Fragment>
          {activeStep === 0 && (
            <SignUpYourDetails
              name={name}
              handleNameChange={handleNameChange}
              textFieldErrorState={textFieldErrorState}
              emailAddressFieldWarning={emailAddressFieldWarning}
              emailAddress={emailAddress}
              handleEmailAddressChange={handleEmailAddressChange}
            />
          )}

          {activeStep === 1 && (
            <SignUpPassword
              textFieldErrorState={textFieldErrorState}
              passwordFieldWarning={passwordFieldWarning}
              password={password}
              handlePasswordChange={handlePasswordChange}
              confirmPasswordFieldWarning={confirmPasswordFieldWarning}
              confirmPassword={confirmPassword}
              handleConfirmPasswordChange={handleConfirmPasswordChange}
            />
          )}

          {activeStep === 2 && (
            <SignUpVerify
              error={error}
              verificationCode={verificationCode}
              textFieldErrorState={textFieldErrorState}
              handleRequestNewCode={handleRequestNewCode}
              handleVerificationCodeChange={handleVerificationCodeChange}
            />
          )}

          <div style={{ color: "red" }}>
            <b>{props.error.toString()}</b>
            <b>{error}</b>
          </div>
          {warning && (
            <div>
              <b>Warning: </b>
              {warning}
            </div>
          )}

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            {activeStep === 0 && <Button onClick={handleNext}>Next</Button>}

            {activeStep === 1 && (
              <Button onClick={() => handleSignUp(emailAddress, password)}>
                Sign Up
              </Button>
            )}

            {activeStep === 2 && (
              <Button
                onClick={() => handleSignUpVerification(verificationCode)}
              >
                Verify
              </Button>
            )}
          </Box>

          <div style={{ paddingTop: "10px" }}>
            <Button fullWidth variant="outlined" onClick={handleLoginClick}>
              Return to Login
            </Button>
          </div>
        </Fragment>
      </Box>
    </main>
  );
}
