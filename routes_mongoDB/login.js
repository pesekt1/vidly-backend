import express from "express";
import { User } from "../models_mongoDB/user.js";
import bcrypt from "bcrypt";
import Joi from "joi";

const router = express.Router();

const validateCredentials = (credentials) => {
  const schema = {
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
  };
  const joiOptions = { abortEarly: false };

  return Joi.object(schema).validate(credentials, joiOptions);
};

router.post("/", async (req, res) => {
  const { error } = validateCredentials(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  res.send(token);
});

export default router;
