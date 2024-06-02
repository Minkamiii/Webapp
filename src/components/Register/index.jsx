import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  TextField,
  Grid,
  List,
  Snackbar,
  Alert,
  Grow,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import { useForm } from "react-hook-form";

function CreateUserSuccessfullySnackbar({ state }) {
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
          Create user successfully
        </Alert>
      </Snackbar>
    </div>
  );
}
function CreateUserFailedSnackBar({ state }) {
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
          Failed to create the user
        </Alert>
      </Snackbar>
    </div>
  );
}

export default function Register({ onClose, isOpen, onOpenLogin }) {
  const [success, setSuccess] = useState({
    submit: false,
    successfully: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const handleLogin = () => {
    onClose();
    onOpenLogin();
  };
  const onClick = async (data) => {
    setSuccess({ submit: false, successfully: null });
    let isError = false;
    if (data.account === "") {
      setError("account", {
        type: "required",
        message: "This field is required",
      });
      isError = true;
    }
    if (data.password === "") {
      setError("password", {
        type: "required",
        message: "This field is required",
      });
      isError = true;
    }
    if (data.confirm === "") {
      setError("confirm", {
        type: "required",
        message: "This field is required",
      });
      isError = true;
    }
    if (data.firstName === "") {
      setError("firstName", {
        type: "required",
        message: "This field is required",
      });
      isError = true;
    }
    if (data.lastName === "") {
      setError("lastName", {
        type: "required",
        message: "This field is required",
      });
      isError = true;
    }
    if (
      data.password !== data.confirm &&
      data.password !== "" &&
      data.confirm !== ""
    ) {
      setError("confirm", { type: "custom", message: "Password do not match" });
      isError = true;
    }
    if (isError) return;
    try {
      const request = await fetch(
        `http://localhost:8000/api/user/check?userName=${data.account}`
      );
      console.log(request);
      if (request.status == 404) {
        try {
          const sendUser = await fetch(
            `http://localhost:8000/api/user/create`,
            {
              method: "post",
              body: JSON.stringify({
                first_name: data.firstName,
                last_name: data.lastName,
                location: data.location,
                description: data.description,
                occupation: data.occupation,
                account: data.account,
                password: data.password,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );
          if (sendUser.ok) {
            setSuccess({ submit: true, successfully: true });
            setTimeout(() => {
              setSuccess({ submit: false, successfully: null });
              onClose();
              onOpenLogin();
            }, 2000);
          } else {
            setSuccess({ submit: true, successfully: false });
            setTimeout(() => {
              setSuccess({ isSubmit: false, successfully: null });
            }, 2000);
          }
        } catch (error) {
          console.error("Error on sending user");
        }
      } else {
        setError("account", { type: "custom", message: "Username exists" });
      }
    } catch (error) {
      console.error("Error on fetching");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" maxHeight="sm">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        Register
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div>
          <TextField
            error={errors.account}
            fullWidth
            autoFocus
            required
            id="username"
            label="Username"
            variant="standard"
            margin="dense"
            helperText={errors.account && errors.account.message}
            {...register("account")}
          />
          <TextField
            error={errors.password}
            fullWidth
            required
            id="password"
            label="Password"
            type="password"
            variant="standard"
            margin="dense"
            helperText={errors.password && errors.password.message}
            {...register("password")}
          />
          <TextField
            error={errors.confirm}
            fullWidth
            required
            id="confirm"
            label="Confirm Password"
            type="password"
            variant="standard"
            margin="dense"
            helperText={errors.confirm && errors.confirm.message}
            {...register("confirm")}
          />
          <List>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  error={errors.firstName}
                  fullWidth
                  required
                  id="firstName"
                  label="First Name"
                  variant="standard"
                  margin="dense"
                  helperText={errors.firstName && errors.firstName.message}
                  {...register("firstName")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={errors.lastName}
                  fullWidth
                  required
                  id="lastName"
                  label="Last Name"
                  variant="standard"
                  margin="dense"
                  helperText={errors.lastName && errors.lastName.message}
                  {...register("lastName")}
                />
              </Grid>
            </Grid>
          </List>
          <TextField
            fullWidth
            id="location"
            label="Location"
            variant="standard"
            margin="dense"
            helperText={null}
            {...register("location")}
          />
          <TextField
            fullWidth
            id="occupation"
            label="Occupation"
            variant="standard"
            margin="dense"
            helperText={null}
            {...register("occupation")}
          />
          <TextField
            fullWidth
            multiline
            id="description"
            label="Description"
            variant="standard"
            margin="dense"
            rows={3}
            helperText={null}
            {...register("description")}
          />
          <Typography
            variant="h6"
            align="center"
            sx={{ marginTop: "10px", fontSize: "16px", marginBottom: "-15px" }}
          >
            {"Having an account?"}
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
              onClick={handleLogin}
            >
              Login here
            </Button>
          </Typography>
        </div>
        {success.submit == true && success.successfully == true ? (
          <CreateUserSuccessfullySnackbar state={success.successfully} />
        ) : (
          success.submit == true &&
          !success.successfully == false && (
            <CreateUserFailedSnackBar state={!success.successfully} />
          )
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit(onClick)} id="login" type="submit">
          Create Account
        </Button>
      </DialogActions>
    </Dialog>
  );
}
