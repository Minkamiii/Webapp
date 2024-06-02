import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./styles.css";

export default function LoginPopup({
  children,
  onClose,
  title,
  onClick,
  isOpen,
}) {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" maxHeight="sm">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        {title}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClick} id="login" type="submit">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}
