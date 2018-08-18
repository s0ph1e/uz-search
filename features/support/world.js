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

    var chromeCapabilities = seleniumWebdriver.Capabilities.chrome();
    //setting chrome options to start the browser fully maximized
    var chromeOptions = {
        'args': ['--disable-dev-shm-usage', '--disable-software-rasterizer', '--disable-gpu', '--headless', '--no-sandbox']
    };
    chromeCapabilities.set('chromeOptions', chromeOptions);

    this.driver = new seleniumWebdriver.Builder()
//        .forBrowser('chrome')
//        .setChromeOptions({args: ['--no-sandbox']})
        .withCapabilities(chromeCapabilities)
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

defineSupportCode(function({setWorldConstructor, setDefaultTimeout}) {
    setDefaultTimeout(10*1000)
    setWorldConstructor(CustomWorld)
});
