import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import logger from "./utils/logger";
import routes from "./routes";
configDotenv();

//initialize the express app
const app = express();
const port = 4000;

app.use(express.json());

app.listen(port, async () => {
  //mongoose connect
  try {
    await mongoose.connect(process.env.MONGOLINK!);
    logger.info("DB is connected");
  } catch (error) {
    logger.error("Could not connect to DB");
  }

  routes(app);

  logger.info(`you are listening on port ${port}`);
});
