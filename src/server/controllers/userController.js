const sql = require('../../db/db');

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    if(res.locals.newUser) {
      console.log(req.body);
      const { name, email, profile_id } = req.body;
  
      const response = await sql`INSERT INTO users (name, email, profile_id) VALUES (${name}, ${email}, ${profile_id}) RETURNING *`;
      res.locals.user = response;
      console.log('createUser Response ==>',response);
    }
    return next();
  } catch (err) {
    next({
      log: `Error in createUser middleware: ${err}`,
      status: 500,
      message: 'An error occured creating a user',
    });
  }
}

userController.getUser = async (req, res, next) => {
  try {
    const { profile_id } = req.body;

    const response = await sql`SELECT * FROM users WHERE profile_id=${profile_id}`;

    if(response.length !== 0) {
      res.locals.newUser = false;
    } else {
      res.locals.newUser = true;
    }

    return next();
  } catch (err) {
    next({
      log: `Error in getUser middleware: ${err}`,
      status: 500,
      message: 'An error occured getting a user',
    });
  }
}

module.exports = userController;