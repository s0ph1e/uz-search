require('chromedriver');
var seleniumWebdriver = require('selenium-webdriver');
var fs = require('fs');

function CustomWorld() {
    var driver = new seleniumWebdriver.Builder()
        .forBrowser('chrome')
        .build();

  this.driver = driver;

  this.saveScreenshot = function (element) {
      return driver.executeScript('arguments[0].scrollIntoView(true)', element).then(function() {
          return driver.takeScreenshot().then(function(data) {
              fs.writeFileSync(__dirname + '/../../screenshot.png', data, 'base64');
          });
      });
  };
}

module.exports = function() {
  this.World = CustomWorld;
};