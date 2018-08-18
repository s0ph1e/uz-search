require('chromedriver');
require('phantomjs-prebuilt');
let seleniumWebdriver = require('selenium-webdriver');
let fs = require('fs-extra');
let path = require('path');
let screenshotDir = require('../../config').screenshotDir;
let {defineSupportCode} = require('cucumber');

function getScreenshotFilename() {
    return path.join(screenshotDir, 'screenshot-' + new Date().getTime() + '.png')
}

function CustomWorld() {
    this.driver = new seleniumWebdriver.Builder()
        .forBrowser('phantomjs')
        .build();
    this.screenshots = [];
    this.url = null;

    this.saveScreenshot = (element) => {
        return this.driver.executeScript('arguments[0].scrollIntoView(true)', element).then(() => {
            return this.driver.takeScreenshot().then((data) => {
                let filename = getScreenshotFilename();
                this.screenshots.push(filename);
                fs.outputFileSync(filename, data, 'base64');
            })
        });
    };

    this.saveUrl = () => {
        return this.driver.getCurrentUrl().then((url) => {
            this.url = url;
        });
    }
}

defineSupportCode(function({setWorldConstructor}) {
    setWorldConstructor(CustomWorld)
});
