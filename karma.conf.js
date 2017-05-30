module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    autoWatch: true,
    files: ['src/**/*.js', 'test/**/*.js']
  });
};
