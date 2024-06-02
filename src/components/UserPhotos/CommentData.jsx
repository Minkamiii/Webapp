import { useState, useEffect } from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Backdrop,
  CircularProgress,
  Divider,
  ListItemIcon,
  Icon,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Person } from "@mui/icons-material";

export default function CommentData({ comment }) {
  const [userCommented, setUserCommented] = useState({});
  const [loading, setLoading] = useState(true);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const request = await fetch(
        `http://localhost:8000/api/user/detail?userId=${comment.user_id}`,
        { headers: headers }
      );
      if (!request.ok) {
        setLoading(false);
        console.error(`HTTP Error! Status ${request.status()}`);
      }
      const result = await request.json();
      setUserCommented(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error on fetching comment user data", error);
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
    <div>
      <ListItem key={comment._id}>
        <ListItemAvatar>
          <Link
            to={`/users/${comment.user_id}`}
            style={{ textDecoration: "none" }}
          >
            <Avatar>{userCommented.first_name[0]}</Avatar>
          </Link>
        </ListItemAvatar>
        <ListItemText>
          <Typography variant="subtitle2">
            <Link
              to={`/users/${comment.user_id}`}
              style={{ textDecoration: "none" }}
            >
              {`${userCommented.first_name} ${userCommented.last_name}`}
            </Link>
          </Typography>
          <Typography variant="caption" color="textSecondary" glutterBottom>
            {comment.date_time}
          </Typography>
        </ListItemText>
      </ListItem>
      <Typography variant="body1" pl={1} pr={1}>
        {`${comment.comment}`}
      </Typography>
      <Divider variant="middle" sx={{ mt: 1 }} />
    </div>
  );
}
