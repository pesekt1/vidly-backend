import express from "express";
import genresRouter from "../routes_mongoDB/genres.js";
import moviesRouter from "../routes_mongoDB/movies.js";
import helloWorldRouter from "../routes_mongoDB/hello-world.js";
import usersRouter from "../routes_mongoDB/users.js";
import loginRouter from "../routes_mongoDB/login.js";

export default function (app) {
  app.use(express.json());
  app.use("/api/genres", genresRouter);
  app.use("/api/movies", moviesRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/auth", loginRouter);
  app.use("/api/hello-world", helloWorldRouter);
}
