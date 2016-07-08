'use strict';

module.exports = function(config) {

  config.set({
    autoWatch: true,
    basePath: './',
    frameworks: ['jasmine'],
    reporters: ['mocha'],
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-cookie/angular-cookie.js',
      'bower_components/ng-token-auth/dist/ng-token-auth.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/moment/moment.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angularjs-toaster/toaster.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/ng-file-upload/ng-file-upload.js',
      'app/scripts/**/*.js',
      'https://js.braintreegateway.com/v2/braintree.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],
    exclude: [],
    port: 9090,

    // Browsers to test in
    browsers: [
      'PhantomJS'
    ],

    // Depending on in which browser the tests should be made
    // a different launcher should be loaded
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-mocha-reporter'
    ],
    singleRun: false,
    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,
  });
};
