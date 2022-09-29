import express from "express";
import connectMongoDB from "./startup/mongoDB.js";
import setRoutes from "./startup/routes.js";
import cors from "cors";
import checkConfig from "./startup/config.js";

checkConfig();

const app = express();

app.use(cors());

connectMongoDB();
setRoutes(app);

app.listen(3900, () => {
  console.log("Example app listening on port 3000!");
});
