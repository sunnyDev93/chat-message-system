import { useEffect, useState } from "react";
import { getMessages } from "../api/messages";
import { Message } from "../types/Message";

const useFetchMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getMessages();
      setMessages(data);
    };

    fetchMessages();
  }, []);

  return messages;
};

export default useFetchMessages;