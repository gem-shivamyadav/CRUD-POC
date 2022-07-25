import express from "express";
import { json } from "body-parser";
import connectMongo from "./config/db.config";
import { studentRouter } from "./routes/student.route";
import { generateToken } from "./utils/jwt.util";

const app = express();
app.use(json());
app.use(express.urlencoded());
app.use(studentRouter);

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 8888;

// if (process.env.NODE_ENV !== "production") {
//   console.log("JWT", generateToken());
// }

connectMongo();

app.listen(port, () => {
  console.log(`Server is listening on ${host}:${port}`);
});
