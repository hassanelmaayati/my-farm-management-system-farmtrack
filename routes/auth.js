const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.js");

router.get("/signup", (req, res) => {
  res.render("auth/signup.ejs");
});

router.get("/login", (req, res) => {
  res.render("auth/login.ejs");
});

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;