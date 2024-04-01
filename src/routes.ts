import { Express, Request, Response } from "express";
import validate from "./middleware/validateRequest";
import { createUserHandler } from "./controller/user.controller";
import { createUserSchema } from "./schema/user.schema";

const routes = (app: Express) => {
  // test
  app.get("/", (req, res) => {
    res.send("hallo worldsd");
  });
  app.post("/api/users", validate(createUserSchema), createUserHandler);
};

export default routes;
