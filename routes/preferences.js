const express = require('express');
const { addPreference, getPreferences, calculateResults } = require('../controllers/preferenceController');
const verifyAccessCode = require('../middleware/verifyAccessCode');
const router = express.Router();

router.post('/', verifyAccessCode, addPreference);
router.get('/', getPreferences);
router.post('/calculate', calculateResults);

module.exports = router;