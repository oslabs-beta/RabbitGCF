// Package dependencies
const express = require('express');
const passport = require('passport');

// Strategies
require('../googleStrategy');

// Controllers
const cookieController = require('../controllers/cookieController');

const router = express.Router();

// Google OAuth, step 1: Redirect to Google OAuth consent screen
router.get('/google', passport.authenticate('google', {scope: ['email', 'profile']}));

// Google OAuth, step 2: Google OAuth consent screen redirects to this route
router.get('/google/callback',
 passport.authenticate('google', {
  successRedirect: '/auth/set',
  failureRedirect: '/auth/google/failure'
}));

// Google OAuth failure route
router.get('/api/google/failure', (req, res) => {
  res.status(401).redirect('/');
});

// Google OAuth, step 3: Set cookies for JWT
router.get('/api/set', (req, res, next) => {
  // console.log(Object.keys(req.user));
  // console.log(req.user._id);
  next();
},
(req, res) => {
  console.log('Successfully logged in via Google OAuth @ ' + new Date());
  return res.status(200).redirect('/');
});

module.exports = router;