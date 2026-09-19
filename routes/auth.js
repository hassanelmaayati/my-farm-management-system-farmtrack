const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.js");
const { rateLimit } = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler: (req, res) => {
    const view = req.path.includes("signup") ? "auth/signup.ejs" : "auth/login.ejs";
    res.status(429).render(view, { error: "Too many attempts. Please wait 15 minutes and try again." });
  },
});

router.get("/signup", (req, res) => {
  res.render("auth/signup.ejs", { error: null });
});

router.get("/login", (req, res) => {
  res.render("auth/login.ejs", { error: null });
});

router.post("/signup", authLimiter, authController.signup);
router.post("/login", authLimiter, authController.login);
router.post("/logout", authController.logout);

module.exports = router;
