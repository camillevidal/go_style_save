// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

//const { SpecReporter } = require('jasmine-spec-reporter');
/**
 * @type { import("protractor").Config }
 */


exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    ['./src/features/**/*.feature']
  ],
  multiCapabilities: [{
    'browserName': 'chrome'
  }],
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',
  // jasmineNodeOpts: {
  //   showColors: true,
  //   defaultTimeoutInterval: 30000,
  //   print: function() {}
  // },
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  specs: ['./src/features/**/*.feature'],
  cucumberOpts: {
    compiler: "ts-node/register",
    require: ['./src/features/bootstrap/step_definitions/**/*.steps.ts'],
    strict: true,
    dryRun: false,
    failFast: true
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    //jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    browser.ignoreSynchronization = true;
    browser.manage().window().maximize();
  }
};
