import { useState } from "react";
import { useTheme } from "@mui/material";
import Card from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ContactInfo = () => {
  const [unread, setUnread] = useState(true);
  const theme = useTheme();
  return (
    <Card>
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
              18:00
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
                <Typography component="span" variant="caption" color="white">
                  2
                </Typography>
              </Avatar>
            )}
          </Box>
        }
        title="Bouras Amine"
        subheader="You: good night <:"
      ></CardHeader>
    </Card>
  );
};
export default ContactInfo;
