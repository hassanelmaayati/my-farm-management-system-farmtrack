const crypto = require('crypto');

// Gives every session a secret token and checks it on every form submit.
const csrf = (req, res, next) => {
  if (!req.session.csrfToken) {
    req.session.csrfToken = crypto.randomBytes(32).toString('hex');
  }
  res.locals.csrfToken = req.session.csrfToken;

  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();

  const sent = req.body && req.body._csrf;
  const expected = Buffer.from(req.session.csrfToken);
  if (
    typeof sent === 'string' &&
    sent.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(sent), expected)
  ) {
    return next();
  }

  res.status(403).render('error.ejs');
};

module.exports = csrf;
