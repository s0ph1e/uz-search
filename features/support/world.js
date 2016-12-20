require('chromedriver');
require('phantomjs-prebuilt');
var seleniumWebdriver = require('selenium-webdriver');
var fs = require('fs-extra');
var path = require('path');
var screenshotDir = require('../../config').screenshotDir;

function getScreenshotFilename () {
    return path.join(screenshotDir, 'screenshot-' + new Date().getTime() + '.png')
}

function CustomWorld() {
    var driver = new seleniumWebdriver.Builder()
        .forBrowser('phantomjs')
        .build();
    var screenshots = [];

  this.driver = driver;
  this.screenshots = screenshots;

  this.saveScreenshot = function (element) {
      return driver.executeScript('arguments[0].scrollIntoView(true)', element).then(function() {
          return driver.takeScreenshot().then(function(data) {
              var filename = getScreenshotFilename();
              screenshots.push(filename);
              fs.outputFileSync(filename, data, 'base64');
          });
      });
  };
}

module.exports = function() {
  this.World = CustomWorld;
};