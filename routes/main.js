const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const Users = require("../models/Users")
const bcrypt = require("bcryptjs")

//render is something form your view folder so you DON'T need a /
//redirect is always from a link so you DO need a /
router.get("/", function(req, res) {
  res.redirect("/welcome")
})

router.get("/welcome", function(req, res) {
  res.render("welcome")
})

router.get("/login", function(req, res) {
  res.render("login")
})

router.get("/register", function(req, res) {
  res.render("register")
})

router.post("/register", function(req, res) {
  const name = req.body.name
  const email = req.body.email
  const username = req.body.username
  const password = req.body.password

  const user = new Users()
  user.name = name
  user.email = email
  user.username = username
  user.passwordHash = bcrypt.hashSync(password, 8)
  user
    .save()
    .then(function(user) {
      res.redirect("/")
    })
    .catch(function(error) {
      res.render("register", {
        user: user,
        error: error.errors
      })
    })
})

module.exports = router
