import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";

import { Link as ReactLink } from "react-router-dom";
import Link from "@mui/material/Link";

function Content() {
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />

      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="md"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Exercise Challenge App
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Welcome to the Exercise Challenge. Get started by creating an account.
        </Typography>
      </Container>
      <Container
        disableGutters
        maxWidth="md"
        component="main"
        align="center"
        sx={{ pt: 8, pb: 6 }}
      >
        <ReactLink
          style={{ textDecoration: "none", color: "white" }}
          to="/Login"
        >
          <Button variant="contained" size="large">
            Create Account
          </Button>
        </ReactLink>
      </Container>
      {/* End hero unit */}
    </React.Fragment>
  );
}

export default function Welcome() {
  return <Content />;
}
