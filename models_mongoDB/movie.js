import mongoose from "mongoose";
import { genreSchema } from "./genre.js";
import Joi from "joi";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 1, maxlength: 255 },
  genre: { type: genreSchema, required: true },
  numberInStock: { type: Number, required: true, min: 0 },
  dailyRentalRate: { type: Number, required: true, min: 0 },
});

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(1).max(255).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  };

  const joiOptions = { abortEarly: false };

  return Joi.object(schema).validate(movie, joiOptions);
}

const Movie = mongoose.model("Movie", movieSchema);

export { Movie, movieSchema, validateMovie };
