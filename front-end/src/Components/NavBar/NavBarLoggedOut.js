import * as React from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";

import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const pages = ["Exercise", "Team"];

const NavBarLoggedOut = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link style={{ textDecoration: "none", color: "white" }} to="/">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              Exercise Challenge
            </Typography>
          </Link>

          <Link style={{ textDecoration: "none", color: "white" }} to="/">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              Exercise Challenge
            </Typography>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBarLoggedOut;
