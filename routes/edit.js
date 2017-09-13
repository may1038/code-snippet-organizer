const express = require("express")
const router = express.Router()
const Snippet = require("../models/Snippets")

const requireAuth = function(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    res.redirect("/login")
  }
}

router.get("/snippet/:id/edit", requireAuth, function(req, res) {
  Snippet.findOne({ _id: req.params.id }).then(function(edit) {
    res.render("edit", {
      edit: edit
    })
  })
})

router.post("/snippet/:id", requireAuth, function(req, res) {
  Snippet.findOne({ _id: req.params.id }).then(function(newSnippet) {
    const title = req.body.title
    const snippet = req.body.snippet
    const notes = req.body.notes
    const language = req.body.language
    const tags = req.body.tags

    newSnippet.title = title
    newSnippet.snippet = snippet
    newSnippet.notes = notes
    newSnippet.language = language
    newSnippet.tags = tags
    newSnippet
      .save()
      .then(function(snippet) {
        res.redirect("/")
      })
      .catch(function(error) {
        res.render("edit", {
          newSnippet: newSnippet,
          errors: error.errors
        })
      })
  })
})

router.get("/snippet/:id/delete", requireAuth, function(req, res) {
  Snippet.deleteOne({ _id: req.params.id }).then(function() {
    res.redirect("/")
  })
})

module.exports = router
