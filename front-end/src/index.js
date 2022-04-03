import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Amplify } from "aws-amplify";

import App from "./App";
import "./index.css";

Amplify.configure({
  Auth: {
    userPoolId: process.env.REACT_APP_AMPLIFY_CONFIG_USER_POOL_ID, //UserPool ID
    region: "eu-west-1",
    userPoolWebClientId:
      process.env.REACT_APP_AMPLIFY_CONFIG_USER_POOL_WEB_CLIENT_ID, //WebClientId
    mandatorySignIn: false,
    cookieStorage: {
      domain: process.env.REACT_APP_AMPLIFY_CONFIG_COOKIE_STORAGE_DOMAIN,
      path: "/",
      expires: 365,
      secure: false,
    },
  },
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
