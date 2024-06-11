const { BigQuery } = require('@google-cloud/bigquery');

// this project id for testing purposes
// const projectId = 'refined-engine-424416-p7';
const bigquery = new BigQuery();

// const bigQuery = {
//   getDatasets: async (req, res, next) => {
//     console.log(`This is req params: ${req.params.projectId}`);
//     const { projectId } = req.params; // use later

//     try {
//       const [datasets] = await bigquery.getDatasets(projectId);
//       console.log(`List of datasets: ${datasets}`);

//       const datasetList = [];

//       if (datasets) {
//         datasets.forEach(el => datasetList.push(datasets.id));
//         console.log(`Dataset names only: ${datasetList}`);
//         res.locals.datasetList = datasetList;
//         return next();
//       } else {
//         return next('Could not get dataset list.');
//       }

//       // const mappedList = datasetList.map(async el => {
//       //   await bigquery.dataset(el).get();
//       // });
//       // console.log(`Full datasets: ${mappedList}`);

//       // if (mappedList) {
//       //   res.locals.datasets = mappedList;
//       //   return next();
//       // } else {
//       //   return next('Could not get mapped datasets.');
//       // }
//     } catch (err) {
//       return next({ err: `Something went wrong. ${err}` });
//     }
//   },

//   getContents: async (req, res, next) => {
//     console.log(`This is res.locals.datasetList: ${res.locals.datasetList}`);
//     const mappedList = res.locals.datasetList;

//     try {
//       mappedList.map(async el => {
//         await bigquery.dataset(el).get();
//       });
//       console.log(`Mapped datasets: ${mappedList}`);
  
//       if (mappedList) {
//         res.locals.datasetContents = mappedList;
//         return next();
//       } else {
//         return next('Could not get dataset contents.');
//       }
//     } catch (err) {
//       return next({ err: `Something went wrong. ${err}` });
//     }
//   }
// };

const bigQuery = {
  getDatasets: async (req, res, next) => {
    const { projectId } = req.params;
    console.log(`This is projectId: ${projectId}`);
    const url = `https://bigquery.googleapis.com/bigquery/v2/projects/${projectId}/datasets`;

    try {
      const datasetList = await fetch(url);
      console.log(`Fetched dataset list: ${datasetList}`);
      // console.log(`First dataset in fetched list: ${datasetList.datasets[0].id}`);
      
      if (datasetList) {
        res.locals.datasetList = datasetList;
        return next();
      } else {
        return next('Could not get dataset list.');
      }
    } catch (err) {
      return next({ err: `Something went wrong. ${err}` });
    }
  }
}

module.exports = bigQuery;