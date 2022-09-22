import { Genre } from "../models_mongoDB/genre.js";
import { Movie } from "../models_mongoDB/movie.js";
import mongoose from "mongoose";
import config from "config";

const data = [
  {
    name: "Comedy",
    movies: [
      { title: "The Hangover", numberInStock: 5, dailyRentalRate: 2.5 },
      { title: "Wedding Crashers", numberInStock: 5, dailyRentalRate: 2.5 },
      {
        title: "The 40-Year-Old Virgin",
        numberInStock: 5,
        dailyRentalRate: 2.5,
      },
    ],
  },
  {
    name: "Action",
    movies: [
      { title: "Die Hard", numberInStock: 5, dailyRentalRate: 2.5 },
      { title: "Terminator", numberInStock: 5, dailyRentalRate: 2.5 },
      { title: "The Avengers", numberInStock: 5, dailyRentalRate: 2.5 },
    ],
  },
];

async function seed() {
  mongoose.connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await Movie.deleteMany({});
  await Genre.deleteMany({});

  for (let genre of data) {
    const { _id } = await new Genre({ name: genre.name }).save();
    const movies = genre.movies.map((movie) => ({
      ...movie,
      genre: { _id, name: genre.name },
    }));
    await Movie.insertMany(movies);
  }

  mongoose.disconnect();
  console.log("Seeding completed.");
}

seed();
