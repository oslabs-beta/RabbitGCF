const monitoring = require("@google-cloud/monitoring");
const { FunctionServiceClient } = require("@google-cloud/functions").v2;

// create needed clients
const funcsClient = new FunctionServiceClient();
const monClient = new monitoring.MetricServiceClient();

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
			const response = [];
			const iterable = funcsClient.listFunctionsAsync(request);
			// console.log(iterable);
			for await (const func of iterable) {
				// console.log(response.name);
				response.push(func.name);
			}
			// console.log(`payload array: ${payload}`);
			const trimmed = response.map((el) => {
				const regex = /.*?functions\/(.*)/;
				const trim = el.match(regex);
				return trim[1];
			});
			// console.log(`trimmed response: ${trimmed}`);
			res.locals.funcNames = trimmed;

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

		const execution_count = `metric.type="cloudfunctions.googleapis.com/function/execution_count" AND resource.labels.project_id="${projectId}"`;
		const request = {
			name: monClient.projectPath(projectId),
			filter: execution_count,
			interval: {
				startTime: {
					// how far back in minutes the results go
					seconds: Date.now() / 1000 - 60 * 43200,
				},
				endTime: {
					seconds: Date.now() / 1000,
				},
			},
		};

		try {
			const [timeSeries] = await monClient.listTimeSeries(request);
			// console.log(timeSeries);
			const parsedTimeSeries = {};
			timeSeries.forEach((obj) => {
				// console.log(obj.metric.labels.status);
				if (obj.metric.labels.status === "ok") {
					const newPoints = [];

					obj.points.forEach((point) => {
						const time = new Date(
							point.interval.startTime.seconds * 1000
						).toLocaleString();
						newPoints.push({
							timestamp: time,
							value: Number(point.value.int64Value),
						});
					});

					// newSeries.points = newPoints;
					// newSeries.name = obj.resource.labels.function_name;
					parsedTimeSeries[obj.resource.labels.function_name] = newPoints;
				}
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

		const execution_times = `metric.type="cloudfunctions.googleapis.com/function/execution_times" AND resource.labels.project_id="${projectId}"`;
		const request = {
			name: monClient.projectPath(projectId),
			filter: execution_times,
			interval: {
				startTime: {
					// how far back in minutes the results go
					seconds: Date.now() / 1000 - 60 * 43200,
				},
				endTime: {
					seconds: Date.now() / 1000,
				},
			},
		};

		try {
			const [timeSeries] = await monClient.listTimeSeries(request);
			// console.log(timeSeries);
			const parsedTimeSeries = {};
			timeSeries.forEach((obj) => {
				const newPoints = [];

				obj.points.forEach((point) => {
					const time = new Date(
						point.interval.startTime.seconds * 1000
					).toLocaleString();
					newPoints.push({
						timestamp: time,
						value: point.value.distributionValue.mean / 1000000, // converting from nanoseconds to milliseconds
					});
				});

				parsedTimeSeries[obj.resource.labels.function_name] = newPoints;
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

		const user_memory_bytes = `metric.type="cloudfunctions.googleapis.com/function/user_memory_bytes" AND resource.labels.project_id="${projectId}"`;
		const request = {
			name: monClient.projectPath(projectId),
			filter: user_memory_bytes,
			interval: {
				startTime: {
					// how far back in minutes the results go
					seconds: Date.now() / 1000 - 60 * 43200,
				},
				endTime: {
					seconds: Date.now() / 1000,
				},
			},
		};

		try {
			const [timeSeries] = await monClient.listTimeSeries(request);
			// console.log(timeSeries);
			const parsedTimeSeries = {};
			timeSeries.forEach((obj) => {
				const newPoints = [];

				obj.points.forEach((point) => {
					const time = new Date(
						point.interval.startTime.seconds * 1000
					).toLocaleString();
					newPoints.push({
						timestamp: time,
						value: point.value.distributionValue.mean / 1048576, // converting from bytes to mebibytes (MiB)
					});
				});

				parsedTimeSeries[obj.resource.labels.function_name] = newPoints;
			});

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

		const network_egress = `metric.type="cloudfunctions.googleapis.com/function/network_egress" AND resource.labels.project_id="${projectId}"`;
		const request = {
			name: monClient.projectPath(projectId),
			filter: network_egress,
			interval: {
				startTime: {
					// how far back in minutes the results go
					seconds: Date.now() / 1000 - 60 * 43200,
				},
				endTime: {
					seconds: Date.now() / 1000,
				},
			},
		};

		try {
			const [timeSeries] = await monClient.listTimeSeries(request);
			const parsedTimeSeries = {};
			timeSeries.forEach((obj) => {
				const newPoints = [];

				obj.points.forEach((point) => {
					const time = new Date(
						point.interval.startTime.seconds * 1000
					).toLocaleString();
					newPoints.push({
						timestamp: time,
						value: point.value.int64Value / 1048576, // converting from bytes to mebibytes
					});
				});

				parsedTimeSeries[obj.resource.labels.function_name] = newPoints;
			});
			// console.log(timeSeries);
			res.locals.network_egress = parsedTimeSeries;

			return next();
		} catch (err) {
			return next(`Could not get network egress data. ERROR: ${err}`);
		}
	},

	// getResources: async (req, res, next) => {
	//   const { projectId } = req.params;
	//   const name = `projects/${projectId}`;

	//   try {
	//     const response = [];
	//     const iterable = monClient.listMonitoredResourceDescriptors(name);
	//     response.push(iterable);

	//     res.locals.resources = response;

	//     return res.locals.resources;
	//   } catch (err) {
	//     return next(`Could not get resources list. ERROR: ${err}`);
	//   }
	// }
};

module.exports = metricsController;
