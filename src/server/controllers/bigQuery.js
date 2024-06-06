const { BigQuery } = require('@google-cloud/bigquery');

const API_KEY = 'AIzaSyBxY8tHUkKv72BbkACwsP9k3HBBDFB5LPY';

// this project id for testing purposes
const projectId = 'refined-engine-424416-p7';
const bigquery = new BigQuery();

const bigQuery = {
  getDatasets: async (req, res, next) => {
    // const { projectId } = req.params; // use later

    try {
      const [datasets] = await bigquery.getDatasets(projectId);
      console.log(datasets);

      const datasetList = [];

      if (datasets) {
        datasets.forEach(el => datasetList.push(datasets.id));
        console.log(datasetList);
      } else {
        return next('Could not get dataset list.');
      }

      const mappedList = datasetList.map(async el => {
        await bigquery.dataset(el).get();
      });
      console.log(mappedList);

      if (mappedList) {
        res.locals.datasets = mappedList;
        return next();
      } else {
        return next('Could not get mapped datasets.');
      }
    } catch (err) {
      return next({ err: `Something went wrong. ${err}` });
    }
  }
};

module.exports = bigQuery;