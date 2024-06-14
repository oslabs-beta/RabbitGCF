const forecastController = {
  retrieveHistory (req, res, next){

  },

  //
  forecast (req, res, next){
    const { region, type, execTime, ntwrkBandwidth, invocations, minInstances } = req.body;

    // Calculate costs associated with scenario described in inputs

    // Store within BigQuery
  }
};

module.exports = forecastController;