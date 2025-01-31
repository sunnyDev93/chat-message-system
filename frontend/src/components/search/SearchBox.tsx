import { useState, useCallback } from "react";
import { TextField, Typography, Paper } from "@mui/material";
import { debounce } from "../../utils/debounce";
import { searchMessages, getMessages } from "../../api/messages";
import { useMessageContext } from "../../contexts/MessageContext";

const SearchBox: React.FC = () => {
  const [query, setQuery] = useState("");
  const { setMessages } = useMessageContext();

  const handleSearch = useCallback(
    debounce(async (searchTerm: string) => {
      if (!searchTerm.trim()) {
        const allMessages = await getMessages();
        setMessages(allMessages);
        return;
      }
      try {
        const results = await searchMessages(searchTerm);
        setMessages(results);
      } catch (err) {
        console.error(err);
      }
    }, 500),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  return (
    <Paper sx={{ padding: 3, marginBottom: 4 }} elevation={3}>
      <Typography variant="h6" gutterBottom>
        Search Messages
      </Typography>
      <TextField
        fullWidth
        label="Search"
        value={query}
        onChange={handleChange}
      />
    </Paper>
  );
};

export default SearchBox;