const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');

var indexRouter = require('./src/routes/route');
require('./src/routes/auth');

require('dotenv').config();

let app = express()


// Middleware for handling sessions
// CORS configuration
app.use(cors({
    origin: '*', // Replace with your frontend URL
    credentials: true
  }));
  
  // Other middlewares and Passport setup
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(session({ secret: 'your-secret', resave: false, saveUninitialized: false }));
  app.use(passport.initialize());
  app.use(passport.session());
  

app.use(express.json())
app.use(cookieParser());

app.use("/",indexRouter)
// app.use("/",authRouter)


// should store this url in env file 
let url = "mongodb+srv://developerparshant:gImWT1TbXAICSqVP@cluster0.nt8qwy2.mongodb.net/"

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on:", process.env.PORT || 3000)
})

mongoose.connect(url)
    .then(() => console.log("mongoDB is connected")
    ).catch(err => console.error(err))