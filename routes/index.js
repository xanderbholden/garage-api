const express = require('express');

const router = express.Router();

router.use('/vehicles', require('./vehicles'));
router.use('/maintenance', require('./maintenance'));

module.exports = router;