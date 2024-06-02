import React, { useEffect, useState } from "react";
import { Grid, Backdrop, CircularProgress, Button, ListItemIcon, Typography } from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";

import "./styles.css";
import { Link, useParams } from "react-router-dom";
import LikeAndComment from "./LikeAndComment";
import { useHasCommentSent } from "../Useful Component/usePopup";
import { useAddPhotoPopup } from "../Useful Component/usePopup";
import AddPhoto from "../AddPhoto";

/**
 * Define UserPhotos, a React component of Project 4.
 */

function UserPhotos() {
  const user = useParams();
  const [thisPhoto, setThisPhoto] = useState([]);
  const [userLogin, setUserLogin] = useState();
  const [thisUser, setThisUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { isPhotoOpen, openPhotoPopup, closePhotoPopup } = useAddPhotoPopup();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const request = await fetch(
        `http://localhost:8000/api/user/photo?userId=${user.userId}`,
        { headers: headers }
      );
      if (!request.ok) {
        setLoading(false);
        throw new Error(`HTTP Error! Status ${request.status}`);
      }
      const result = await request.json();
      setThisPhoto(result);

      const request2 = await fetch(
        `http://localhost:8000/api/user/detail?userId=${user.userId}`,
        { headers: headers }
      );
      if (!request.ok) {
        setLoading(false);
        throw new Error(`HTTP Error! Status ${request.status}`);
      }
      const result2 = await request2.json();
      setThisUser(result2);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error occured", error);
    }
  };
  const fetchUser = async () => {
    try{
      const request = await fetch(`http://localhost:8000/api/user/login`, {headers: headers})
      const result = await request.json();
      setUserLogin(result);
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
    fetchUser();
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
    <>
        <Grid container justifyContent="center" alignItems="center" spacing={3}>
          {userLogin._id == user.userId && (
            <Grid item xs={8} display={"flex"} justifyContent={"center"}>
              <Typography marginTop={1} marginRight={2}>Wanna share a photo?</Typography>
              <Button onClick={openPhotoPopup} sx={{ textTransform: "none" }} variant="contained" startIcon={<AddPhotoAlternate fontSize="small" />}>
                Add Photo
              </Button>
            </Grid>
          )}
          {thisPhoto.map((item) => (
            <LikeAndComment item={item} thisUser={thisUser} />
          ))}
        </Grid>
        <AddPhoto onClose={closePhotoPopup} isOpen={isPhotoOpen}/>
    </>
  );
}

export default UserPhotos;
