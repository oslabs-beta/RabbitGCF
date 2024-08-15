// Package dependencies
const express = require('express');
const router = express.Router();
const { createUser, getUser } = require('./../controllers/userController.js')

// Google OAuth, step 1: Redirect to Google OAuth consent screen
// router.get('/info', (req, res) => {
  
// });

router.post('/login', (req, res, next) => {
  console.log('invoked login route'); 
  return next();
}, createUser, (req, res) => {
  res.status(200);
});

// router.post('/create', createUser, getUser, (req, res) => {

// });

module.exports = router;