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
const authController = require('./controllers/authController');
const bigQuery = require('./controllers/bigQuery');

app.use(express.json());
app.use(express.static(path.join(__dirname, './../client')));
app.use(session({ 
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

// Initialize passport and sessions
app.use(passport.initialize());
app.use(passport.session());

app.post('/bigquery/datasets/:projectId', bigQuery.getDatasets, (req, res) => {
  return res.status(200).send(res.locals.datasetList);
});

app.get('/metrics/timeseries/:projectId', metricsController.getMetrics, (req, res) => {
  return res.status(200).send(res.locals.metrics);
})

// routers
app.use('/auth', require('./routers/authRouter'));
app.use('/user', require('./routers/userRouter'));

// catch-all route handler
app.use((req, res) => {
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