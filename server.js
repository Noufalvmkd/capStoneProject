import express from "express";
import cookieParser from "cookie-parser";
import {connectDB } from "./config/db.js";
import { apiRouter } from "./routes/index.js";//main router
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json())
app.use(cookieParser())
const port = 3000;

connectDB();


 //json parse
app.use("/api",apiRouter) //main router for all api routs

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
