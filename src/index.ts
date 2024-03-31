import express from "express";
import logger from "./utils/logger";

//initialize the express app
const app = express();
const port = 4000;

//
app.get("/", (req, res) => {
  res.send("hallo world2");
});

app.listen(port, () => {
  logger.info(`you are listening on port ${port}`);
});
