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
