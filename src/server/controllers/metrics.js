const monitoring = require('@google-cloud/monitoring');
const cloudFuncs = require('@google-cloud/functions');
const { Logging } = require('@google-cloud/logging');
const fs = require('fs');
const keyFile = require('../../../refined-engine-424416-p7-644c42d9ba48.json');

// create a client
// const client = new monitoring.MetricServiceClient();
// const connection = async () => {
//   await client.initialize();
// }
// connection();


const metrics = [
  'metric.type="cloudfunctions.googleapis.com/function/execution_count"',
  'metric.type="cloudfunctions.googleapis.com/function/execution_times"',
  'metric.type="cloudfunctions.googleapis.com/function/instance_count"',
  'metric.type="cloudfunctions.googleapis.com/function/user_memory_bytes"'
];

const metricsController = {
  getMetrics: async (req, res, next) => {
    // cloudFuncs.v2.
    
    const { projectId } = req.params;
    console.log(`getMetrics projectId: ${projectId}`);

    const requests = metrics.map((el, index) => {
      return {
        name: client.projectPath(projectId),
        filter: metrics[index],
        interval: {
          startTime: {
            // limit results to last 30 minutes
            seconds: Date.now() / 1000 - 60 * 30
          },
          endTime: {
            seconds: Date.now() / 1000
          }
        }
      };
    });
    console.log(`getMetrics request objects: ${typeof requests}`);
    console.log(`getMetrics request object at index 0: ${requests[0]}`);

    try {
      const responses = requests.map(async (el, index) => {
        console.log(`This is requests[el]: ${requests[index]}`);
        const [apiCall] = await client.listTimeSeries(requests[index]);
        console.log(`listTimeSeries response for ${el}: ${apiCall}`);
        return apiCall;
      });
      res.locals.metrics = responses;
      return next();
    } catch (err) {
      return next(`Something went wrong. ERROR: ${err}`);
    }
  },

  test: async (req, res, next) => {
    const projectId = 'refined-engine-424416-p7';

    const login = new Logging({ credentials: keyFile });
    const logName = 'cloudfunctions.googleapis.com%2Fcloud-functions';

    const newLogs = await login.getEntries();
    // console.log(`This is newLogs: ${newLogs}`);
  }
};

metricsController.test();


module.exports = metricsController;