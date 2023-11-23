// import built-in and external pack 
const express = require("express")
const fs = require("fs")
const path = require("path")

// import local files
const postRouters = require("./routes/postRoutes")

// create istance of express 
const app = express()
// configure static files
app.use(express.static("public"))

// configure body-parser for "application/json" 
app.use(express.json())

// Crete routes GET
app.use("/posts", postRouters)

// Bind server with a PORT
app.listen(3000, console.log("Create server correctly = http://localhost:3000"))