const router = require('express').Router();
const userRoute = require('./users.routes');
const { ensureAuthenticated } = require('../config/guards.config');

router.use('/user', userRoute);
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.send('welcome to dashboard');
});

router.get('/', ensureAuthenticated, (req, res) => {
  res.redirect('/dashboard');
});

module.exports = router