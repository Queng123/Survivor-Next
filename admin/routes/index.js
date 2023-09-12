const router = require('express').Router();
const userRoute = require('./users.routes');
const { ensureAuthenticated } = require('../config/guards.config');
const dashboardRoute = require('./dashboard.routes');

router.use('/user', userRoute);
router.use('/dashboard', dashboardRoute);

router.get('/', ensureAuthenticated, (req, res) => {
  res.redirect('/dashboard');
});

module.exports = router