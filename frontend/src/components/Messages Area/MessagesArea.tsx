import {
  useTheme,
  Box,
  TextField,
  Icon,
  IconButton,
  Button,
} from "@mui/material";
import InputArea from "./InputArea";
import TextComponent from "./TextComponent";

type propsType = {
  show: boolean;
};

const MessagesArea = (props: propsType) => {
  const theme = useTheme();
  return (
    <Box
      component="div"
      display={{
        xs: props.show ? "flex" : "none",
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
      <Box
        component="div"
        sx={{
          borderRadius: "5px",
          // border: `1px solid ${theme.palette.primary.main}`,
          display: "flex",
          height: "88%",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <TextComponent text="hello world from me" isMine={false} />
        <TextComponent text="hello world from me" isMine={true} />
      </Box>
      <InputArea />
    </Box>
  );
};

export default MessagesArea;
