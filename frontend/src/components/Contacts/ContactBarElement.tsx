import { useState, useContext } from "react";
import {
  Icon,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchBar from "../App Bar/SearchBar";
import { MainContext } from "../../context/MainContext";

const ContactBarElement = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const authContext = useContext(MainContext);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authContext.logout();
  };
  return (
    <Toolbar>
      <IconButton
        id="menu_button"
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ mr: 2 }}
      >
        <Icon>menu</Icon>
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
      >
        Contacts
      </Typography>
      <SearchBar section="Contacts" />
    </Toolbar>
  );
};

export default ContactBarElement;
