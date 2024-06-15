const express = require('express');
const path = require('path');

const PORT = 3000;
const app = express();

const metricController = require('./controllers/metricController');
const graphController = require('./controllers/graphController');
const authController = require('./controllers/authController');

app.use(express.json());
app.use(express.static(path.join(__dirname, './../client')));

// catch-all route handler
app.use('*', (req, res) => {
  res.status(404).send('!!Page not found!!');
});

// global error handler
app.use((err, req, res) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// set up the server to listen for http requests
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});