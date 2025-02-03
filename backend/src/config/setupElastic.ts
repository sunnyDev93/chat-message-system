import { esClient } from "./elasticsearch";

export const setupElastic = async () => {
  try {
    const indexExists = await esClient.indices.exists({ index: "messages" });

    if (!indexExists) {
      await esClient.indices.create({
        index: "messages",
        settings: {
          analysis: {
            analyzer: {
              custom_edge_ngram_analyzer: {
                type: "custom",
                tokenizer: "edge_ngram_tokenizer",
                filter: ["lowercase"],
              },
            },
            tokenizer: {
              edge_ngram_tokenizer: {
                type: "edge_ngram",
                min_gram: 1,
                max_gram: 20,
                token_chars: ["letter", "digit"],
              },
            },
          },
        },
        mappings: {
          properties: {
            id: { type: "integer" },
            senderName: { type: "text" },
            message: {
              type: "text",
              analyzer: "custom_edge_ngram_analyzer", // Custom analyzer for partial search
              search_analyzer: "standard",
            },
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



