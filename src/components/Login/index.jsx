import LoginPopup from "./LoginPopup";
import {
  TextField,
  Typography,
  Button,
  Link,
  DialogActions,
  Snackbar,
  Grow,
  Alert,
} from "@mui/material";
import "./styles.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

function LoginFailedSnackBar({ state }) {
  return (
    <div>
      <Snackbar
        open={state}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionComponent={Grow}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          Password not match or Username not exists
        </Alert>
      </Snackbar>
    </div>
  );
}

function LoginSuccessfullSnackBar({ state }) {
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
          Login successfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default function Login({ onClose, isOpen, onOpenRegister }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(null);

  // const headers = {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   },

  const sendData = async (data) => {
    const res = await fetch(`http://localhost:8000/api/user/login`, {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    console.log(res);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
    const result = await res.json();
    if (res.ok) {
      localStorage.setItem("token", result.token);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
      onClose();
      window.location.reload();
    } else {
      setSuccess(false);
    }
  };
  const userNameChange = (ev) => {
    setUserName(ev.target.value);
  };
  const passwordChange = (ev) => {
    setPassword(ev.target.value);
  };
  const handleRegister = () => {
    onClose();
    onOpenRegister();
  };

  return (
    <div>
      <LoginPopup
        onClose={onClose}
        title="Login"
        onClick={handleSubmit(sendData)}
        isOpen={isOpen}
      >
        <TextField
          error={errors.account}
          fullWidth
          autoFocus
          required
          id="username"
          label="Username"
          variant="standard"
          className="textfield"
          margin="dense"
          onChange={userNameChange}
          helperText={errors.account ? "This field is required" : null}
          {...register("account", { required: true })}
        />
        <TextField
          error={errors.password}
          fullWidth
          required
          id="password"
          label="Password"
          type="password"
          variant="standard"
          className="textfield"
          margin="dense"
          onChange={passwordChange}
          helperText={errors.password ? "This field is required" : null}
          {...register("password", { required: true })}
        />
        <Typography
          variant="h6"
          align="center"
          sx={{ marginTop: "10px", fontSize: "16px", marginBottom: "-15px" }}
        >
          {"Not having an account? "}
          <Button
            color="primary"
            component="span"
            sx={{
              textTransform: "none",
              ":hover": {
                backgroundColor: "inherit",
              },
            }}
            margin="dense"
            onClick={handleRegister}
          >
            Register here
          </Button>
        </Typography>
        {!success && <LoginFailedSnackBar state={open} />}
        {success && <LoginSuccessfullSnackBar state={success} />}
      </LoginPopup>
    </div>
  );
}
