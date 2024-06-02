import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Box,
} from "@mui/material";
import { Close, Send } from "@mui/icons-material";
import { useState } from "react";
import "./styles.css";
import { useHasCommentSent } from "../Useful Component/usePopup";

export default function CommentPopup({ children, onClose, title, newCmt }) {
  const { setNewComment } = newCmt;
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

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="sm"
      maxHeight="sm"
      fullWidth="true"
      scroll="paper"
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        {title}
        <IconButton id="close-popup" onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions sx={{ alignItems: "center", justifyContent: "center" }}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            width: 500,
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
      </DialogActions>
    </Dialog>
  );
}
