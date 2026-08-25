const User=require('../models/user.js')
const bcrypt= require('bcrypt')

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || username.trim().length < 3) {
      return res.send('Username must be at least 3 characters.');
    }
    if (!password || password.length < 6) {
      return res.send('Password must be at least 6 characters.');
    }
    const userInDatabase = await User.findOne({ username });
    if (userInDatabase) {
      return res.send('Username unavailable.');
    }
    const user = await User.create({ username, password });
    req.session.user = { username: user.username, _id: user._id };
    req.session.save(() => res.redirect('/structures'));
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};

const login = async (req, res) => {
  try {
    console.log("username:", req.body.username);
    const user = await User.findOne({ username: req.body.username })
    console.log("found:", user);
    if (!user) {
      return res.send("Login failed, Try again.")
    }
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordCorrect) {
      return res.send('Login failed, Try again.')
    }

    req.session.user = { username: user.username, _id: user._id }
    req.session.save(() => {
      res.redirect('/structures')
    })

  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
} 

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
};

module.exports={ signup, login, logout}