const express = require("express")
const router = express.Router()
const newUser = require("../models/Users")
const bcrypt = require("bcryptjs")

router.get("/login", function(req, res) {
  res.render("welcome")
})

router.post("/login", function(req, res) {
  const username = req.body.username
  const password = req.body.password
  newUser.findOne({ username: username }).then(function(user) {
    if (!user) {
      res.render("welcome")
      message: "Try Again!"
    } else {
      if (bcrypt.compareSync(password, user.passwordHash)) {
        req.session.user = user
        res.redirect("/")
      } else {
        res.render("welcome")
        message: "Try Again!"
      }
    }
  })
})

module.exports = router
