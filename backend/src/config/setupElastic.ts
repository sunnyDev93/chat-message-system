import { esClient } from "./elasticsearch";

export const setupElastic = async () => {
  try {
    const indexExists = await esClient.indices.exists({ index: "messages" });

    if (!indexExists) {
      await esClient.indices.create({
        index: "messages",
        mappings: {
          properties: {
            id: { type: "integer" },
            senderName: { type: "text" },
            message: { type: "text" },
            timestamp: { type: "date" },
          },
        },
      });
      console.log("Elasticsearch index created: messages");
    } else {
      console.log("Elasticsearch index already exists: messages");
    }
  } catch (error) {
    console.error("Error setting up Elasticsearch:", error);
  }
};
