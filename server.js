require("dotenv").config();

for (const key of ["MONGODB_URI", "SESSION_SECRET"]) {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const express = require("express");
const app = express();
if (process.env.NODE_ENV === "production") app.set("trust proxy", 1);
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.js");
const structuresRouter = require("./routes/structures.js");
const methodOverride = require("method-override");
const animalsRouter = require("./routes/animals.js");
const logEntriesRouter = require("./routes/logEntries.js");
const passUser = require("./middleware/passUser.js");
const csrf = require("./middleware/csrf.js");
const isSignedIn = require("./middleware/isSignedIn.js");

mongoose.connect(process.env.MONGODB_URI).catch((err) => {
  console.error("Could not connect to MongoDB:", err.message);
  process.exit(1);
});
mongoose.connection.on("error", (err) => {
  console.error("MongoDB error:", err.message);
});
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB: ${mongoose.connection.name}`);
});

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  }),
);
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static("public")); 

app.use(passUser);
app.use(csrf);

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});