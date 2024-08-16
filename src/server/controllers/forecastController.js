// Require dependencies
const gcfPricingStructure = require('../../../gcfPricingStructure');

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
      const hstExecutionTimes = res.locals.execution_times[functionName];

      if(hstExecutionTimes === undefined) {
        console.log('test');
        return next({
          log: 'Error in forecast middleware - no historical invocation data found',
          status: 408,
          message: { err: 'REQUEST TIMEOUT' },
        });
      }

      let hstExecutionTimeData = (hstExecutionTimes.length > 30) ? hstExecutionTimes.slice(0, 30) : hstExecutionTimes;
      
      const totalExecTimeMS = hstExecutionTimeData.reduce((acc, dataPoint) => { return acc + dataPoint.value }, 0);
      const avgExecTimeMS = totalExecTimeMS / hstExecutionTimeData.length;
      res.locals.avgExecTimeMS = avgExecTimeMS / 1000;

      // Calc avg historical memory usage
      const hstMemory = res.locals.user_memory_bytes[functionName];
      
      let hstMemoryData = (hstMemory.length > 30) ? hstMemory.slice(0, 30) : hstMemory;
      

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
    console.log('forecast controller invoked');
    const { region, generation, type, increments, maxIncrements } = req.body;
    
    // Retrieve gfc configurations
    const tier = gcfPricingStructure.gcfRegionTiers[region][generation];
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
        const invocationCost = Number((netInvocations * costPerInvocation).toFixed(2)); // calc invocations * unit price

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
        const cpuRAMCost = Number((netRAMUsageGb * unitPriceRAM).toFixed(2)); // calc ram used * unit price
        
        forecastDataSeries[i].cpuRAMCost = cpuRAMCost;
        forecastDataSeries[i].totalCost += cpuRAMCost;
      }
    }

    const calcComputeGHzCost = (gcfMHzConfig, gcfHistoricalRunTime) => {
      const freeGHz = 200000; // free monthly GHz allowed by Google
      const unitPriceGHz = gcfPricingStructure.gcfComputePricing[tier].cpuGHzPrice; // price based on tier
      // console.log(gcfGHzConfig, gcfHistoricalRunTime)
      const gcfGHzConfig = gcfMHzConfig / 1000; // conversion from MHz to GHz
      const cpuGHzSecond = gcfGHzConfig * gcfHistoricalRunTime; // calc GHz-second based on config

      for (let i = 0; i < forecastDataSeries.length; i++) {
        const totalGHz = forecastDataSeries[i].invocations * cpuGHzSecond; // calc total GHz cost based on invocations
        const netGHzUsage = Math.max(0, totalGHz - freeGHz); // less free GHz provided
        const cpuGHzCost = Number((netGHzUsage * unitPriceGHz).toFixed(2)); // calc GHz used * unit price

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
        const networkBandwidthCost =  Number((netNetworkBandwithGb * unitPriceBandwidthGb).toFixed(2)); // calc networkbandwidth used * unit price

        forecastDataSeries[i].networkBandwidthCost = networkBandwidthCost;
        forecastDataSeries[i].totalCost += networkBandwidthCost;
        forecastDataSeries[i].totalCost = Number(forecastDataSeries[i].totalCost.toFixed(2));
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