const { IAMCredentialsClient } = require('@google-cloud/iam-credentials');

const credentialsClient = new IAMCredentialsClient();

const iamController = {
  generateAccessToken: async (req, res, next) => {
    const name = 'projects/-/serviceAccounts/rabbitgcf-services@refined-engine-424416-p7.iam.gserviceaccount.com';
    const scope = ['https://www.googleapis.com/auth/cloud-platform'];
    const request = {
      name,
      scope
    };

    try {
      const response = await credentialsClient.generateAccessToken(request); // treated as a POST request
      console.log(response);

      res.locals.tokenResponse = response;

      return next();
    } catch (err) {
      return next(`An error occurred while generating an access token. ${err}`);
    }
  }
}


module.exports = iamController;