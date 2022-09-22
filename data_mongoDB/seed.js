import Genre from "../models_mongoDB/genre.js";
import mongoose from "mongoose";
import config from "config";

const genres = [
  { name: "Action" },
  { name: "Adventure" },
  { name: "Comedy" },
  { name: "Crime" },
  { name: "Drama" },
  { name: "Fantasy" },
  { name: "Historical" },
  { name: "Historical Fiction" },
  { name: "Horror" },
  { name: "Magical Realism" },
  { name: "Mystery" },
  { name: "Paranoid" },
  { name: "Philosophical" },
  { name: "Political" },
];

async function seed() {
  mongoose.connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await Genre.deleteMany({});
  await Genre.insertMany(genres);

  mongoose.disconnect();
  console.log("Seeding completed.");
}

seed();
