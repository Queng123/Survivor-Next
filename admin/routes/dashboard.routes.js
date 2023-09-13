const router = require('express').Router();
const { ensureAuthenticated } = require('../config/guards.config');
const { submit, submitForm } = require('../controllers/dashboard.controller');
const User = require('../database/models/user.model');
const { findUserById } = require('../queries/user.queries');

router.get('/', ensureAuthenticated, submitForm);
router.post('/submit', ensureAuthenticated, submit);
router.get('/session', ensureAuthenticated, async (req, res) => {
    await findUserById(req.user).then(team => {
        res.send(team.teamuuid);
    })
});
module.exports = router;