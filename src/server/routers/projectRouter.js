// Package dependencies
const express = require('express');
const router = express.Router();
const { addProject, getAllProjects, getProject } = require('./../controllers/projectController.js')

router.post('/add', (req, res, next) => {
  console.log('invoked add project route'); 
  console.log(req.body);
  return next();
}, 
getProject, addProject, 
(req, res) => {
  console.log('finished adding project');
  return res.status(200);
});

module.exports = router;