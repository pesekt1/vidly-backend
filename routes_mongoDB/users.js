import express from "express";
import { User, validateUser } from "../models_mongoDB/user.js";
import bcrypt from "bcrypt";
import _ from "lodash";

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const token = user.generateAuthToken();

  await user.save();

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .header("access-control-allow-origin", "*")
    .send(_.pick(user, ["_id", "name", "email"]));
});

export default router;
