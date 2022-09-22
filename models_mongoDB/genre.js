import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
});

const Genre = mongoose.model("Genre", genreSchema);

export { Genre, genreSchema };
