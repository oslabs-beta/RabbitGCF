// Require dependencies
const gcfPricingStructure = require('../../../gcfPricingStructure');

// DUMMY DATA - DELETE LATER once connected to metrics middleware
const dummyExecTime = [
  { name: 1, timeMS: 200, date: 'Tue Jun 11 2024 20:51:21 GMT-0700 (Pacific Daylight Time)'  },
  { name: 2, timeMS: 300, date: 'Tue Jun 11 2024 20:51:22 GMT-0700 (Pacific Daylight Time)' },
  { name: 3, timeMS: 200, date: 'Tue Jun 11 2024 20:51:23 GMT-0700 (Pacific Daylight Time)' },
  { name: 4, timeMS: 400, date: 'Tue Jun 11 2024 20:51:24 GMT-0700 (Pacific Daylight Time)' },
  { name: 5, timeMS: 200, date: 'Tue Jun 11 2024 20:51:24 GMT-0700 (Pacific Daylight Time)' },
  { name: 6, timeMS: 300, date: 'Tue Jun 11 2024 20:51:25 GMT-0700 (Pacific Daylight Time)' },
  { name: 7, timeMS: 400, date: 'Tue Jun 11 2024 20:51:26 GMT-0700 (Pacific Daylight Time)' },
  { name: 8, timeMS: 400, date: 'Tue Jun 11 2024 20:51:27 GMT-0700 (Pacific Daylight Time)' },
  { name: 9, timeMS: 500, date: 'Tue Jun 11 2024 20:51:28 GMT-0700 (Pacific Daylight Time)' },
  { name: 10, timeMS: 200, date: 'Tue Jun 11 2024 20:51:29 GMT-0700 (Pacific Daylight Time)' },
  { name: 11, timeMS: 200, date: 'Tue Jun 11 2024 20:51:29 GMT-0700 (Pacific Daylight Time)' },
  { name: 12, timeMS: 300, date: 'Tue Jun 11 2024 20:51:29 GMT-0700 (Pacific Daylight Time)' },
  { name: 13, timeMS: 200, date: 'Tue Jun 11 2024 20:51:30 GMT-0700 (Pacific Daylight Time)' },
  { name: 14, timeMS: 300, date: 'Tue Jun 11 2024 20:51:31 GMT-0700 (Pacific Daylight Time)' },
  { name: 15, timeMS: 400, date: 'Tue Jun 11 2024 20:51:31 GMT-0700 (Pacific Daylight Time)' },
  { name: 16, timeMS: 500, date: 'Tue Jun 11 2024 20:51:32 GMT-0700 (Pacific Daylight Time)' },
  { name: 17, timeMS: 400, date: 'Tue Jun 11 2024 20:51:33 GMT-0700 (Pacific Daylight Time)' },
  { name: 18, timeMS: 200, date: 'Tue Jun 11 2024 20:51:34 GMT-0700 (Pacific Daylight Time)' },
  { name: 19, timeMS: 300, date: 'Tue Jun 11 2024 20:51:34 GMT-0700 (Pacific Daylight Time)' },
  { name: 20, timeMS: 200, date: 'Tue Jun 11 2024 20:51:35 GMT-0700 (Pacific Daylight Time)' }
];

const dummyMemory = [
  { name: 1, memoryKB: 1024, date: 'Tue Jun 11 2024 20:51:21 GMT-0700 (Pacific Daylight Time)'  },
  { name: 2, memoryKB: 1000, date: 'Tue Jun 11 2024 20:51:22 GMT-0700 (Pacific Daylight Time)' },
  { name: 3, memoryKB: 900, date: 'Tue Jun 11 2024 20:51:23 GMT-0700 (Pacific Daylight Time)' },
  { name: 4, memoryKB: 900, date: 'Tue Jun 11 2024 20:51:24 GMT-0700 (Pacific Daylight Time)' },
  { name: 5, memoryKB: 1050, date: 'Tue Jun 11 2024 20:51:24 GMT-0700 (Pacific Daylight Time)' },
  { name: 6, memoryKB: 990, date: 'Tue Jun 11 2024 20:51:25 GMT-0700 (Pacific Daylight Time)' },
  { name: 7, memoryKB: 800, date: 'Tue Jun 11 2024 20:51:26 GMT-0700 (Pacific Daylight Time)' },
  { name: 8, memoryKB: 1000, date: 'Tue Jun 11 2024 20:51:27 GMT-0700 (Pacific Daylight Time)' },
  { name: 9, memoryKB: 1100, date: 'Tue Jun 11 2024 20:51:28 GMT-0700 (Pacific Daylight Time)' },
  { name: 10, memoryKB: 980, date: 'Tue Jun 11 2024 20:51:29 GMT-0700 (Pacific Daylight Time)' },
  { name: 11, memoryKB: 890, date: 'Tue Jun 11 2024 20:51:29 GMT-0700 (Pacific Daylight Time)' },
  { name: 12, memoryKB: 900, date: 'Tue Jun 11 2024 20:51:29 GMT-0700 (Pacific Daylight Time)' },
  { name: 13, memoryKB: 900, date: 'Tue Jun 11 2024 20:51:30 GMT-0700 (Pacific Daylight Time)' },
  { name: 14, memoryKB: 950, date: 'Tue Jun 11 2024 20:51:31 GMT-0700 (Pacific Daylight Time)' },
  { name: 15, memoryKB: 800, date: 'Tue Jun 11 2024 20:51:31 GMT-0700 (Pacific Daylight Time)' },
  { name: 16, memoryKB: 900, date: 'Tue Jun 11 2024 20:51:32 GMT-0700 (Pacific Daylight Time)' },
  { name: 17, memoryKB: 1000, date: 'Tue Jun 11 2024 20:51:33 GMT-0700 (Pacific Daylight Time)' },
  { name: 17, memoryKB: 1050, date: 'Tue Jun 11 2024 20:51:33 GMT-0700 (Pacific Daylight Time)' },
  { name: 18, memoryKB: 900, date: 'Tue Jun 11 2024 20:51:34 GMT-0700 (Pacific Daylight Time)' },
  { name: 19, memoryKB: 800, date: 'Tue Jun 11 2024 20:51:34 GMT-0700 (Pacific Daylight Time)' },
  { name: 20, memoryKB: 990, date: 'Tue Jun 11 2024 20:51:35 GMT-0700 (Pacific Daylight Time)' }
];
// ============= End of Dummy Data ================

const forecastController = {
  /**
   * Function retrieves historical data and calulates average historical run time 
   * and network bandwidth memory utilization
   */
  calcHistorical (req, res, next){
    const { functionName } = req.body;

    console.log('calcHistorical middleware invoked =========');
    // fetch function metrics for the last 30 invocations to get average runtime and memory usage
    try {
      /**
       * fetch(metrics API)
       * ----- REFACTOR WHEN METRICS MIDDLEWARE COMPLETE -----
       * dummyExecTime and dummyMemory arrays should be retrieved from Metrics middleware and replaced below
       */  
      const hstExecutionTimes = res.locals.execution_times.filter(func => {
        if(func.name === functionName) return func;
      })[0].points;

      let hstExecutionTimeData = (hstExecutionTimes.length > 30) ? hstExecutionTimes.slice(0, 30) : hstExecutionTimes;

      const totalExecTimeMS = hstExecutionTimeData.reduce((acc, dataPoint) => { return acc + dataPoint.value }, 0);
      const avgExecTimeMS = totalExecTimeMS / hstExecutionTimeData.length;
      res.locals.avgExecTimeMS = avgExecTimeMS / 1000;
      
      // Calc avg historical memory usage
      // res.locals.user_memory_bytes
      const hstMemory = res.locals.user_memory_bytes.filter(func => {
        if(func.name === functionName) return func;
      })[0].points;

      let hstMemoryData = (hstMemory.length > 30) ? hstEMemory.slice(0, 30) : hstMemory;
      // console.log(hstMemoryData);

      const totalMemoryKB = hstMemoryData.reduce((acc, dataPoint) => { return acc + dataPoint.value }, 0);
      const avgMemoryKB = totalMemoryKB / hstMemoryData.length;
      res.locals.avgMemoryKB = avgMemoryKB;

      console.log(`average memory in KB: ${avgMemoryKB} | average execution time in ms: ${avgExecTimeMS}`);

      return next();
    } catch (err) {
      return next({
        log: 'Error in calcHistorical middleware - error retrieving historical metrics',
        status: 404,
        message: { err },
      });
    }        
  },

  forecast (req, res, next){
    // REFACTOR: Need to handle minimum number of instances pricing
    const { region, generation, type, increments, maxIncrements } = req.body;
    // ------ Test data -----
    // const testArguments = {
    //   region: 'us-central1',
    //   generation: '1',
    //   type: 'Memory: 4096MB / CPU: 4.8GHz',
    //   invocationIncrements: 200000,
    //   maxIncrement: 12,
    // };
    // -----------------------
    
    // Retrieve gfc configurations
    const tier = gcfPricingStructure.gcfRegionTiers[region][generation];
    // console.log(gcfPricingStructure.gcfRegionTiers[region][]);
    // console.log('tier ===>',region, typeof generation, tier);
    const memoryConfig = gcfPricingStructure.gcfTypes[type].mb;
    const cpuMHzConfig = gcfPricingStructure.gcfTypes[type].mhz;

    // Create output array
    const forecastDataSeries = [];

    const calcInvocationCosts = (increments, maxIncrement) => {
      const freeInvocations = 2000000; // number of monthly free invocations allowed by Google
      const costPerInvocation = 0.40 / 1000000; // Google's cost per million invocation
      
      for (let i = 0; i <= maxIncrement; i++) {
        const invocations = increments * i; // calc invocations based on arguments
        const netInvocations = Math.max(0, invocations - freeInvocations); // less than free invocations provided
        const invocationCost = netInvocations * costPerInvocation; // calc invocations * unit price

        forecastDataSeries.push({
          invocationCost,
          totalCost: invocationCost,
          invocations,
        });
      };
    }

    const calcComputeRAMCost = (gcfMemoryConfigMb, gcfHistoricalRunTime) => {
      const freeGbRAM = 400000; // free monthly RAM allowed by Google
      const unitPriceRAM = gcfPricingStructure.gcfComputePricing[tier].memoryGbPrice; // price based on tier

      const gcfGbMemoryConfigGb = gcfMemoryConfigMb / 1024; // conversion from MB to GB
      const cpuGbSecond = gcfGbMemoryConfigGb * gcfHistoricalRunTime; // calc GB-seconds based on gcf type

      for (let i = 0; i < forecastDataSeries.length; i++) {
        const totalGbRAM = forecastDataSeries[i].invocations * cpuGbSecond; // calc total GB-ram usage based on invocations
        const netRAMUsageGb = Math.max(0, totalGbRAM - freeGbRAM); // less any free RAM provided
        const cpuRAMCost = netRAMUsageGb * unitPriceRAM; // calc ram used * unit price
        
        forecastDataSeries[i].cpuRAMCost = cpuRAMCost;
        forecastDataSeries[i].totalCost += cpuRAMCost;
      }
    }

    const calcComputeGHzCost = (gcfMHzConfig, gcfHistoricalRunTime) => {
      const freeGHz = 200000; // free monthly RAM allowed by Google
      const unitPriceGHz = gcfPricingStructure.gcfComputePricing[tier].cpuGHzPrice; // price based on tier

      const gcfGHzConfig = gcfMHzConfig / 1000; // conversion from MHz to GHz
      const cpuGHzSecond = gcfGHzConfig * gcfHistoricalRunTime; // calc GHz-second based on config

      for (let i = 0; i < forecastDataSeries.length; i++) {
        const totalGHz = forecastDataSeries[i].invocations * cpuGHzSecond; // calc total GHz cost based on invocations
        const netGHzUsage = Math.max(0, totalGHz - freeGHz); // less free GHz provided
        const cpuGHzCost = netGHzUsage * unitPriceGHz; // calc GHz used * unit price

        forecastDataSeries[i].cpuGHzCost = cpuGHzCost;
        forecastDataSeries[i].totalCost += cpuGHzCost;
      }
    }

    const calcNetworkBandwithCost = (gcfHistoricalBandwidthKb) => {
      const freeBandwidthGb = 5; // free monthly bandwidth GB allowed by Google
      const unitPriceBandwidthGb = 0.12; // fixed price per Google

      const gcfBandwidthGb = gcfHistoricalBandwidthKb / 1048576; // conversion from KB to GB per invocation

      for (let i = 0; i < forecastDataSeries.length; i++) {
        const totalNetworkBandwidthGb = forecastDataSeries[i].invocations * gcfBandwidthGb; // calc total network bandwidth cost
        const netNetworkBandwithGb = Math.max(0, totalNetworkBandwidthGb - freeBandwidthGb); // less any free network bandwidth provided
        const networkBandwidthCost =  netNetworkBandwithGb * unitPriceBandwidthGb; // calc networkbandwidth used * unit price

        forecastDataSeries[i].networkBandwidthCost = networkBandwidthCost;
        forecastDataSeries[i].totalCost += networkBandwidthCost;
      }
    }

    calcInvocationCosts(increments, maxIncrements);
    calcComputeRAMCost(memoryConfig, res.locals.avgExecTimeMS);
    calcComputeGHzCost(cpuMHzConfig, res.locals.avgExecTimeMS);
    calcNetworkBandwithCost(res.locals.avgMemoryKB);

    res.locals.forecastDataSeries = forecastDataSeries;
    return next();
  }
};

module.exports = forecastController;