const { defaults } = require('jest-config');

const config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts', 'cts'],
  verbose: true,
  reporters: [
    'default',
    ['jest-html-reporters', {
      publicPath: './reports',
      filename: 'test-report.html',
      expand: true,
    }],
  ],
};

module.exports = config;
