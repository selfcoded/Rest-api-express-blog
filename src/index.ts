import express from "express";
import logger from "./utils/logger";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

//initialize the express app
const app = express();
const port = 4000;

// test
app.get("/", (req, res) => {
  res.send("hallo world2");
});

app.listen(port, async () => {
  //mongoose connect
  try {
    await mongoose.connect(process.env.MONGOLINK!);
    logger.info("DB is connected");
  } catch (error) {
    logger.error("Could not connect to DB");
  }

  logger.info(`you are listening on port ${port}`);
});
