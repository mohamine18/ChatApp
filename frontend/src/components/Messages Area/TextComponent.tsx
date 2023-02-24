import { Avatar, Box, TextField, Typography, useTheme } from "@mui/material";
type propsType = {
  text: string;
  isMine: boolean;
  time: string;
};
const TextComponent = (props: propsType) => {
  const theme = useTheme();
  const date = new Date(props.time);
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <Box
      alignSelf={props.isMine ? "flex-end" : "flex-start"}
      sx={{
        maxWidth: "80%",
        wordBreak: "break-all",
        p: 0.5,
        display: "flex",
        alignItems: "center",
        justifyContent: `${props.isMine ? "end" : "start"}`,
      }}
    >
      {!props.isMine && <Avatar></Avatar>}
      {props.isMine && (
        <Typography component="span" variant="caption">
          {time}
        </Typography>
      )}
      <Box
        component="div"
        sx={{
          bgcolor: `${theme.palette.primary.main}`,
          marginX: "5px",
          color: "white",
          borderRadius: "10px",
        }}
      >
        <Typography component="p" variant="body1" marginX={1}>
          {props.text}
        </Typography>
      </Box>
      {!props.isMine && (
        <Typography component="span" variant="caption">
          {time}
        </Typography>
      )}
      {props.isMine && <Avatar></Avatar>}
    </Box>
  );
};

export default TextComponent;
