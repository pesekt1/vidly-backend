import express from "express";
import connectMongoDB from "./startup/mongoDB.js";
import setRoutes from "./startup/routes.js";

const app = express();

connectMongoDB();
setRoutes(app);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
