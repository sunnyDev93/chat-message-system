import { useEffect } from "react";
import { getMessages } from "./api/messages";
import { useMessageContext } from "./contexts/MessageContext";
import MessageForm from "./components/forms/MessageForm";
import MessageList from "./components/lists/MesssageList";
import SearchBox from "./components/search/SearchBox";

const App: React.FC = () => {
  const { setMessages } = useMessageContext();

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getMessages();
      setMessages(data);
    };
    fetchMessages();
  }, [setMessages]);

  return (
    <div>
      <MessageForm />
      <SearchBox />
      <MessageList />
    </div>
  );
};

export default App;