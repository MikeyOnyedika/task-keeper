import { DBCreateUserResult, DBFindOneUserByEmailResult, SignupBody } from "@/app/types";
import { _User } from "../mongooseModels/User";
import { connect } from "@/app/lib/db/connect";

export default class User {
  static async create({
    username,
    email,
    password,
  }: SignupBody): Promise<DBCreateUserResult> {
    try {
      const conn = await connect();
      if (!conn) {
        return {
          operationStatus: "error",
          error: "Couldn't setup your account",
        };
      }
      const user = await _User.create({
        username,
        email,
        password,
      });
      console.log("created user: ", user);

      // return the new user that has been created
      return {
        operationStatus: "success",
        user,
      };
    } catch (err) {
      return {
        operationStatus: "error",
        error: "Couldn't setup your account",
      };
    }
  }

  static async findOneByEmail(email: string): Promise<DBFindOneUserByEmailResult> {
    try {
      const conn = await connect();
      const user = await _User.findOne({ email });

      return {
        operationStatus: "success",
        user,
      };
    } catch (err) {
      return {
        operationStatus: "error",
        error: "Couldn't complete find user by email request",
      };
    }
  }
}
