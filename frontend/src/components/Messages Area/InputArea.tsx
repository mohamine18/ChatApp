// modules import
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import io from "socket.io-client";

// MUI imports
import { Box, IconButton, TextField, Icon } from "@mui/material";

// Types imports
import { ConversationType } from "./MessagesArea";

// Utils import
import { addMessage, updateMessagesStatus } from "../../utils/messageFetch";

// Context import
import { MainContext } from "../../context/MainContext";
import { ConversationContext } from "../../context/conversationContext";
import { locales } from "validator/lib/isIBAN";

type PropsType = {
  setConversation: Dispatch<SetStateAction<ConversationType[]>>;
};

type MessageData = {
  recipient: string;
  text: string;
};

const socket = io(`http://${location.hostname}:3001`);

const InputArea = (props: PropsType) => {
  const [visible, setVisible] = useState(true);
  const { user, token } = useContext(MainContext);
  const { recipientId, recipientName } = useContext(ConversationContext);
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.emit("joinRoom", user?._id, recipientId);
    socket.on("receiveMessage", () => {
      queryClient.invalidateQueries({
        queryKey: ["conversation", user?._id, recipientId],
      });
      queryClient.invalidateQueries({
        queryKey: ["contacts", token],
      });
      queryClient.invalidateQueries({
        queryKey: ["conversationInfo", token, recipientId],
      });
    });

    return () => {
      socket.emit("leaveRoom", user?._id, recipientId);
    };
  }, [recipientId]);

  const readMessage = useQuery({
    queryKey: ["readMessages", token],
    queryFn: () => updateMessagesStatus(token!, { recipient: recipientId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversationInfo", token, recipientId],
      });
    },
  });

  const addMessageMutation = useMutation({
    mutationKey: ["addMessage"],
    mutationFn: (variables: { token: string; messageData: MessageData }) =>
      addMessage(variables.token, variables.messageData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversation", user?._id, recipientId],
      });
      queryClient.invalidateQueries({
        queryKey: ["contacts", token],
      });
      queryClient.invalidateQueries({
        queryKey: ["conversationInfo", token, recipientId],
      });
    },
    // onError: (error, variables) => {
    //   console.log(error);
    // throw new Error({ message: error.message });
    // },
  });

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const text = formData.get("inputField")!.toString();
    const data = {
      token: token!,
      messageData: {
        recipient: recipientId,
        text,
      },
    };
    event.currentTarget.reset();
    if (text !== "" && text !== " ") addMessageMutation.mutate(data);
    socket.emit(
      "message",
      JSON.stringify({ sender: user?._id, recipient: recipientId })
    );
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      onSubmit={submitHandler}
    >
      <TextField
        fullWidth
        margin="dense"
        name="inputField"
        id="inputField"
        label="Message"
        autoComplete="off"
      />

      <IconButton
        type="submit"
        size="large"
        edge="start"
        sx={{
          bgcolor: "primary.main",
          color: "white",
          height: "50px",
          width: "50px",
          ml: 1,
          "&:hover": {
            color: "white",
            bgcolor: "gray",
          },
        }}
      >
        <Icon>send</Icon>
      </IconButton>
    </Box>
  );
};
export default InputArea;
