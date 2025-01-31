
import { esClient } from "../config/elasticsearch";
import Message from "../models/Message";

export class MessageService {
  static async createMessage(senderName: string, message: string) {
    const newMessage = await Message.create({ senderName, message });

    await esClient.index({
      index: 'messages',
      id: newMessage.id.toString(),
      document: {
        id: newMessage.id,
        senderName,
        message,
        timestamp: newMessage.timestamp,
      },
    });

    return newMessage;
  }

  static async getMessages() {
    return await Message.findAll();
  }

  static async searchMessages(query: string) {
    const { hits } = await esClient.search({
      index: 'messages',
      query: {
        wildcard: {
          message: {
            value: `*${query}*`,
            case_insensitive: true,
          },
        },
      },
    });
  
    return hits.hits.map((hit: any) => hit._source);
  }
}
