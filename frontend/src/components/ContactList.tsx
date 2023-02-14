import Grid from "@mui/material/Grid";
import ContactInfo from "./ContactInfo";

import ContactSearchBar from "./ContactSearchBar";

type propsType = {
  show: boolean;
};

const ContactList = (props: propsType) => {
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={5}
      lg={4}
      display={{ xs: props.show ? "block" : "none", md: "block", lg: "block" }}
    >
      <ContactSearchBar />
      <ContactInfo />
      <ContactInfo />
      <ContactInfo />
      <ContactInfo />
      <ContactInfo />
      <ContactInfo />
      <ContactInfo />
      <ContactInfo />
      <ContactInfo />
      <ContactInfo />
      <ContactInfo />
      <ContactInfo />
      <ContactInfo />
      <ContactInfo />
      <ContactInfo />
      <ContactInfo />
    </Grid>
  );
};

export default ContactList;
