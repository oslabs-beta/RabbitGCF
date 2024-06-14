const express = require('express');
const path = require('path');
const apiRouter = require('./routes/apiRouter');

const PORT = 3000;
const app = express();

const metricController = require('./controllers/metricController');
const graphController = require('./controllers/graphController');
const authController = require('./controllers/authController');

app.use(express.json());
app.use(express.static(path.join(__dirname, './../client')));

// app.get('/*', (req, res) => {
//   return res.status(200).sendFile(path.join(__dirname, './../client/index.html'));
// })
app.use('/api', apiRouter);

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