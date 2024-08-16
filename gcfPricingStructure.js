const gcfPricingStructure = {};

gcfPricingStructure.gcfComputePricing = {
  "Tier 1": {
    memoryGbPrice: 0.0000025,
    cpuGHzPrice: 0.00001,
  },
  "Tier 2": {
    memoryGbPrice: 0.0000035,
    cpuGHzPrice: 0.000014,
  }
};

gcfPricingStructure.gcfRegionTiers = {
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

gcfPricingStructure.gcfTypes = {
  "Memory: 128MB / CPU: 200MHz": { mb: 128, mhz: 200 },
  "Memory: 256MB / CPU: 400MHz": { mb: 256, mhz: 400 },
  "Memory: 512MB / CPU: 800MHz": { mb: 512, mhz: 800 },
  "Memory: 1GB / CPU: 1.4GHz": { mb: 1024, mhz: 1400 },
  "Memory: 2GB / CPU: 2.8GHz": { mb: 2048, mhz: 2800 },
  "Memory: 4GB / CPU: 4.8GHz": { mb: 4096, mhz: 4800 },
  "Memory: 8GB / CPU: 4.8MHz": { mb: 8192, mhz: 4800 },
  "Memory: 16GB / CPU: 4.8MHz": { mb: 16384, mhz: 4800 },
  "Memory: 32GB / CPU: 4.8MHz": { mb: 32768, mhz: 4800 }
}

gcfPricingStructure.typeMapping = {
    "128Mi": "Memory: 128MB / CPU: 200MHz",
    "256Mi": "Memory: 256MB / CPU: 400MHz",
    "512Mi": "Memory: 512MB / CPU: 800MHz",
    "1Gi": "Memory: 1GB / CPU: 1.4GHz",
    "2Gi": "Memory: 2GB / CPU: 2.8GHz",
    "4Gi": "Memory: 4GB / CPU: 4.8GHz",
    "8Gi": "Memory: 8GB / CPU: 4.8MHz",
    "16Gi": "Memory: 16GB / CPU: 4.8MHz",
    "32Gi": "Memory: 32GB / CPU: 4.8MHz"
}

gcfPricingStructure.genMapping = {
    "GEN_1": "1",
    "GEN_2": "2",
}

module.exports = gcfPricingStructure;