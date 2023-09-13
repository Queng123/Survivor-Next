const router = require('express').Router();
const { custom, update, logo, all } = require('../controllers/api.controller');

router.get('/company/custom/:uuid', custom);
router.get('/company/all/:uuid', all);
router.get('/company/update/:uuid', update);
router.get('/company/logo/:uuid', logo);

module.exports = router;