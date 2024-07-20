const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
const cookieParser = require('cookie-parser');

const route = require("./src/routes/route")
require('dotenv').config();

let app = express()

app.use(cors({
    origin: "http://localhost:3001", // Replace with your frontend URL
    credentials: true // Allow cookies to be sent
}));

app.use(express.json())
app.use(cookieParser());

app.use("/",route)

// should store this url in env file 
let url = "mongodb+srv://developerparshant:gImWT1TbXAICSqVP@cluster0.nt8qwy2.mongodb.net/"

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on:", process.env.PORT || 3000)
})

mongoose.connect(url)
    .then(() => console.log("mongoDB is connected")
    ).catch(err => console.error(err))