import { Box, IconButton, TextField, Icon } from "@mui/material";

const InputArea = () => {
  return (
    <Box
      component="form"
      noValidate
      sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <TextField
        fullWidth
        margin="dense"
        name="inputField"
        id="inputField"
        label="Message"
      />

      <IconButton
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
