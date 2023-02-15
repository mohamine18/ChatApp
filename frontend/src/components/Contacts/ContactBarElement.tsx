import { Icon, IconButton, Toolbar, Typography } from "@mui/material";
import SearchBar from "../App Bar/SearchBar";

const ContactBarElement = () => {
  return (
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
      >
        <Icon>menu</Icon>
      </IconButton>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
      >
        Contacts
      </Typography>
      <SearchBar section="contacts" />
    </Toolbar>
  );
};

export default ContactBarElement;
