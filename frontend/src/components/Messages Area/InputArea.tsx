// modules import
import { Dispatch, SetStateAction, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// MUI imports
import { Box, IconButton, TextField, Icon } from "@mui/material";

// Types imports
import { ConversationType } from "./MessagesArea";

// Utils import
import { addMessage } from "../../utils/messageFetch";

// Context import
import { MainContext } from "../../context/MainContext";
import { ConversationContext } from "../../context/conversationContext";

type PropsType = {
  setConversation: Dispatch<SetStateAction<ConversationType[]>>;
};

type MessageData = {
  recipient: string;
  text: string;
};

const InputArea = (props: PropsType) => {
  const { user, token } = useContext(MainContext);
  const { recipientId } = useContext(ConversationContext);
  const queryClient = useQueryClient();

  const addMessageMutation = useMutation({
    mutationKey: ["addMessage"],
    mutationFn: (variables: { token: string; messageData: MessageData }) =>
      addMessage(variables.token, variables.messageData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversation", user?._id, recipientId],
      });
    },
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
