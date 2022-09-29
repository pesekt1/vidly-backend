import { User } from "../../../models_mongoDB/user.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";

describe("user.generateAuthToken", () => {
  // afterAll(async () => {
  //   mongoose.disconnect();
  // });

  it("should return a valid JWT", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    };
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    expect(decoded).toMatchObject(payload);
  });
});
