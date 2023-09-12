const router = require('express').Router();
const { signinForm, signin, signout, signup } = require('../controllers/users.controller');

router.get('/signin/form', signinForm);
router.post('/signin', signin);
router.get('/signout', signout);
router.post('/signup', signup);
module.exports = router;