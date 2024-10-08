const express = require('express');
const passport = require('passport');
const session  = require('express-session');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });
const PORT = 3000;
const app = express();

const metricsController = require('./controllers/metrics');
const graphController = require('./controllers/graphController');
// const authController = require('./controllers/authController');
const bigQuery = require('./controllers/bigQuery');

app.use(express.json());
app.use(express.static(path.join(__dirname, './../client')));

// app.use(session({ 
  //   secret: process.env.SESSION_SECRET,
  //   resave: true,
//   saveUninitialized: true
// }));

// app.post('/bigquery/datasets/:projectId', bigQuery.getDatasets, (req, res) => {
//   return res.status(200).send(res.locals);
// });

app.get('/api/getProjectId', (req, res) => {
  return res.status(200).json(process.env.PROJECT_ID);
})

app.get('/api/metrics/funcs/:projectId', metricsController.getFuncs, (req, res) => {
  // return res.status(200).send(res.locals.funcNames);
  return res.status(200).send(res.locals.funcConfigs);
})

app.get('/api/metrics/execution_count/:projectId', metricsController.executionCount, (req, res) => {
  return res.status(200).send(res.locals.execution_count);
});

app.get('/api/metrics/execution_times/:projectId', metricsController.executionTimes, (req, res) => {
  return res.status(200).send(res.locals.execution_times);
});

app.get('/api/metrics/user_memory_bytes/:projectId', metricsController.userMemoryBytes, (req, res) => {
  return res.status(200).send(res.locals.user_memory_bytes);
});

app.get('/api/metrics/network_egress/:projectId', metricsController.networkEgress, (req, res) => {
  return res.status(200).send(res.locals.network_egress);
});

// routers
app.use('/api/user', require('./routers/userRouter'));
app.use('/api/forecast', require('./routers/forecastRouter'));
app.use('/api/project', require('./routers/projectRouter'));

// catch-all route handler
app.use('*', (req, res) => {
  res.status(404).json('!!Page not found!!');
});

// global error handler
app.use((err, req, res) => {
  console.log('ERROR HANDLER INVOKED')
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: 'An error occurred' ,
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// set up the server to listen for http requests
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
