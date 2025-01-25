import express from "express";
import {connectDB } from "./config/db.js";
import { apiRouter } from "./routes/index.js";
const app = express();
const port = 3000;

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/",(req,res)=>{
  
    res.send("hi hello")
})

app.use("/api",apiRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
