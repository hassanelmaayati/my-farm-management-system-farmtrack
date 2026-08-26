const User = require('../models/user.js')
const bcrypt = require('bcrypt')

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || username.trim().length < 3) {
      return res.render('auth/signup.ejs', { error: 'Username must be at least 3 characters.' });
    }
    if (!password || password.length < 6) {
      return res.render('auth/signup.ejs', { error: 'Password must be at least 6 characters.' });
    }
    const userInDatabase = await User.findOne({ username });
    if (userInDatabase) {
      return res.render('auth/signup.ejs', { error: 'Username unavailable.' });
    }
    const user = await User.create({ username, password });
    req.session.user = { username: user.username, _id: user._id };
    req.session.save(() => res.redirect('/structures'));
  } catch (err) {
    console.log(err);
    res.render('auth/signup.ejs', { error: 'Something went wrong. Try again.' });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
      return res.render('auth/login.ejs', { error: 'Login failed, try again.' });
    }
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordCorrect) {
      return res.render('auth/login.ejs', { error: 'Login failed, try again.' });
    }

    req.session.user = { username: user.username, _id: user._id }
    req.session.save(() => {
      res.redirect('/structures')
    })

  } catch (err) {
    console.log(err)
    res.render('auth/login.ejs', { error: 'Something went wrong. Try again.' });
  }
}

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
};

module.exports = { signup, login, logout }
