import CommentPopup from "./CommentPopup";
import CommentData from "./CommentData";
import { Typography, Grid, Box, TextField, IconButton } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useEffect, useState } from "react";

export default function Comment({ cmt, newComment }) {
  const { setNewComment } = newComment;
  const [comment, setComment] = useState();

  const handleChange = (ev) => {
    setComment(ev.target.value);
  };
  const onSendComment = (ev) => {
    ev.preventDefault();
    setNewComment(comment);
    setComment();
    document.getElementById("new-comment").value = "";
  }; 

  useEffect(()=>{},[cmt])

  return (
    <Grid container  spacing={3}>
      {cmt.length > 0 ? (
        cmt.map((cmt) => 
          <Grid item xs={12}>
            <CommentData comment={cmt} />
          </Grid>
        )
      ) : (
        <Grid item xs={12}>
            <Typography
              sx={{
                fontFamily: "Arial, sans-serif",
                color: "GrayText",
                textAlign: "center",
              }}
            >
              No comment yet, be the first to comment
            </Typography> 
        </Grid>
      )}
      <Grid item xs={12}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            width: 1000,
            maxWidth: "100%",
            display: "flex",
            alignItems: "center",
            "& .MuiTextField-root": { m: 1 },
          }}
          onSubmit={onSendComment}
        >
          <TextField
            id="new-comment"
            fullWidth
            multiline
            placeholder="Aa"
            variant="standard"
            maxRows={5}
            sx={{ mb: 2 }}
            value={comment}
            onChange={handleChange}
          />
          <IconButton
            id="send-comment"
            type="submit"
            sx={{ m: "10px" }}
            aria-label="send"
          >
            <Send color="primary" />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
}
