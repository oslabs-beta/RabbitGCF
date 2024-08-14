const sql = require('../../db/db');

const projectController = {};

projectController.addProject = async (req, res, next) => {
  try {
    const { project_name, project_id, profile_id, key } = req.body;

    const response = await sql`INSERT INTO projects (project_name, project_id, profile_id, key) VALUES (${project_name}, ${project_id}, ${profile_id}, ${key}) RETURNING id, project_name`;
    res.locals.project = response;

    return next();
  } catch (error) {
    return next({
      log: `Error in addProject middleware: ${err}`,
      status: 500,
      message: 'An error occured adding a project',
    });
  }
}

projectController.getAllProjects = async (req, res, next) => {
  try {
    const { profile_id } = req.body;

    const response = await sql`SELECT * FROM projects WHERE profile_id=${profile_id}`;
    res.locals.projects = response;

    return next();
  } catch (error) {
    return next({
      log: `Error in getAllProjects middleware: ${err}`,
      status: 500,
      message: 'An error occured getting all projects',
    });
  }
}

projectController.getProject = async (req, res, next) => {
  try {
    const { profile_id, project_id } = req.body;

    const response = await sql`SELECT * FROM projects WHERE profile_id=${profile_id} AND project_id=${project_id}`;
    res.locals.project = response;

    return next();
  } catch (error) {
    return next({
      log: `Error in getProject middleware: ${err}`,
      status: 500,
      message: 'An error occured getting a project',
    });
  }
}
