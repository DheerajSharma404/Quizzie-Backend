import cors from "cors";
import express from "express";
import { ServerConfig } from "./config/index.js";
import apiRoutes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Successfull Started the Server on PORT: ${ServerConfig.PORT}`);

  await ServerConfig.connect();
});
