const config = require('./extra-webpack.config.js');

module.exports.getConfigs = function () {
  config.target = 'electron-renderer';
  const electronConfig = JSON.stringify(config).slice(1, -1) + ',';

  config.target = 'web';
  const webConfig = JSON.stringify(config).slice(1, -1) + ',';

  return {
    electronConfig,
    webConfig,
  };
};
