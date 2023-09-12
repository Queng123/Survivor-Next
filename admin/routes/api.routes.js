const router = require('express').Router();
const { custom, update } = require('../controllers/api.controller');

router.get('/company/custom/:uuid', custom);
router.get('/company/update/:uuid', update);

module.exports = router;