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

`git clone <repository-url>`

Navigate to the project directory and install dev dependencies:

`npm install`

Install the Google Cloud SDK by following [Google’s installation instructions](https://cloud.google.com/sdk/docs/install)

Set up your configuration, add your Google Cloud project ID to your .env file to enable access to your project’s Cloud Functions

Start the application:

`npm start`

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
