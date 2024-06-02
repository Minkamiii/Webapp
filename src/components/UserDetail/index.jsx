import React, { useEffect, useState } from "react";
import {
  Divider,
  Grid,
  Typography,
  Button,
  ListItemButton,
  List,
  Backdrop,
  CircularProgress,
} from "@mui/material";

import "./styles.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const user = useParams();
  const [thisUser, setThisUser] = useState({});
  const [loading, setLoading] = useState(true);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const request = await fetch(
        `http://localhost:8000/api/user/detail?userId=${user.userId}`,
        { headers: headers }
      );
      if (!request.ok) {
        setLoading(false);
        throw new Error(`HTTP Error! Status ${request.status}`);
      }
      const result = await request.json();
      setThisUser(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error occured: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    <div>
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  ) : (
    <Grid container>
      <Grid item xs={12}>
        <Typography color="InfoText">
          Full Name:{" "}
          <Typography variant="h6" sx={{pr: 3}}>
            {thisUser.first_name &&
              thisUser.last_name &&
              `${thisUser?.first_name} ${thisUser?.last_name}`}
          </Typography>
        </Typography>
        <Divider variant="middle" />
        <Typography color="InfoText">
          Location: <Typography variant="h6" sx={{pr: 3}}>{thisUser.location}</Typography>
        </Typography>
        <Divider variant="middle" />
        <Typography color="InfoText">
          Occupation:{" "}
          <Typography variant="h6" sx={{pr: 3}}>{thisUser.occupation}</Typography>
        </Typography>
        <Divider variant="middle" />
        <Typography color="InfoText">
          Description:{" "}
          <Typography variant="h6" sx={{pr: 3}}>{thisUser.description}</Typography>
        </Typography>
        <Divider variant="middle" />
      </Grid>
      <Grid item xs={4} />
      <Grid item xs={4} justifyContent="center" spacing={3}>
        <br />
        <Button
          component={Link}
          to={`/photos/${thisUser._id}`}
          color="primary"
          variant="contained"
          size="large"
        >
          See Photo
        </Button>
      </Grid>
      <Grid item xs={4} />
    </Grid>
  );
}

export default UserDetail;
