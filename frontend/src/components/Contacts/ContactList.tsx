// modules imports
import { useContext, Dispatch } from "react";
import { useQuery } from "@tanstack/react-query";

// MUI imports
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

//Component imports
import ContactInfo from "./ContactInfo";

// context import
import { MainContext } from "../../context/MainContext";
import { ConversationContext } from "../../context/conversationContext";

// utils imports
import { getContacts } from "../../utils/contactFetch";

type propsType = {};

type contactType = {
  userId: string;
  fullName: string;
  email: string;
  _id: string;
};

const ContactList = (props: propsType) => {
  const { token, isLoggedIn } = useContext(MainContext);
  const { showArea } = useContext(ConversationContext);
  const contactsQuery = useQuery({
    queryKey: ["contacts", token],
    queryFn: () => getContacts(token!),
  });

  return (
    <Box
      component="div"
      display={{
        xs: !showArea ? "block" : "none",
        md: "block",
        lg: "block",
      }}
      sx={{
        width: { xs: "100%", sm: "100%", md: "40%" },
        height: "90vh",
        overflowY: { md: "auto" },
      }}
    >
      {contactsQuery.isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3rem",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}
      {contactsQuery.isSuccess &&
        contactsQuery.data.data.contacts.map((contact: contactType) => (
          <ContactInfo contact={contact} key={contact._id}></ContactInfo>
        ))}
    </Box>
  );
};

export default ContactList;
