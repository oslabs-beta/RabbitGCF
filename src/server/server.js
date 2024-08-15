const express = require('express');
const passport = require('passport');
const session  = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const apiRouter = require('./routes/apiRouter');

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

// routers
app.use('/api/metrics', require('./routers/metricsRouter'))
app.use('/api/user', require('./routers/userRouter'));
app.use('/api/forecast', require('./routers/forecastRouter'));
app.use('/api/project', require('./routers/projectRouter'));
// app.use('/api', apiRouter);

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
