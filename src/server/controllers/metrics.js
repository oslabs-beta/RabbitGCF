const monitoring = require('@google-cloud/monitoring');

// create a client
const client = new monitoring.MetricServiceClient();
const metrics = [
  'metric.type="cloudfunctions.googleapis.com/function/execution_count"',
  'metric.type="cloudfunctions.googleapis.com/function/execution_times"',
  'metric.type="cloudfunctions.googleapis.com/function/instance_count"',
  'metric.type="cloudfunctions.googleapis.com/function/user_memory_bytes"'
];

const metricsController = {
  getMetrics: async (req, res, next) => {
    const { projectId } = req.params;
    console.log(`getMetrics projectId: ${projectId}`);

    const requests = metrics.map(el => {
      return {
        name: client.projectPath(projectId),
        filter: metrics[el],
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
    console.log(`getMetrics request objects: ${requests}`);

    try {
      const responses = requests.map(async el => {
        const apiCall = await client.listTimeSeries(requests[el]);
        console.log(`listTimeSeries response for ${el}: ${apiCall}`);
        return apiCall;
      });
      res.locals.metrics = responses;
      return next();
    } catch (err) {
      return next(`Something went wrong. ERROR: ${err}`);
    }
  }
};


module.exports = metricsController;