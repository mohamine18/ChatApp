import Grid from "@mui/material/Grid";
import AreaSearchBar from "./AreaSearchBar";

type propsType = {
  show: boolean;
};

const MessagesArea = (props: propsType) => {
  return (
    <Grid
      item
      xs={12}
      lg={8}
      md={7}
      sm={12}
      display={{ xs: props.show ? "block" : "none", md: "block", lg: "block" }}
    >
      <AreaSearchBar />
      <h1 style={{ border: "red 1px solid" }}> xs = 8</h1>
    </Grid>
  );
};

export default MessagesArea;
