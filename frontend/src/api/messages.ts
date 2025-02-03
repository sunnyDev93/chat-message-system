import axios from "axios";
import { toast } from "react-toastify";
import { Message } from "../types/Message";

const API_URL = "http://localhost:5000/api";

const handleError = (error: any): void => {
  const message = error?.response?.data?.error || "Server is not responding.";
  toast.error(message);
};

export const sendMessage = async (senderName: string, message: string): Promise<void> => {
  try {
    await axios.post(`${API_URL}/messages`, { senderName, message });
    toast.success("Message sent successfully!");
  } catch (error) {
    handleError(error);
  }
};

export const getMessages = async (): Promise<Message[]> => {
  try {
    const response = await axios.get(`${API_URL}/messages`);
    return response.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};

export const searchMessages = async (query: string): Promise<Message[]> => {
  try {
    const response = await axios.get(`${API_URL}/search`, { params: { query } });
    return response.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};