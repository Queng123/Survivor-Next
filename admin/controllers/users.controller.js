const passport = require("passport");
const { createUser } = require('../queries/user.queries');

exports.signinForm = (req, res, next) => {
  res.render("users/user-form")
}

exports.signin = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
    next(err);
    } else if (!user) {
      res.render('users/user-form', { errors: [info.message] });
    }
    req.login(user, (err) => {
      if (err) {
        next(err);
      } else {
        res.redirect('/');
      }
    });
  })(req, res, next);
}

exports.signout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/user/signin');
  });
}

exports.signup = async (req, res, next) => {
  const body = req.body;
  try {
    const user = await createUser(body);
    res.redirect('/user/signin');
  } catch (error) {
    next(error);
  }
}
