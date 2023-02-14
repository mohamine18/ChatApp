import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Icon from "@mui/material/Icon";

const ariaLabel = { "aria-label": "search" };

const ContactSearchBar = () => {
  const theme = useTheme();
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      search: formData.get("search"),
    };
    console.log(data);
  };
  return (
    <Box
      component="div"
      sx={{
        position: "fixed",
        bgcolor: "white",
        zIndex: 99,
        width: "inherit",
      }}
    >
      <Grid
        container
        spacing={1}
        flexDirection="row"
        alignItems="center"
        margin={0.1}
      >
        <Grid item xs={2}>
          <Icon color="primary" fontSize="large">
            menu
          </Icon>
        </Grid>
        <Grid item xs={9}>
          <Box component="form" noValidate onSubmit={submitHandler}>
            <TextField
              id="search"
              name="search"
              label="Search contact"
              fullWidth
              variant="outlined"
              type="search"
              size="small"
              color="primary"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactSearchBar;
