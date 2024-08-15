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

projectController.updateProject = async (req, res, next) => {
  try {
    const { id, profile_id, project_id, project_name, key } = req.body;

    const response = await sql`UPDATE projects * SET (project_name, project_id, key) = (${project_name}, ${project_id}, ${key}) WHERE profile_id=${profile_id} AND id=${id}`;
    res.locals.updatedProject = response;

    return next();
  } catch {
    return next({
      log: `Error in getProject middleware: ${error}`,
      status: 500,
      message: 'An error occured updating a project',
    });
  }
}

projectController.deleteProject = async (req, res, next) => {
  try {
    const { profile_id, project_id, project_name } = req.body;

    const response = await sql`DELETE FROM projects * WHERE profile_id=${profile_id} AND project_id=${project_id} AND project_name=${project_name}`;

    return next();
  } catch {
    return next({
      log: `Error in getProject middleware: ${error}`,
      status: 500,
      message: 'An error occured deleting a project',
    });
  }
}

module.exports = projectController;
