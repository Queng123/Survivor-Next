const router = require('express').Router();
const { custom } = require('../controllers/api.controller');

router.get('/company/custom/:uuid', custom);

module.exports = router;