import Box from "@mui/material/Box";
import ContactInfo from "./ContactInfo";

type propsType = {
  show: boolean;
};

const ContactList = (props: propsType) => {
  return (
    <Box
      component="div"
      display={{ xs: props.show ? "block" : "none", md: "block", lg: "block" }}
      sx={{
        width: { xs: "100%", sm: "100%", md: "40%" },
        height: "90vh",
        overflowY: { md: "auto" },
      }}
    >
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
    </Box>
  );
};

export default ContactList;
