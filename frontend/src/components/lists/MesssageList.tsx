import { useMessageContext } from "../../contexts/MessageContext";
import { Box, Typography, Paper } from "@mui/material";

const MessageList: React.FC = () => {
  const { messages } = useMessageContext();

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Message List
      </Typography>
      {messages.map((msg) => (
        <Paper key={msg.id} sx={{ padding: 2, marginBottom: 2 }} elevation={2}>
          <Typography variant="body1">
            <strong>{msg.senderName}</strong>: {msg.message}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(msg.timestamp).toLocaleString()}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default MessageList;