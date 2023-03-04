// modules imports
import { useContext } from "react";

// MUI imports
import { Icon, IconButton, Toolbar, Typography } from "@mui/material";

// Components import
import SearchBar from "../App Bar/SearchBar";

// context imports
import { ConversationContext } from "../../context/conversationContext";

type propsType = {
  name: string;
};
const AreaBarElement = (props: propsType) => {
  const { clearRecipient } = useContext(ConversationContext);
  const handleBackButton = () => {
    clearRecipient();
  };
  return (
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2, display: { xs: "none", sm: "none", md: "block" } }}
      >
        <Icon>menu</Icon>
      </IconButton>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ display: { xs: "block", sm: "block", md: "none" } }}
        onClick={handleBackButton}
      >
        <Icon>arrow_back</Icon>
      </IconButton>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
      >
        {props.name}
      </Typography>
      <SearchBar section="Contacts" />
    </Toolbar>
  );
};

export default AreaBarElement;
