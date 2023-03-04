// MUI imports
import { Avatar, Box, Typography, useTheme } from "@mui/material";

// utils imports
import timeText from "../../utils/timeText";

type propsType = {
  text: string;
  isMine: boolean;
  time: string;
};

const TextComponent = (props: propsType) => {
  const theme = useTheme();
  const { time } = timeText(props.time);
  return (
    <Box
      alignSelf={props.isMine ? "flex-end" : "flex-start"}
      sx={{
        maxWidth: "90%",
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
          bgcolor: props.isMine
            ? `${theme.palette.primary.main}`
            : `${theme.palette.secondary.main}`,
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
