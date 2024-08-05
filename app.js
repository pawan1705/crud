import express from "express";
import dotenv from "dotenv";
import userRoute from "./Route/UserRouter.js";
import connectDB from "./Connection/Connection.js";
import morgan from "morgan";
import cors from "cors";
dotenv.config();
const app = express();
connectDB();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World");
});
// middleware
app.use(cors());
app.use(express.json());
app.use("/api/v1/user", userRoute);
app.use(morgan("dev"));

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
