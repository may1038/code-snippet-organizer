const mongoose = require("mongoose")

const snippetSchema = new mongoose.Schema({
  title: { type: String, require: true },
  snippet: { type: String, require: true },
  notes: { type: String },
  language: { type: String, required: true },
  tags: { type: String }
})

const Snippet = mongoose.model("Snippet", snippetSchema)
module.exports = Snippet
