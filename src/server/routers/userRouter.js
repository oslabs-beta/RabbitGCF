// Package dependencies
const express = require('express');
const router = express.Router();
const { createUser, getUser } = require('./../controllers/userController.js')

router.post('/login', getUser, createUser, (req, res) => {
  res.status(200).json('successful login');
});

module.exports = router;