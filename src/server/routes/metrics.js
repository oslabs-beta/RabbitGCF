const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// this will be run when user does a get request to /api/metrics
// this get request will have an auth token

// router.get('/metrics', authController.[login], async (req, res) => {


    // try:
        // get user by id
        // will have a fetch request to get Grafana information
        // post method 
        // authorizing specific user via their API key
        // each user should have specific grafana API key
        // body should contain specific grafana query?
    // catch...

// })