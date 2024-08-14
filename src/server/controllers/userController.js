const sql = require('../../db/db');

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const { name, email, profile_id } = req.body;

    const response = await sql`INSERT INTO users (name, email, profile_id) VALUES (${name}, ${email}, ${profile_id}) RETURNING *`;
    res.locals.user = response;

    return next();
  } catch (error) {
    return next({
      log: `Error in createUser middleware: ${error}`,
      status: 500,
      message: 'An error occured creating a user',
    });
  }
}

userController.getUser = async (req, res, next) => {
  try {
    const { profile_id } = req.body;

    const response = await sql`SELECT * FROM users WHERE profile_id=${profile_id}`;
    res.locals.user = response;

    return next();
  } catch (error) {
    return next({
      log: `Error in getUser middleware: ${error}`,
      status: 500,
      message: 'An error occured getting a user',
    });
  }
}