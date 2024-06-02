import "./App.css";

import React, { useEffect, useState } from "react";
import { Grid, Typography, Paper, Divider } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";

const App = (props) => {
  const token = localStorage.getItem("token");

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar userState={logOut}></TopBar>
          </Grid>
          <div className="main-topbar-buffer" />
          {token && (
            <>
              <Grid item sm={3}>
                <Paper
                  className="main-grid-item"
                  variant="contained"
                  sx={{
                    position: "fixed",
                    mt: "30px",
                    p: 1,
                    height: "90%",
                    overflow: "auto",
                  }}
                >
                  <UserList />
                </Paper>
              </Grid>
              <Grid item sm={9}>
                <Paper
                  className="main-grid-item"
                  variant="contained"
                  sx={{
                    justifyContent: "space-between",
                    display: "flex",
                    mt: "60px",
                  }}
                >
                  <Routes>
                    <Route path="/users/:userId" element={<UserDetail />} />
                    <Route path="/photos/:userId" element={<UserPhotos />} />
                    <Route path="/users" element={<UserList />} />
                  </Routes>
                </Paper>
              </Grid>
            </>
          )}
          {!token && (
            <>
              <Grid item xs={12}>
                <Paper
                  sx={{ justifyContent: "center", display: "flex", mt: 20 }}
                  variant="contained"
                >
                  <Typography
                    variant="h3"
                    sx={{ fontFamily: "Arial, sans-serif" }}
                  >
                    Login to use the app!
                  </Typography>
                </Paper>
              </Grid>
            </>
          )}
        </Grid>
      </div>
    </Router>
  );
};

export default App;
