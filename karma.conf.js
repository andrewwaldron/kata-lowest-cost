module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    autoWatch: true,
    files: [
      'node_modules/underscore/underscore-min.js',
      'src/**/*.js',
      'test/**/*.js'
    ]
  });
};
