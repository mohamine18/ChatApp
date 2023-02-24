import { useContext } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import ContactBarElement from "../Contacts/ContactBarElement";
import AreaBarElement from "../Messages Area/AreaBarElement";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material";

import { ConversationContext } from "../../context/conversationContext";

type propsType = {};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const ChatAppBar = (props: propsType) => {
  const { showArea, recipientName } = useContext(ConversationContext);
  return (
    <Box>
      <AppBar position="fixed">
        {!showArea && <ContactBarElement />}
        {showArea && <AreaBarElement name={recipientName} />}
      </AppBar>
      <Offset />
    </Box>
  );
};

export default ChatAppBar;
