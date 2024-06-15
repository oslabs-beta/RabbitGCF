// Package dependencies
const express = require('express');
const User = require('../models/User.js');
const router = express.Router();

// Google OAuth, step 1: Redirect to Google OAuth consent screen
router.get('/info', (req, res) => {
  // User.findOne
});

module.exports = router;