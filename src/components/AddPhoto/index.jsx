import {
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    DialogActions,
    Button,
    ListItemIcon,
    Typography,
    Snackbar,
    Grow,
    Alert,
  } from "@mui/material";
  import { AddAPhoto, Close } from "@mui/icons-material";
  import { styled } from "@mui/material/styles";
  import { useState } from "react";
  import "./addphoto.css";
  
  function AddPhotoSuccessfullySnackbar({ state }) {
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
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
          onClose={handleClose}
        >
          <Alert
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
            onClose={handleClose}
          >
            Photo added successfully
          </Alert>
        </Snackbar>
      </div>
    );
  }
  function AddPhotoFailedSnackBar({ state }) {
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
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
          onClose={handleClose}
        >
          <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
            Failed to add the photo
          </Alert>
        </Snackbar>
      </div>
    );
  }
  
  export default function AddPhoto({ onClose, isOpen }) {
    const [image, setImage] = useState("");
    const [submit, setSubmit] = useState({
      isSubmit: false,
      successfully: null,
    });
    const VisuallyHiddenInput = styled("input")({
      clip: "rect(0 0 0 0)",
      clipPath: "inset(50%)",
      height: 1,
      overflow: "hidden",
      position: "absolute",
      bottom: 0,
      left: 0,
      whiteSpace: "nowrap",
      width: 1,
    });
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  
    const onChange = (ev) => {
      setImage(ev.target.files[0]);
    };
    const cancelPhoto = () => {
      setImage();
    };
    const sendPhoto = async () => {
      setSubmit({ isSubmit: true, successfully: null });
      const formData = new FormData();
      formData.append("file", image);
      try {
        const request = await fetch(
          "http://localhost:8000/api/user/photo/upload",
          {
            method: "post",
            headers: headers,
            body: formData,
          }
        );
        if (request.ok) {
          setSubmit({ successfully: true, isSubmit: true });
          setTimeout(() => {
            setSubmit({ isSubmit: false, successfully: null });
            onClose();
            setImage();
          }, 2000);
          window.location.reload();
        } else {
          setSubmit({ isSubmit: true, successfully: false });
          setTimeout(() => {
            setSubmit({ isSubmit: false, successfully: null });
          }, 2000);
        }
      } catch (error) {
        console.error("Error on sending image", error);
      }
    };
  
    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        maxWidth="sm"
        maxHeight="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          {!image ? "Add Photo" : "Photo Preview"}
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div style={{ justifyContent: "center", display: "flex" }}>
            {image ? (
              <>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded Image"
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "auto",
                  }}
                />
              </>
            ) : (
              <Button
                className="addPhotoDiv"
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                sx={{
                  height: 250,
                  backgroundColor: "lightgray",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  ":hover": {
                    backgroundColor: "rgb(169, 168, 168)",
                  },
                  textTransform: "none",
                }}
                fullWidth
              >
                <ListItemIcon>
                  <AddAPhoto fontSize="large" />
                </ListItemIcon>
                <Typography
                  sx={{
                    position: "relative",
                    m: 2,
                    fontSize: 24,
                    color: "rgb(43, 38, 38)",
                    fontWeight: "bold",
                  }}
                >
                  Add A Photo
                </Typography>
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  id="image-input"
                  name="image-input"
                  onChange={onChange}
                />
              </Button>
            )}
          </div>
          {submit.isSubmit == true && submit.successfully == true ? (
            <AddPhotoSuccessfullySnackbar state={submit.successfully} />
          ) : (
            submit.isSubmit == true &&
            !submit.successfully == false && (
              <AddPhotoFailedSnackBar state={!submit.successfully} />
            )
          )}
        </DialogContent>
        <DialogActions>
          {image && (
            <Button id="cancel-photo" onClick={cancelPhoto}>
              Cancel
            </Button>
          )}
          <Button id="add-photo" type="submit" onClick={sendPhoto}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  