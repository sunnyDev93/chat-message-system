import { Router } from "express";
import { MessageService } from "../services/messageService";

const router = Router();

router.post("/messages", async (req, res) => {
  try {
    const { senderName, message } = req.body;
    const newMessage = await MessageService.createMessage(senderName, message);
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Error creating message" });
  }
});

router.get("/messages", async (req, res) => {
  try {
    const messages = await MessageService.getMessages();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const query = req.query.query as string;
    const results = await MessageService.searchMessages(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Error searching messages" });
  }
});

export default router;
