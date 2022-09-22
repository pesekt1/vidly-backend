import express from "express";
import genresRouter from "../routes_mongoDB/genres.js";
import moviesRouter from "../routes_mongoDB/movies.js";
import helloWorldRouter from "../routes_mongoDB/hello-world.js";

export default function (app) {
  app.use(express.json());
  app.use("/genres", genresRouter);
  app.use("/movies", moviesRouter);
  app.use("/hello-world", helloWorldRouter);
}
