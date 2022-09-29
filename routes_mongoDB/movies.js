import express from "express";
import { Movie, validateMovie } from "../models_mongoDB/movie.js";
import { Genre } from "../models_mongoDB/genre.js";
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/admin.js";
import validateObjectId from "../middleware/validateObjectId.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");
  res.send(movie);
});

router.put("/:id", auth, async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: req.body.genre,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateMovie(req.body);

  if (error) {
    console.log(error);
    return res.status(400).send(error.details[0].message);
  }

  const genre = await Genre.findById(req.body.genreId);

  let movie = new Movie({
    title: req.body.title,
    genre: genre,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movie = await movie.save();
  res.send(movie);
});

router.delete("/:id", [auth, isAdmin], async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");
  res.send(movie);
});

export default router;
