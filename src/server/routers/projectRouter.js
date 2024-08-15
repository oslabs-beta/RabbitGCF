// Package dependencies
const express = require('express');
const router = express.Router();
const { addProject, getAllProjects, getProject, updateProject, deleteProject } = require('./../controllers/projectController.js')

router.post('/add', getProject, addProject, (req, res) => {
  return res.status(200).send();
});

router.post('/listing', getAllProjects, (req, res) => {
  return res.status(200).json(res.locals.projects);
})

router.post('/update', updateProject, (req, res) => {
  return res.status(200).send();
})

router.post('/delete', deleteProject, (req, res) => {
  return res.status(200).send();
})

module.exports = router;