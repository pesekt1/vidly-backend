import express from "express";
import { Movie } from "../models_mongoDB/movie.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

export default router;
