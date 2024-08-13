const monitoring = require("@google-cloud/monitoring");
const { FunctionServiceClient } = require("@google-cloud/functions").v2;
const path = require('path');

const keyFilename = path.join(__dirname,'../../../refined-engine-424416-p7-60ddb1f75e87.json');

// create needed clients
const funcsClient = new FunctionServiceClient({ keyFilename });
const monClient = new monitoring.MetricServiceClient({ keyFilename });

// const metrics = [
//   'metric.type="cloudfunctions.googleapis.com/function/execution_count"',
//   'metric.type="cloudfunctions.googleapis.com/function/execution_times"',
//   'metric.type="cloudfunctions.googleapis.com/function/instance_count"',
//   'metric.type="cloudfunctions.googleapis.com/function/user_memory_bytes"'
// ];

const metricsController = {
	getFuncs: async (req, res, next) => {
		const { projectId } = req.params;
		// console.log(`parent: ${projectId}`);
		const parent = `projects/${projectId}/locations/-`;
		const request = { parent };
		// const url = `https://cloudfunctions.googleapis.com/v2/projects/${parent}/locations/-`;

    try {
      // const response = [];
      const response = {
        funcList: [],
        configurations: {},
      };
      const iterable = funcsClient.listFunctionsAsync(request);
      // console.log(iterable);
      for await (const func of iterable) {
        // console.log('func ======>',func);
        const testRegex = /.*?locations\/(.*)\/.*?functions\/(.*)/;
        const testTrim = func.name.match(testRegex);
        const funcName = testTrim[2];
        response.funcList.push(funcName);
        response.configurations[funcName] = {
          funcRegion: testTrim[1],
          funcType: func.serviceConfig.availableMemory,
          funcGeneration: func.environment,
        }

        // response.push(func.name);
      }
      // console.log(`payload array: ${payload}`);
      // const trimmed = response.map(el => {
      //   const regex = /.*?functions\/(.*)/;
      //   const trim = el.match(regex);
      //   return trim[1];
      // })
      // console.log(`trimmed response: ${trimmed}`);
      // res.locals.funcNames = trimmed;

      res.locals.funcConfigs = response;
      console.log(response);
      
      return next();
    } catch (err) {
      return next(`Could not get functions list. ERROR: ${err}`);
    }
  },

  executionCount: async (req, res, next) => {
    // const { funcNames } = res.locals;
    // console.log(`funcNames: ${funcNames}`);
    const { projectId } = req.params;
    // console.log(`projectId: ${projectId}`);
    const { timeRange } = req.query; // added this line

    const execution_count = `metric.type="cloudfunctions.googleapis.com/function/execution_count" AND resource.labels.project_id="${projectId}"`;
    const request = {
      name: monClient.projectPath(projectId),
      filter: execution_count,
      interval: {
        startTime: {
          // how far back in minutes the results go
          seconds: Date.now() / 1000 - 60 * timeRange // changed time for timeRange which will be a query param
        },
        endTime: {
          seconds: Date.now() / 1000
        }
      }
    };

    try {
      const [ timeSeries ] = await monClient.listTimeSeries(request);
      // console.log(timeSeries);
      const parsedTimeSeries = {};
      timeSeries.forEach(obj => {
        // console.log(obj.metric.labels.status);
        if (obj.metric.labels.status === 'ok') {
          const newPoints = [];
          
          obj.points.forEach(point => {
            const time = new Date(point.interval.startTime.seconds * 1000).toLocaleString();
            newPoints.push({
              timestamp: time,
              value: Number(point.value.int64Value)
            });
          });
          
          // newSeries.points = newPoints.sort((a, b) => a.timestamp - b.timestamp);
          // newSeries.points.map((el) => el.timestamp = el.timestamp.toLocaleString());
          // newSeries.name = obj.resource.labels.function_name;
          // console.log("new Series exec count => ", newSeries);
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
    // const { funcNames } = res.locals;
    // console.log(`funcNames: ${funcNames}`);
    const { projectId } = req.params;
    // console.log(`projectId: ${projectId}`);
    const { timeRange } = req.query; // adding timeRange in our fetch reqs

    const execution_times = `metric.type="cloudfunctions.googleapis.com/function/execution_times" AND resource.labels.project_id="${projectId}"`;
    const request = {
      name: monClient.projectPath(projectId),
      filter: execution_times,
      interval: {
        startTime: {
          // how far back in minutes the results go
          seconds: Date.now() / 1000 - 60 * timeRange // added timeRange
        },
        endTime: {
          seconds: Date.now() / 1000
        }
      }
    };

		try {
			const [timeSeries] = await monClient.listTimeSeries(request);
			// console.log(timeSeries);
			const parsedTimeSeries = {};
			timeSeries.forEach((obj) => {
				const newPoints = [];

        obj.points.forEach(point => {
          const time = new Date(point.interval.startTime.seconds * 1000).toLocaleString();
          newPoints.push({
            timestamp: time,
            value: Math.round(point.value.distributionValue.mean / 1000000) // converting from nanoseconds to milliseconds
          });
        });

        // newSeries.points = newPoints.sort((a, b) => a.timestamp - b.timestamp);
        // newSeries.points.map((el) => el.timestamp = el.timestamp.toLocaleString());

        // newSeries.name = obj.resource.labels.function_name;
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
    // const { funcNames } = res.locals;
    // console.log(`funcNames: ${funcNames}`);
    const { projectId } = req.params;
    // console.log(`projectId: ${projectId}`);
    const { timeRange } = req.query; // adding timeRange
    
    const user_memory_bytes = `metric.type="cloudfunctions.googleapis.com/function/user_memory_bytes" AND resource.labels.project_id="${projectId}"`;
    const request = {
      name: monClient.projectPath(projectId),
      filter: user_memory_bytes,
      interval: {
        startTime: {
          // how far back in minutes the results go
          seconds: Date.now() / 1000 - 60 * timeRange // adding timeRange
        },
        endTime: {
          seconds: Date.now() / 1000
        }
      }
    };
    
    // setting seconds and milliseconds to 0 so we don't skip in graph
    const normalizeTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      date.setSeconds(0, 0);
      return date.toISOString();
    };
    
    try {
      const [ timeSeries ] = await monClient.listTimeSeries(request);
      // console.log(timeSeries);
      const parsedTimeSeries = {};
      timeSeries.forEach(obj => {
        const newPoints = [];
        
        obj.points.forEach(point => {
          const time = new Date(point.interval.startTime.seconds * 1000).toLocaleString();
          newPoints.push({
            timestamp: normalizeTimestamp(time),
            value: Math.round(point.value.distributionValue.mean / 1048576 * 100) / 100 // converting from bytes to mebibytes
          });
        });
        
        parsedTimeSeries[obj.resource.labels.function_name] = newPoints.sort((a, b) => a.timestamp - b.timestamp);
        // newSeries.points = newPoints.sort((a, b) => a.timestamp - b.timestamp);
        // newSeries.points.map((el) => el.timestamp = el.timestamp.toLocaleString());


        // newSeries.name = obj.resource.labels.function_name;
        
        // return newSeries;
      });

      // parsedTimeSeries.forEach(series => {
      //   console.log("Parsed Time Series:");
      //   console.dir(series, { depth: null }); // Adjust depth as needed
      // });
      
      res.locals.user_memory_bytes = parsedTimeSeries;

			return next();
		} catch (err) {
			return next(`Could not get user memory bytes data. ERROR: ${err}`);
		}
	},

  networkEgress: async (req, res, next) => {
    // const { funcNames } = res.locals;
    // console.log(`funcNames: ${funcNames}`);
    const { projectId } = req.params;
    // console.log(`projectId: ${projectId}`);
    const { timeRange } = req.query; // adding timeRange / at this level, it works
    // console.log("timerange => ", timeRange);
  
    const network_egress = `metric.type="cloudfunctions.googleapis.com/function/network_egress" AND resource.labels.project_id="${projectId}"`;
    const request = {
      name: monClient.projectPath(projectId),
      filter: network_egress,
      interval: {
        startTime: {
          // how far back in minutes the results go
          seconds: Date.now() / 1000 - 60 * timeRange // adding timeRange
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
            value: Math.round(point.value.int64Value / 1048576 * 100) / 100 // converting from bytes to mebibytes
          });
        });
        
        // newSeries.points = newPoints.sort((a, b) => a.timestamp - b.timestamp);
        // newSeries.points.map((el) => el.timestamp = el.timestamp.toLocaleString());

        // newSeries.name = obj.resource.labels.function_name;
        parsedTimeSeries[obj.resource.labels.function_name] = newPoints.sort((a, b) => a.timestamp - b.timestamp);;

        
        // return newSeries;
      });
      // console.log(timeSeries);
      res.locals.network_egress = parsedTimeSeries;
      // parsedTimeSeries.forEach(series => {
      //   console.log("Parsed Time Series:");
      //   console.dir(series, { depth: null }); // Adjust depth as needed
      // });
  
      return next();
    } catch (err) {
      return next(`Could not get network egress data. ERROR: ${err}`);
    }
  }
};

module.exports = metricsController;
