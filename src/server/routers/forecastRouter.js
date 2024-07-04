// Package dependencies
const express = require('express');

// Controllers
const forecastController = require('../controllers/forecastController.js');
const metricsController = require('../controllers/metrics.js');

const router = express.Router();

router.post('/:projectId',
  /*retrieve metrics from metric middleware here*/
  metricsController.executionTimes,
  metricsController.userMemoryBytes,
  forecastController.calcHistorical, 
  forecastController.forecast, 
  (req, res) => {
    res.status(200).json(res.locals.forecastDataSeries);
  });



module.exports = router;