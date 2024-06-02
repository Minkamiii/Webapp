import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  Box,
  Icon,
} from "@mui/material";
import Login from "../Login";
import AddPhoto from "../AddPhoto";
import Register from "../Register";
import { useLoginPopup } from "../Useful Component/usePopup";
import { useAddPhotoPopup } from "../Useful Component/usePopup";
import { useRegisterPopup } from "../Useful Component/usePopup";

import "./styles.css";
import { Add, AddPhotoAlternate, Logout } from "@mui/icons-material";
import { Person } from "@mui/icons-material";

/**
 * Define TopBar, a React component of Project 4.
 */

function TopBar({ userState }) {
  const { isOpen, openPopup, closePopup } = useLoginPopup();
  const { isRegisterOpen, openRegisterPopup, closeRegisterPopup } =
    useRegisterPopup();
  const logOut = userState;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const [loginUser, setLoginUser] = useState();

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClickMenu = (ev) => {
    setAnchorEl(ev.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const getUserLogin = async () => {
    try {
      const request = await fetch(
        "http://localhost:8000/api/user/login",
        {
          headers: headers,
        }
      );
      const result = await request.json();
      setLoginUser(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") != undefined) {
      getUserLogin();
    }
  }, [localStorage.getItem("token")]);

  return (
    <AppBar className="topbar-appBar" position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          component="a"
          color="inherit"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            textDecoration: "none",
            flexGrow: 1,
          }}
          href="/"
        >
          Goofy ahh Application
        </Typography>
        {!localStorage.getItem("token") && (
          <Button
            variant="text"
            size="large"
            color="inherit"
            onClick={openPopup}
            sx={{ flexGrow: 0 }}
          >
            Login
          </Button>
        )}
        {localStorage.getItem("token") && (
          <React.Fragment>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account">
                <IconButton
                  onClick={handleClickMenu}
                  size="medium"
                  sx={{ ml: 2 }}
                >
                  <Avatar>{loginUser && loginUser[0]}</Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openMenu}
              onClose={handleCloseMenu}
              onClick={handleCloseMenu}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={logOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Log Out
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
        <Login
          onClose={closePopup}
          isOpen={isOpen}
          onOpenRegister={openRegisterPopup}
        />
        <Register
          onClose={closeRegisterPopup}
          isOpen={isRegisterOpen}
          onOpenLogin={openPopup}
        />
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
