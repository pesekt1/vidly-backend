import mongoose from "mongoose";
import Joi from "joi";

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
});

const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
  };

  const joiOptions = { abortEarly: false };

  return Joi.object(schema).validate(genre, joiOptions);
}

export { Genre, genreSchema, validateGenre };
