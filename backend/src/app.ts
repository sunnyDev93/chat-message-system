import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import messageRoutes from "./routes/messsageRoutes";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", messageRoutes);

export default app;
