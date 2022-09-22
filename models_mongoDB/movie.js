import mongoose from "mongoose";
import { genreSchema } from "./genre.js";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 1, maxlength: 255 },
  genre: { type: genreSchema, required: true },
  numberInStock: { type: Number, required: true, min: 0 },
  dailyRentalRate: { type: Number, required: true, min: 0 },
});

const Movie = mongoose.model("Movie", movieSchema);

export { Movie, movieSchema };
