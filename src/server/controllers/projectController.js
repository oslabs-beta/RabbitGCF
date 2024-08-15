const sql = require('../../db/db');

const projectController = {};

projectController.addProject = async (req, res, next) => {
  try {
    console.log('addProject middleware invoked')
    const { project_name, project_id, profile_id, key } = req.body;

    if(res.locals.recordExists) return next();
    else {
      const response = await sql`INSERT INTO projects (project_name, project_id, profile_id, key) VALUES (${project_name}, ${project_id}, ${profile_id}, ${key}) RETURNING id, project_name`;

      res.locals.project = response;
      console.log('addProject sql response ==>', response);
      return next();
    }
  } catch (error) {
    return next({
      log: `Error in addProject middleware: ${error}`,
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
      log: `Error in getAllProjects middleware: ${error}`,
      status: 500,
      message: 'An error occured getting all projects',
    });
  }
}

projectController.getProject = async (req, res, next) => {
  try {
    console.log('getProject middleware invoked')
    const { profile_id, project_id } = req.body;

    const response = await sql`SELECT * FROM projects WHERE profile_id=${profile_id} AND project_id=${project_id}`;
    res.locals.project = response;

    if(response.length === 0) {
      console.log('project does not exist in database')
      res.locals.recordExists = false;
      return next();
    } else {
      res.locals.recordExists = true;
      return next();
    }

    return next();
  } catch (error) {
    return next({
      log: `Error in getProject middleware: ${error}`,
      status: 500,
      message: 'An error occured getting a project',
    });
  }
}

module.exports = projectController;
