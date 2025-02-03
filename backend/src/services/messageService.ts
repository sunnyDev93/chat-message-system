
import { esClient } from "../config/elasticsearch";
import Messages from "../models/message";

export class MessageService {
  static async createMessage(senderName: string, message: string) {
    const newMessage = await Messages.create({ senderName, message });

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
    return await Messages.findAll();
  }

  static async searchMessages(query: string) {
    const { hits } = await esClient.search({
      index: 'messages',
      query: {
        bool: {
          should: [
            {
              match: {
                message: {
                  query: query,
                  fuzziness: "AUTO",
                },
              },
            },
            {
              match_phrase_prefix: {
                message: {
                  query: query,
                },
              },
            },
            {
              wildcard: {
                message: {
                  value: `*${query}*`,
                  case_insensitive: true,
                },
              },
            },
          ],
        },
      },
    });
  
    return hits.hits.map((hit: any) => hit._source);
  }
  
  
}
