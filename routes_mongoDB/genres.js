import express from "express";
import Genre from "../models_mongoDB/genre.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});
