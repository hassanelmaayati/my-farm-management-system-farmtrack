const passUser = (req, res, next) => {
  const user = req.session.user;
  if (user) {
    res.locals.user = user;
  } else {
    res.locals.user = null;
  }
  next();
};

module.exports = passUser;
