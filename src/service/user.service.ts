import { userInput, userModel } from "../models/user.model";
import { omit } from "lodash";

export async function createUser(input: userInput) {
  try {
    const user = await userModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (error: any) {
    throw new Error(error);
  }
}
