// Package dependencies
const express = require('express');
const router = express.Router();

// Controllers
const metricsController = require('../controllers/metrics.js');

router.get('/funcs/:projectId', metricsController.getFuncs, (req, res) => {
  return res.status(200).send(res.locals.funcConfigs);
})

router.get('/execution_count/:projectId', metricsController.executionCount, (req, res) => {
  return res.status(200).send(res.locals.execution_count);
});

router.get('/execution_times/:projectId', metricsController.executionTimes, (req, res) => {
  return res.status(200).send(res.locals.execution_times);
});

router.get('/user_memory_bytes/:projectId', metricsController.userMemoryBytes, (req, res) => {
  return res.status(200).send(res.locals.user_memory_bytes);
});

router.get('/network_egress/:projectId', metricsController.networkEgress, (req, res) => {
  return res.status(200).send(res.locals.network_egress);
});




module.exports = router;