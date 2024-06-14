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

// ====== REFACTOR: move gcf pricing data into mongoDB ========
const gcfComputePricing = {
  "Tier 1": {
    memoryGbPrice: 0.0000025,
    cpuGHzPrice: 0.00001,
  },
  "Tier 2": {
    memoryGbPrice: 0.0000035,
    cpuGHzPrice: 0.000014,
  }
};

const gcfRegionTiers = {
  "asia-east1": {
      "1": "Tier 1",
      "2": "Tier 1"
  },
  "asia-east2": {
      "1": "Tier 1",
      "2": "Tier 2"
  },
  "asia-northeast1": {
      "1": "Tier 1",
      "2": "Tier 1"
  },
  "asia-northeast2": {
      "1": "Tier 1",
      "2": "Tier 1"
  },
  "asia-northeast3": {
      "1": "Tier 2",
      "2": "Tier 2"
  },
  "asia-south1": {
      "1": "Tier 2",
      "2": "Tier 2"
  },
  "asia-south2": {
      "2": "Tier 2"
  },
  "asia-southeast1": {
      "1": "Tier 2",
      "2": "Tier 2"
  },
  "asia-southeast2": {
      "1": "Tier 2",
      "2": "Tier 2"
  },
  "australia-southeast1": {
      "1": "Tier 2",
      "2": "Tier 2"
  },
  "australia-southeast2": {
      "2": "Tier 2"
  },
  "europe-central2": {
      "1": "Tier 2",
      "2": "Tier 2"
  },
  "europe-north1": {
      "2": "Tier 1"
  },
  "europe-southwest1": {
      "2": "Tier 1"
  },
  "europe-west1": {
      "1": "Tier 1",
      "2": "Tier 1"
  },
  "europe-west10": {
      "2": "Tier 2"
  },
  "europe-west12": {
      "2": "Tier 2"
  },
  "europe-west2": {
      "1": "Tier 1",
      "2": "Tier 2"
  },
  "europe-west3": {
      "1": "Tier 2",
      "2": "Tier 2"
  },
  "europe-west4": {
      "2": "Tier 1"
  },
  "europe-west6": {
      "1": "Tier 2",
      "2": "Tier 2"
  },
  "europe-west8": {
      "2": "Tier 1"
  },
  "europe-west9": {
      "2": "Tier 1"
  },
  "me-central1": {
      "2": "Tier 2"
  },
  "me-central2": {
      "2": "Tier 2"
  },
  "me-west1": {
      "2": "Tier 1"
  },
  "northamerica-northeast1": {
      "1": "Tier 2",
      "2": "Tier 2"
  },
  "northamerica-northeast2": {
      "2": "Tier 2"
  },
  "southamerica-east1": {
      "1": "Tier 2",
      "2": "Tier 2"
  },
  "southamerica-west1": {
      "2": "Tier 2"
  },
  "us-central1": {
      "1": "Tier 1",
      "2": "Tier 1"
  },
  "us-east1": {
      "1": "Tier 1",
      "2": "Tier 1"
  },
  "us-east4": {
      "1": "Tier 1",
      "2": "Tier 1"
  },
  "us-east5": {
      "2": "Tier 1"
  },
  "us-south1": {
      "2": "Tier 1"
  },
  "us-west1": {
      "1": "Tier 1",
      "2": "Tier 1"
  },
  "us-west2": {
      "1": "Tier 2",
      "2": "Tier 2"
  },
  "us-west3": {
      "1": "Tier 2",
      "2": "Tier 2"
  },
  "us-west4": {
      "1": "Tier 2",
      "2": "Tier 2"
  }
};

const gfcTypes = {
  "Memory: 128MB / CPU: 200MHz": { mb: 128, mhz: 200 },
  "Memory: 256MB / CPU: 400MHz": { mb: 256, mhz: 400 },
  "Memory: 512MB / CPU: 800MHz": { mb: 512, mhz: 800 },
  "Memory: 1024MB / CPU: 1.4GHz": { mb: 1024, mhz: 1400 },
  "Memory: 2048MB / CPU: 2.8GHz": { mb: 2048, mhz: 2800 },
  "Memory: 4096MB / CPU: 4.8GHz": { mb: 4096, mhz: 4800 },
  "Memory: 8192MB / CPU: 4.8MHz": { mb: 8192, mhz: 4800 },
  "Memory: 16384MB / CPU: 4.8MHz": { mb: 16384, mhz: 4800 },
  "Memory: 32768MB / CPU: 4.8MHz": { mb: 32768, mhz: 4800 }
};

// =============================================

// TO DELETE global variables
let avgHistoricalRunTimeS = 0.3;
let avgHistoricalBandwidthKB = 1024;
// =======================

const forecastController = {
  /**
   * Function retrieves historical data and calulates average historical run time 
   * and network bandwidth memory utilization
   */
  calcHistorical (req, res, next){
    // fetch function metrics for the last 30 invocations
    try {
      /**
       * fetch(metrics API)
       * ----- REFACTOR WHEN METRICS MIDDLEWARE COMPLETE -----
       * dummyExecTime and dummyMemory arrays should be retrieved from Metrics middleware and replaced below
       */  
      const totalExecTimeMS = dummyExecTime.reduce((acc, dataPoint) => { return acc + dataPoint.timeMS }, 0);
      const avgExecTimeMS = totalExecTimeMS / dummyExecTime.length;
      // res.locals.avgExecTimeMS = avgExecTimeMS;
      // avgHistoricalRunTimeS = avgExecTimeMS / 1000;

      const totalMemoryKB = dummyMemory.reduce((acc, dataPoint) => { return acc + dataPoint.memoryKB }, 0);
      const avgMemoryKB = totalMemoryKB / dummyMemory.length;
      // res.locals.avgMemoryKB = avgMemoryKB;
      // avgHistoricalMemoryKB = avgMemoryKB;

      console.log(`average memory in KB: ${avgMemoryKB} | average execution time in ms: ${avgExecTimeMS}`);

      // return next();
    } catch (err) {
      // return next({
      //   log: 'Error in calcHistorical middleware - error retrieving historical metrics',
      //   status: 404,
      //   message: { err },
      // });
    }        
  },

  forecast (req, res, next){
    // REFACTOR: Need to handle minimum number of instances pricing
    // const { region, generation, type } = req.body;
    // ------ Test data -----
    const testArguments = {
      region: 'us-central1',
      generation: '1',
      type: 'Memory: 4096MB / CPU: 4.8GHz',
      invocationIncrements: 500000,
      maxIncrement: 12,
    };
    
    // Retrieve gfc configurations
    const tier = gcfRegionTiers[testArguments.region][testArguments.generation];
    const memoryConfig = gfcTypes[testArguments.type].mb;
    const cpuMHzConfig = gfcTypes[testArguments.type].mhz;

    // Create output array
    const forecastDataSeries = [];

    const calcInvocationCosts = (increments, maxIncrement) => {
      const freeInvocations = 2000000; // number of monthly free invocations allowed by Google
      const costPerInvocation = 0.40 / 1000000; // Google's cost per million invocation
      
      for (let i = 0; i <= maxIncrement; i++) {
        const invocations = increments * i;
        const netInvocations = Math.max(0, invocations - freeInvocations);
        const invocationCost = netInvocations * costPerInvocation;

        forecastDataSeries.push({
          invocationCost,
          totalCost: invocationCost,
          invocations,
        });
      };
    }

    const calcComputeRAMCost = (gcfMemoryConfigMb, gcfHistoricalRunTime) => {
      const freeGbRAM = 400000; // free monthly RAM allowed by Google
      const unitPriceRAM = gcfComputePricing[tier].memoryGbPrice; // price based on tier

      const gcfGbMemoryConfigGb = gcfMemoryConfigMb / 1024; // conversion from MB to GB
      const cpuGbSecond = gcfGbMemoryConfigGb * gcfHistoricalRunTime;

      for (let i = 0; i < forecastDataSeries.length; i++) {
        const totalGbRAM = forecastDataSeries[i].invocations * cpuGbSecond;
        const netRAMUsageGb = Math.max(0, totalGbRAM - freeGbRAM);
        const cpuRAMCost = netRAMUsageGb * unitPriceRAM;

        forecastDataSeries[i].cpuRAMCost = cpuRAMCost;
        forecastDataSeries[i].totalCost += cpuRAMCost;
      }
    }

    const calcComputeGHzCost = (gcfMHzConfig, gcfHistoricalRunTime) => {
      const freeGHz = 200000; // free monthly RAM allowed by Google
      const unitPriceGHz = gcfComputePricing[tier].cpuGHzPrice; // price based on tier

      const gcfGHzConfig = gcfMHzConfig / 1000; // conversion from MHz to GHz
      const cpuGHzSecond = gcfGHzConfig * gcfHistoricalRunTime;

      for (let i = 0; i < forecastDataSeries.length; i++) {
        const totalGHz = forecastDataSeries[i].invocations * cpuGHzSecond;
        const netGHzUsage = Math.max(0, totalGHz - freeGHz);

        forecastDataSeries[i].cpuGHzCost = netGHzUsage * unitPriceGHz;
        console.log(forecastDataSeries[i]);
      }
    }

    const calcNetworkBandwithCost = (gcfHistoricalBandwidthKb) => {
      const freeBandwidthGb = 5; // free monthly bandwidth GB allowed by Google
      const unitPriceBandwidthGb = 0.12; // fixed price per Google

      const gcfBandwidthGb = gcfHistoricalBandwidthKb / 1048576; // conversion from KB to GB per invocation

      for (let i = 0; i < forecastDataSeries.length; i++) {
        const totalNetworkBandwidthGb = forecastDataSeries[i].invocations * gcfBandwidthGb;
        const netNetworkBandwithGb = Math.max(0, totalNetworkBandwidthGb - freeBandwidthGb);

        forecastDataSeries[i].networkBandwidthCost = netNetworkBandwithGb * unitPriceBandwidthGb;
        console.log(forecastDataSeries[i]);
      }
    }

    const calcTotalCost = () => {
      for (let i = 0; i < forecastDataSeries.length; i++) {
        forecastDataSeries[i].totalCost = forecastDataSeries[i].invocationCost + forecastDataSeries[i].cpuRAMCost + forecastDataSeries[i].cpuGHzCost + forecastDataSeries
      }
    }

    calcInvocationCosts(testArguments.invocationIncrements, testArguments.maxIncrement);
    calcComputeRAMCost(memoryConfig, avgHistoricalRunTimeS);
    calcComputeGHzCost(cpuMHzConfig, avgHistoricalRunTimeS);
    calcNetworkBandwithCost(avgHistoricalBandwidthKB);

    console.log(forecastDataSeries);
  }
};

forecastController.calcHistorical();
forecastController.forecast();

module.exports = forecastController;