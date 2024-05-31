const { Logging, Severity } = require('@google-cloud/logging');

const pId = 'refined-engine-424416-p7';

async function severityInfo(
  projectId = pId,
  logName = 'gcf-info-logs'
) {
  // create client
  const logging = new Logging({ projectId });
  // select log to write to
  const log = logging.log(logName);
  // data to write to log
  const text = 'RabbitGCF logging INFO level severity';
  //metadata associated with entry
  const metadata = {
    resource: { type: 'global' },
    severity: 'INFO'
  };
  // prepare log entry
  const entry = log.entry(metadata, text);

  async function writeInfoLog() {
    // writes log entry
    await log.write(entry);
    console.log(`Logged: ${text}`);
  }

  writeInfoLog();
}

async function severityAlert(
  projectId = pId,
  logName = 'gcf-alert-logs'
) {
  const logging = new Logging({ projectId });
  const log = logging.log(logName);
  const text = 'RabbitGCF logging ALERT level severity';
  const metadata = {
    resource: { type: 'global' },
    severity: 'ALERT'
  };
  const entry = log.entry(metadata, text);

  async function writeAlertLog() {
    await log.write(entry);
    console.log(`Logged: ${text}`);
  }

  writeAlertLog();
}

async function severityError(
  projectId = pId,
  logName = 'gcf-error-logs'
) {
  const logging = new Logging({ projectId });
  const log = logging.log(logName);
  const text = 'RabbitGCF logging ERROR level severity';
  const metadata = {
    resource: { type: 'global' },
    severity: 'ERROR'
  };
  const entry = log.entry(metadata, text);

  async function writeErrorLog() {
    await log.write(entry);
    console.log(`Logged: ${text}`);
  }
  
  writeErrorLog();
}

module.exports = { severityInfo, severityAlert, severityError };