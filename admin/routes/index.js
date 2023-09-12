const router = require('express').Router();
const { ensureAuthenticated } = require('../config/guards.config');
const userRoute = require('./users.routes');
const dashboardRoute = require('./dashboard.routes');
const apiRoute = require('./api.routes');

router.use('/user', userRoute);
router.use('/dashboard', dashboardRoute);
router.use('/api', apiRoute);

router.get('/', ensureAuthenticated, (req, res) => {
  res.redirect('/dashboard');
});

module.exports = router