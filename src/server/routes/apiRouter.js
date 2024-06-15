const express = require('express');
const router = express.Router();
const { executionCountData, runtimeData,  memoryData } = require('../../client/dummyData/dummyOne.js');

router.get('/executioncount', (req, res) => {
    res.json(executionCountData);
});

router.get('/runtime', (req, res) => {
    res.json(runtimeData);
});

router.get('/memory', (req, res) => {
    res.json(memoryData);
});

module.exports = router;