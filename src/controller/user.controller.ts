import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";
import { Request, Response } from "express";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    // req: Request<{
    //     username: string;
    //     password: string;
    //     confirmPassword: string;
    //     email: string;
    // }, any, any, QueryString.ParsedQs, Record<string, any>>
    const user = await createUser(req.body);
    return res.send(user);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
