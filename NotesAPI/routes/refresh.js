const express = require('express');
const { refreshController } = require('../controllers/refresh-controller');

const router = express.Router();

router.get('/refresh',refreshController);

module.exports = router