const express = require('express');
const passport = require('passport');
const session  = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const apiRouter = require('./routes/apiRouter');

// dotenv.config({ path: './.env' });
const PORT = 3000;
const app = express();

const metricsController = require('./controllers/metrics');
const graphController = require('./controllers/graphController');
const authController = require('./controllers/authController');
const bigQuery = require('./controllers/bigQuery');

app.use(express.json());
app.use(express.static(path.join(__dirname, './../client')));

app.use('/api', apiRouter);

// app.use(session({ 
//   secret: process.env.SESSION_SECRET,
//   resave: true,
//   saveUninitialized: true
// }));

// Initialize passport and sessions
// app.use(passport.initialize());
// app.use(passport.session());

// app.post('/bigquery/datasets/:projectId', bigQuery.getDatasets, (req, res) => {
//   return res.status(200).send(res.locals);
// });

// app.get('/api/metrics/funcs/:projectId', metricsController.getFuncs, (req, res) => {
//   return res.status(200).send(res.locals);
// })

// app.get('/api/metrics/execution_count/:projectId', metricsController.executionCount, (req, res) => {
//   return res.status(200).send(res.locals);
// });

// app.get('/api/metrics/execution_times/:projectId', metricsController.executionTimes, (req, res) => {
//   return res.status(200).send(res.locals);
// });

// app.get('/api/metrics/user_memory_bytes/:projectId', metricsController.userMemoryBytes, (req, res) => {
//   return res.status(200).send(res.locals);
// });

// routers
app.use('/auth', require('./routers/authRouter'));
app.use('/user', require('./routers/userRouter'));

app.get('/*', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, './../client/index.html'));
});


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