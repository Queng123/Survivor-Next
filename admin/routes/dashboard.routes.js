const router = require('express').Router();
const { ensureAuthenticated } = require('../config/guards.config');
const { submit, submitForm } = require('../controllers/dashboard.controller');

router.get('/', ensureAuthenticated, submitForm);
router.post('/submit', ensureAuthenticated, submit);
module.exports = router;