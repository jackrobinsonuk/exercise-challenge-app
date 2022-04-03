import { React } from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Welcome(props) {
  return (
    <main style={{ paddingLeft: "20px" }}>
      <h2>Welcome</h2>

      {props.isLoggedIn === false && (
        <Box>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={"/Login"}
          >
            <Button
              variant="contained"
              style={{ textDecoration: "none", backgroundColor: "black" }}
            >
              Login / Sign Up
            </Button>
          </Link>
        </Box>
      )}
    </main>
  );
}
