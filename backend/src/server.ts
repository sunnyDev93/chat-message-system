import app from "./app";
import dotenv from "dotenv";
import { setupElastic } from "./config/setupElastic";

dotenv.config();

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await setupElastic();
    console.log("Elasticsearch setup completed!");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
})();
