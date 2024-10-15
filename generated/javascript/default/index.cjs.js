const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'otthub_vendor',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

