// Package dependencies
const express = require('express');

// Controllers
const forecastController = require('../controllers/forecastController.js');
const metricsController = require('../controllers/metrics.js');

const router = express.Router();

router.get('/api/forecast', forecastController);



module.exports = router;