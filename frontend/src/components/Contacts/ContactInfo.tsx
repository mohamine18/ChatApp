// modules imports
import { useState, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

// MUI imports
import { Paper, useTheme } from "@mui/material";
import Card from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// context import
import { MainContext } from "../../context/MainContext";

// Utils imports
import { getConversationInfo } from "../../utils/messageFetch";

type propsType = {
  contact: { userId: string; fullName: string; email: string; _id: string };
};

type conversationInfoType = {
  text: string;
  timestamp: Date;
  unreadMessages: number;
};

const ContactInfo = (props: propsType) => {
  const [unread, setUnread] = useState(true);
  const [time, setTime] = useState("");
  const theme = useTheme();

  const { token } = useContext(MainContext);

  const conversationInfoQuery = useQuery({
    queryKey: ["conversationInfo", token, props.contact.userId],
    queryFn: () => getConversationInfo(token!, props.contact.userId),
    onSuccess: (data) => {
      if (data.data.unreadMessages === 0) {
        setUnread(false);
      }
      if (data.data.timestamp !== null) {
        const date = new Date(data.data.timestamp);
        const time = date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        setTime(time);
      }
    },
  });

  return (
    <>
      {conversationInfoQuery.isSuccess ? (
        <Paper
          elevation={8}
          // sx={{ border: `1px solid ${theme.palette.primary.main}`, m: 0.5 }}
          sx={{ m: 0.5 }}
        >
          <Card
            margin={0.3}
            // border={`1px solid `}
            // borderRadius="5px"
          >
            <CardHeader
              avatar={<Avatar></Avatar>}
              action={
                <Box
                  component="div"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Typography component="span" variant="caption">
                    {time}
                  </Typography>
                  {unread && (
                    <Avatar
                      alt="unread messages"
                      sx={{
                        width: 16,
                        height: 16,
                        bgcolor: theme.palette.primary.main,
                      }}
                    >
                      <Typography
                        component="span"
                        variant="caption"
                        color="white"
                      >
                        {conversationInfoQuery.data.data.unreadMessages}
                      </Typography>
                    </Avatar>
                  )}
                </Box>
              }
              title={props.contact.fullName}
              subheader={conversationInfoQuery.data.data.lastMessage || ""}
            ></CardHeader>
          </Card>
        </Paper>
      ) : (
        <></>
      )}
    </>
  );
};
export default ContactInfo;
