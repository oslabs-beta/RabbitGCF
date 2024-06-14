// Package dependencies
const express = require('express');

// Controllers
const forecastController = require('../controllers/forecastController.js');
const metricsController = require('../controllers/metrics.js');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('forecast router invoked', new Date());
  return next();
  },
  /*retrieve metrics from metric middleware here*/
  forecastController.calcHistorical, 
  forecastController.forecast, 
  (req, res) => {
    res.status(200).json(res.locals.forecastDataSeries);
  });



module.exports = router;