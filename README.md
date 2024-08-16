# RabbitGCF

## Table of Contents

- [About](#about)
- [How to Use](#how-to-use)
- [Existing Features](#existing-features)
- [Future Features](#future-features)
- [Contributions](#contributions)
- [Developers](#developers)

## About

RabbitGCF is a Google Cloud Function visualizer and cost optimization tool designed to help you make informed decisions about your cloud resources. By inputting your Google Cloud project, RabbitGCF provides detailed metrics for each function. Additionally, our forecasting tool allows you to experiment with different configurations to determine the most cost-effective options.

## How to Use

To get started with RabbitGCF, clone the repository:

`git clone https://github.com/oslabs-beta/RabbitGCF.git`

Navigate to the project directory and install dev dependencies:

`npm install`

Set up your Google Cloud Function configurations and have your Google Cloud project ID available. 

Create a .env file with a `PROJECT_ID` and set it to your Google Cloud project ID.

Create a Service Account at https://console.cloud.google.com/iam-admin/serviceaccounts. Click your Google Cloud Functions project and click the "Create Service Account" at the top of the page. Give your service account any name and id you would like. Add the next step, give your service account the roles "Cloud Functions Viewer" and "Monitoring Viewer" to enable read only access to your Functions. Click "Continue" and optionally fill out the "Grant user access to this service account" fields or skip it and click "Done". You now have a Functions read only service account. 

Click the blue hyperlink of the service account under the "Email" column. At the top of the page, click on the "Keys" tab. Create a new key with the "Add Key" button. Choose the JSON key type and click "Create". Your browser will download a JSON key file. Take this JSON file and insert it into the "util" folder in your repository.

Create a `PROJECT_KEY` variable and set it to the name of your access key including the .json extension. 

Your .env file should look something like this:
```
PROJECT_ID=[INSERT PROJECT ID HERE]
PROJECT_KEY=[INSERT PROJECT KEY HERE].json
```

Start the application:

`npm run dev`

## Existing Features

- Functions Page: displays a list of all Google Cloud functions within your project, with navigation buttons directing to the corresponding metrics and forecast pages
- Metrics Page: contains four key graphs - execution count, runtime, memory usage and network egress - over a selected timeframe to give you an in-depth view of each function’s performance
- Forecast Page: lets you experiment with different configurations for a selected function, visualizing potential outcomes to identify the optimal setup

## Future Features

- Launch via VM with Pre-Packaged SDK: to streamline the user experience, we plan to containerize RabbitGCF, allowing the application to come pre-packaged with the Google Cloud SDK & eliminating the need for users to install the SDK on their machines
- Multi-Project Support: implementing support for managing and visualizing metrics across multiple Google Cloud projects under a single user account
- Optimal Configuration Suggestions: building on our existing forecasting tool, we aim to introduce a feature that automatically suggests the optimal configuration combinations for your Google Cloud Functions, balancing cost efficiency with the desired number of invocations

## Contributions

Contributions, suggestions and reports of any encountered issues from the Open Source community are welcome.

## Developers

- Brendan Lam | [Github](https://github.com/gitbrendanlam) | [Linkedin](https://www.linkedin.com/in/brendanlam/)
- Daniel Park | [Github](https://github.com/dpark001) | [Linkedin](https://www.linkedin.com/in/dpark001/)
- Wilson Chen | [Github](https://github.com/Wilson7chen) | [Linkedin](https://www.linkedin.com/in/wilson7chen/)
- Alexandra Thorne | [Github](https://github.com/AlexaThr) | [Linkedin](http://linkedin.com/in/alexathorne)
