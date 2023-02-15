import { Icon, IconButton, Toolbar, Typography } from "@mui/material";
import SearchBar from "../App Bar/SearchBar";

type propsType = {
  name: string;
};
const AreaBarElement = (props: propsType) => {
  return (
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
      >
        <Icon sx={{ display: { xs: "none", sm: "block" } }}>menu</Icon>
        <Icon sx={{ display: { xs: "block", sm: "none" } }}>arrow_back</Icon>
      </IconButton>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
      >
        {props.name}
      </Typography>
      <SearchBar section="conversation" />
    </Toolbar>
  );
};

export default AreaBarElement;
