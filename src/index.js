import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT;
import mongoose from "mongoose";


import subRouter from "./routes/subRoute";
import userRouter from "./routes/userRoute";
import postRouter from "./routes/postRoute";

import cors from "cors";
app.use(cors())


main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`[📚 DATABASE ] MongoDB est connecté !!`);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.json("WELCOME TO MY API OF READIT"));

app.use("/sub", subRouter );
app.use("/user" , userRouter);
app.use("/comm", postRouter);


app.listen(port, () =>
  console.log(`[SERVER] is running on http://localhost:${port}`)
);
