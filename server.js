require('dotenv').config()

const session = require('express-session')
const express = require('express');
const app = express();
const mongoose=require('mongoose')
const authRoter=require('./routes/auth.js')
const structuresRouter = require('./routes/structures.js');
const methodOverride = require('method-override');
const animalsRouter = require('./routes/animals.js');
const logEntriesRouter = require('./routes/logEntries.js');


mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB: ${mongoose.connection.name}`);
});


app.use(express.urlencoded({extended:false}))
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false,
}))

app.use('/', authRouter);
app.use(methodOverride('_method'));
app.use('/structures', structuresRouter);
app.use('/structures/:structureId/animals', animalsRouter);
app.use('/structures/:structureId/animals/:animalId/logentries', logEntriesRouter);




app.listen(3000, () => {
  console.log('Listening on port 3000');
});