const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
const connectDB = require('./config/db');

connectDB();


const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/",(req,res)=>{
    res.send("hi hello")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
