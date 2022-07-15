import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import DownloadIcon from "@mui/icons-material/Download";

import axios from "axios";
import fileDownload from "js-file-download";

function Content() {
  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };
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
          Privacy Policy
        </Typography>
      </Container>
      <Container
        disableGutters
        maxWidth="md"
        component="main"
        align="center"
        sx={{ pt: 8, pb: 6 }}
      >
        <Button
          variant="contained"
          size="large"
          endIcon={<DownloadIcon />}
          onClick={() => {
            handleDownload(
              "https://exercise-challenge-app-documents.s3.eu-west-1.amazonaws.com/exercise-challenge-app-privacy-policy.pdf",
              "exercise-challenge-app-privacy-policy.pdf"
            );
          }}
        >
          Download
        </Button>
      </Container>
      {/* End hero unit */}
    </React.Fragment>
  );
}

export default function Privacy() {
  return <Content />;
}
