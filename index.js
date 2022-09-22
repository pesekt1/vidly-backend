import express from "express";
import connectMongoDB from "./startup/mongoDB.js";
import Genre from "./models_mongoDB/genre.js";
const app = express();

connectMongoDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/genres", async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
