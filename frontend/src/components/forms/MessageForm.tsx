import { useState } from "react";
import { sendMessage } from "../../api/messages";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useMessageContext } from "../../contexts/MessageContext";
import { getMessages } from "../../api/messages";

const MessageForm: React.FC = () => {
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent duplicate submissions
  const { setMessages } = useMessageContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);
    try {
      await sendMessage(senderName, message);
      setSenderName("");
      setMessage("");

      const updatedMessages = await getMessages();
      setMessages(updatedMessages);
    } catch(err) {
      console.error(err)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper sx={{ padding: 3, marginBottom: 4 }} elevation={3}>
      <Typography variant="h6" gutterBottom>
        Send a Message
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Your Name"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          multiline
          rows={4}
          required
          sx={{ marginBottom: 2 }}
        />
        <Button type="submit" variant="contained" fullWidth disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send"}
        </Button>
      </Box>
    </Paper>
  );
};

export default MessageForm;