const monitoring = require('@google-cloud/monitoring');
const { FunctionServiceClient } = require('@google-cloud/functions').v2;

const funcsClient = new FunctionServiceClient();
const monClient = new monitoring.MetricServiceClient();

const metricsController = {
  getFuncs: async (req, res, next) => {
    const { projectId } = req.params;
    const parent = `projects/${projectId}/locations/-`;
    const request = { parent };

    try {
      const response = {
        funcList: [],
        configurations: {},
      };
      const iterable = funcsClient.listFunctionsAsync(request);
      for await (const func of iterable) {
        const testRegex = /.*?locations\/(.*)\/.*?functions\/(.*)/;
        const testTrim = func.name.match(testRegex);
        const funcName = testTrim[2];
        response.funcList.push(funcName);
        response.configurations[funcName] = {
          funcRegion: testTrim[1],
          funcType: func.serviceConfig.availableMemory,
          funcGeneration: func.environment,
        }
      }

      res.locals.funcConfigs = response;
      
      return next();
    } catch (err) {
      return next(`Could not get functions list. ERROR: ${err}`);
    }
  },

  executionCount: async (req, res, next) => {
    const { projectId } = req.params;
    const { timeRange } = req.query;

    const execution_count = `metric.type="cloudfunctions.googleapis.com/function/execution_count" AND resource.labels.project_id="${projectId}"`;
    const request = {
      name: monClient.projectPath(projectId),
      filter: execution_count,
      interval: {
        startTime: {
          seconds: Date.now() / 1000 - 60 * timeRange
        },
        endTime: {
          seconds: Date.now() / 1000
        }
      }
    };

    try {
      const [ timeSeries ] = await monClient.listTimeSeries(request);
      const parsedTimeSeries = {};
      timeSeries.forEach(obj => {
        if (obj.metric.labels.status === 'ok') {
          const newPoints = [];
          
          obj.points.forEach(point => {
            const time = new Date(point.interval.startTime.seconds * 1000).toLocaleString();
            newPoints.push({
              timestamp: time,
              value: Number(point.value.int64Value)
            });
          });
          
          parsedTimeSeries[obj.resource.labels.function_name] = newPoints.sort((a, b) => a.timestamp - b.timestamp);
        };
      });
      res.locals.execution_count = parsedTimeSeries;

      return next();
    } catch (err) {
      return next(`Could not get execution count data. ERROR: ${err}`);
    }
  },

  executionTimes: async (req, res, next) => {
    const { projectId } = req.params;
    const { timeRange } = req.query;

    const execution_times = `metric.type="cloudfunctions.googleapis.com/function/execution_times" AND resource.labels.project_id="${projectId}"`;
    const request = {
      name: monClient.projectPath(projectId),
      filter: execution_times,
      interval: {
        startTime: {
          seconds: Date.now() / 1000 - 60 * timeRange
        },
        endTime: {
          seconds: Date.now() / 1000
        }
      }
    };

    try {
      const [ timeSeries ] = await monClient.listTimeSeries(request);
      const parsedTimeSeries = {};
      timeSeries.forEach(obj => {
        const newPoints = [];

        obj.points.forEach(point => {
          const time = new Date(point.interval.startTime.seconds * 1000).toLocaleString();
          newPoints.push({
            timestamp: time,
            value: Math.round(point.value.distributionValue.mean / 1000000)
          });
        });

        parsedTimeSeries[obj.resource.labels.function_name] = newPoints.sort((a, b) => a.timestamp - b.timestamp);

        // return newSeries;
      });


      res.locals.execution_times = parsedTimeSeries;

      return next();
    } catch (err) {
      return next(`Could not get execution times data. ERROR: ${err}`);
    }
  },

  userMemoryBytes: async (req, res, next) => {
    const { projectId } = req.params;
    const { timeRange } = req.query;
    
    const user_memory_bytes = `metric.type="cloudfunctions.googleapis.com/function/user_memory_bytes" AND resource.labels.project_id="${projectId}"`;
    const request = {
      name: monClient.projectPath(projectId),
      filter: user_memory_bytes,
      interval: {
        startTime: {
          seconds: Date.now() / 1000 - 60 * timeRange
        },
        endTime: {
          seconds: Date.now() / 1000
        }
      }
    };
    
    const normalizeTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      date.setSeconds(0, 0);
      return date.toISOString();
    };
    
    try {
      const [ timeSeries ] = await monClient.listTimeSeries(request);
      const parsedTimeSeries = {};
      timeSeries.forEach(obj => {
        const newPoints = [];
        
        obj.points.forEach(point => {
          const time = new Date(point.interval.startTime.seconds * 1000).toLocaleString();
          newPoints.push({
            timestamp: normalizeTimestamp(time),
            value: Math.round(point.value.distributionValue.mean / 1048576 * 100) / 100
          });
        });
        
        parsedTimeSeries[obj.resource.labels.function_name] = newPoints.sort((a, b) => a.timestamp - b.timestamp);
        
        // return newSeries;
      });
      
      res.locals.user_memory_bytes = parsedTimeSeries;

      return next();
    } catch (err) {
      return next(`Could not get user memory bytes data. ERROR: ${err}`);
    }
  },

  networkEgress: async (req, res, next) => {
    const { projectId } = req.params;
    const { timeRange } = req.query;
  
    const network_egress = `metric.type="cloudfunctions.googleapis.com/function/network_egress" AND resource.labels.project_id="${projectId}"`;
    const request = {
      name: monClient.projectPath(projectId),
      filter: network_egress,
      interval: {
        startTime: {
          seconds: Date.now() / 1000 - 60 * timeRange
        },
        endTime: {
          seconds: Date.now() / 1000
        }
      }
    };
  
    try {
      const [ timeSeries ] = await monClient.listTimeSeries(request);
      const parsedTimeSeries = {};
      timeSeries.forEach(obj => {
        const newPoints = [];
        
        obj.points.forEach(point => {
          const time = new Date(point.interval.startTime.seconds * 1000).toLocaleString();
          newPoints.push({
            timestamp: time,
            value: Math.round(point.value.int64Value / 1048576 * 100) / 100
          });
        });

        // newSeries.name = obj.resource.labels.function_name;
        parsedTimeSeries[obj.resource.labels.function_name] = newPoints.sort((a, b) => a.timestamp - b.timestamp);;
        
        // return newSeries;
      });
      res.locals.network_egress = parsedTimeSeries;
  
      return next();
    } catch (err) {
      return next(`Could not get network egress data. ERROR: ${err}`);
    }
  }
};


module.exports = metricsController;