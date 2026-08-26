require("dotenv").config();

const session = require("express-session");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.js");
const structuresRouter = require("./routes/structures.js");
const methodOverride = require("method-override");
const animalsRouter = require("./routes/animals.js");
const logEntriesRouter = require("./routes/logEntries.js");
const passUser = require("./middleware/passUser.js");
const isSignedIn = require("./middleware/isSignedIn.js");

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB: ${mongoose.connection.name}`);
});

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static("public")); 

app.use(passUser);

// Public
app.use("/auth", authRouter); 

app.get("/", (req, res) => {
  if (req.session.user) return res.redirect("/structures");
  res.render("welcome.ejs");
});

// Private
app.use(isSignedIn);

app.use("/structures", structuresRouter);
app.use("/structures/:structureId/animals", animalsRouter);
app.use(
  "/structures/:structureId/animals/:animalId/logentries",
  logEntriesRouter,
);

app.use((req, res) => {
  res.status(404).render("404.ejs");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("error.ejs");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});