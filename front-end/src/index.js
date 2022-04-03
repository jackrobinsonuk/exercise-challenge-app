import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Amplify } from "aws-amplify";

import App from "./App";
import "./index.css";

Amplify.configure({
  Auth: {
    userPoolId: "eu-west-1_9JNiGMW1S", //UserPool ID
    region: "eu-west-1",
    userPoolWebClientId: "72mgu3i2q21m4ngheko7fptlf7", //WebClientId
  },
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
