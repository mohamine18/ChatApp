import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";

const AreaSearchBar = () => {
  const theme = useTheme();
  return (
    <Box component="div" sx={{ bgcolor: "white", zIndex: 99 }}>
      <Grid
        container
        margin={0.1}
        spacing={1}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid
          container
          item
          spacing={1}
          xs={8}
          flexDirection="row"
          alignItems="center"
        >
          <Grid item xs={3} alignSelf="flex-end">
            <Icon color="primary" fontSize="large">
              arrow_back
            </Icon>
          </Grid>
          <Grid item xs={3}>
            <Avatar alt="menu">B</Avatar>
          </Grid>
          <Grid item xs={6}>
            <Typography component="p" variant="body1" fontWeight="bold">
              Bouras Amine
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={4} alignSelf="flex-end">
          <Icon color="primary" fontSize="large">
            search
          </Icon>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AreaSearchBar;
