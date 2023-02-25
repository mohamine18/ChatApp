// modules imports
import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

// MUI imports
import { Box } from "@mui/material";

// components import
import InputArea from "./InputArea";
import TextComponent from "./TextComponent";

// context import
import { MainContext } from "../../context/MainContext";
import { ConversationContext } from "../../context/conversationContext";

// utils import
import { getConversation } from "../../utils/messageFetch";
import timeText from "../../utils/timeText";

type propsType = {};

export type ConversationType = {
  _id: string;
  recipient: string;
  sender: string;
  status: string;
  text: string;
  timestamp: string;
};

const MessagesArea = (props: propsType) => {
  const [conversation, setConversation] = useState<ConversationType[]>([]);
  const { user, token } = useContext(MainContext);
  const { showArea, recipientId } = useContext(ConversationContext);

  const conversationQuery = useQuery({
    queryKey: ["conversation", user?._id, recipientId],
    queryFn: () => {
      if (showArea) return getConversation(token!, recipientId);
      else return null;
    },

    onSuccess: (data) => {
      if (data !== null) setConversation(data.data);
    },
  });

  return (
    <Box
      component="div"
      display={{
        xs: showArea ? "flex" : "none",
        md: "flex",
        lg: "flex",
      }}
      sx={{
        flexDirection: "column",
        justifyContent: "space-between",
        width: { xs: "100%", sm: "100%", md: "60%" },
        height: "90vh",
        position: "sticky",
        top: 0,
        margin: 0.5,
        borderRadius: "5px",
        overflowY: { md: "auto" },
      }}
    >
      {showArea && (
        <>
          <Box
            component="div"
            sx={{
              borderRadius: "5px",
              display: "flex",
              height: "88%",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            {conversation.map((elem: ConversationType) => (
              <TextComponent
                text={elem.text}
                isMine={elem.sender === user?._id ? true : false}
                time={elem.timestamp}
                key={elem._id}
              />
            ))}
          </Box>
          <InputArea setConversation={setConversation} />
        </>
      )}
    </Box>
  );
};

export default MessagesArea;
