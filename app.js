const express = require("express")
const app = express()
const session = require("express-session")
const mongooseSession = require("mongoose-session")
const mustache = require("mustache-express")
const bodyParser = require("body-parser")
const MongoClient = require("mongodb")
const mongoose = require("mongoose")
mongoose.Promise = require("bluebird")
app.engine("mustache", mustache())
app.set("view engine", "mustache")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))

const url = "mongodb://127.0.0.1:27017/snippet"
mongoose.connect(url)

const routeApp = require("./routes/main")
app.use(routeApp)

app.listen(3000, function() {
  console.log("Listening")
})
