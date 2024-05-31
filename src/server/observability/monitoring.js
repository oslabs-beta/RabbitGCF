const monitoring = require('@google-cloud/monitoring');

async function quickstart() {
  // create client
  const client = new monitoring.MetricServiceClient();

  const pId = 'refined-engine-424416-p7';

  // prepare individual data point
  const dataPoint = {
    interval: {
      endTime: {
        seconds: Date.now() / 1000,
      }
    },
    value: {
      // metric we are trying to capture

    }
  };

  // prepares time series request
  const request = {
    name: client.projectPath(pId),
    timeSeries: [
      {
        // tie data point to custom metric
        metric: {
          type: 'custom.googleapis.com/...',
          labels: {
            // add labels here
          }
        },
        resource: {
          type: 'global',
          labels: {
            project_id: pId
          }
        },
        points: [dataPoint]
      }
    ]
  };

  // write time series data
  const [result] = await client.createTimeSeries(request);
  console.log(`Done writing time series data. ${result}`);
}

// quickstart();