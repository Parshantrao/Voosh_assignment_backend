const express = require('express')

const route = express.Router()

route.get("/get",(req,res)=>{
    res.status(200).send({message:"Working"})
})

module.exports = route