import { useEffect, useState } from "react";
import { ModeComment, Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  Grid,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  CardContent,
  Snackbar,
  Alert,
  Grow,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useCommentPopup } from "../Useful Component/usePopup";
import Comment from "./Comment";
import { Person } from "@mui/icons-material";

function CommentSuccessfulSnackBar({ state }) {
  const [open, setOpen] = useState(state);

  const handleClose = (ev, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionComponent={Grow}
        onClose={handleClose}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
          onClose={handleClose}
        >
          Comment added successfully
        </Alert>
      </Snackbar>
    </div>
  );
}
function CommentFailedSnackBar({ state }) {
  const [open, setOpen] = useState(state);

  const handleClose = (ev, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionComponent={Grow}
        onClose={handleClose}
      >
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
          onClose={handleClose}
        >
          Comment added failed
        </Alert>
      </Snackbar>
    </div>
  );
}

export default function LikeAndComment({ item, thisUser }) {
  const [likeIcon, setlikeIcon] = useState(false);
  const { isOpen, openPopup, closePopup } = useCommentPopup();
  const [newComment, setNewComment] = useState();
  const [sendCommentSuccessfully, setSendCommentSuccessfully] = useState(false);
  const [sendCommentFailed, setSendCommentFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const sendComment = async () => {
    try {
      setSendCommentSuccessfully(false);
      setSendCommentFailed(false);
      setLoading(true);
      const request = await fetch(
        `http://localhost:8000/api/user/photo/comment?photoId=${item._id}`,
        {
          method: "post",
          headers: headers,
          body: JSON.stringify({ comment: newComment }),
        }
      );
      if (!request.ok) {
        setSendCommentSuccessfully(false);
        setSendCommentFailed(true);
        setLoading(false);
      }
      setSendCommentSuccessfully(true);
      setLoading(false);
      setNewComment();
      window.location.reload();
    } catch (error) {
      setSendCommentSuccessfully(false);
      setSendCommentFailed(true);
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (newComment != undefined) {
      sendComment();
    }
  }, [newComment]);

  const changeLikeIcon = () => setlikeIcon(!likeIcon);

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
      <Grid item xs={8} key={item._id} sx={{ paddingBottom: "20px" }}>
        <Card>
          <CardHeader
            title={
              <Link
                to={`/users/${thisUser._id}`}
                style={{ textDecoration: "none", color: "blue" }}
              >
                {`${thisUser.first_name} ${thisUser.last_name}`}
              </Link>
            }
            subheader={item.date_time}
            avatar={
              <Link
                to={`/users/${item.user_id}`}
                style={{ textDecoration: "none" }}
              >
                <Avatar>{thisUser.first_name[0]}</Avatar>
              </Link>
            }
          ></CardHeader>
          <CardMedia
            component="img"
            image={`http://localhost:8000/images/${item.file_name}`}
            alt="Maybe a picture about Ronaldo"
          />
          <CardContent>
            <Divider variant="middle" />
            <List>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <ListItemButton
                    onClick={changeLikeIcon}
                    key={item.id}
                    alignItems="center"
                  >
                    <ListItemIcon color="">
                      {likeIcon ? (
                        <Favorite color="error" />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </ListItemIcon>
                    <ListItemText primary="Like" />
                  </ListItemButton>
                </Grid>
                <Grid item xs={6}>
                  <ListItemButton
                    onClick={openPopup}
                    key={item.id}
                    alignItems="center"
                  >
                    <ListItemIcon>
                      <ModeComment />
                    </ListItemIcon>
                    <ListItemText primary="Comment" />
                  </ListItemButton>
                </Grid>
              </Grid>
            </List>
            <Comment
                cmt={item.comments}
                newComment={{ newComment, setNewComment }}
            />
          </CardContent>
        </Card>
      </Grid>
      {sendCommentSuccessfully && (
        <CommentSuccessfulSnackBar state={sendCommentSuccessfully} />
      )}
      {sendCommentFailed && <CommentFailedSnackBar state={sendCommentFailed} />}
    </>
  );
}
