const express = require('express');
const router = express.Router();
// const { runtimeData, memoryData } = require('../../client/dummyData/dummyOne.js');

const runtimeData = [
    { timestamp: '2024-06-01T00:00:00Z', runtime: 120, status: 'ok' },
    { timestamp: '2024-06-01T01:00:00Z', runtime: 150, status: 'ok' },
    { timestamp: '2024-06-01T02:00:00Z', runtime: 130, status: 'ok' },
    { timestamp: '2024-06-01T03:00:00Z', runtime: 160, status: 'error' },
    { timestamp: '2024-06-01T04:00:00Z', runtime: 130, status: 'ok' },
    { timestamp: '2024-06-01T05:00:00Z', runtime: 140, status: 'ok' },
    { timestamp: '2024-06-01T06:00:00Z', runtime: 120, status: 'ok' },
    { timestamp: '2024-06-01T07:00:00Z', runtime: 170, status: 'error' },
  ];
  
  const memoryData = [
    { timestamp: '2024-06-01T00:00:00Z', memory: 512, status: 'ok' },
    { timestamp: '2024-06-01T01:00:00Z', memory: 480, status: 'ok' },
    { timestamp: '2024-06-01T02:00:00Z', memory: 500, status: 'ok' },
    { timestamp: '2024-06-01T03:00:00Z', memory: 530, status: 'error' },
    { timestamp: '2024-06-01T04:00:00Z', memory: 560, status: 'ok' },
    { timestamp: '2024-06-01T05:00:00Z', memory: 470, status: 'ok' },
    { timestamp: '2024-06-01T06:00:00Z', memory: 520, status: 'ok' },
    { timestamp: '2024-06-01T07:00:00Z', memory: 545, status: 'error' },
  ];

router.get('/runtime', (req, res) => {
    res.json(runtimeData);
});

router.get('/memory', (req, res) => {
    res.json(memoryData);
});

module.exports = router;