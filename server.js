require('dotenv').config()

const session = require('express-session')
const express = require('express');
const app = express();
const mongoose=require('mongoose')

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





app.get('/', (req, res) => {
  res.send('FarmTrack is running!');
});





app.listen(3000, () => {
  console.log('Listening on port 3000');
});