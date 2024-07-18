const express = require("express")
const mongoose = require("mongoose")
const route = require("./src/routes/route")

let app = express()

app.use(express.json())
app.use(route)

let url = "mongodb+srv://developerparshant:gImWT1TbXAICSqVP@cluster0.nt8qwy2.mongodb.net/"

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on:", process.env.PORT || 3000)
})

mongoose.connect(url)
    .then(() => console.log("mongoDB is connected")
    ).catch(err => console.error(err))