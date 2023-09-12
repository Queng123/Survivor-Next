const router = require('express').Router();
const { ensureAuthenticated } = require('../config/guards.config');
const { submit } = require('../controllers/dashboard.controller');

router.get('/', ensureAuthenticated, (req, res) => {
    res.send('welcome to dashboard');
});

router.post('/submit', submit);
module.exports = router;