import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import ContactBarElement from "../Contacts/ContactBarElement";
import AreaBarElement from "../Messages Area/AreaBarElement";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material";

type propsType = {
  show: boolean;
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const ChatAppBar = (props: propsType) => {
  return (
    <Box>
      <AppBar position="fixed">
        {!props.show && <ContactBarElement />}
        {props.show && <AreaBarElement name="Amine Bouras" />}
      </AppBar>
      <Offset />
    </Box>
  );
};

export default ChatAppBar;
