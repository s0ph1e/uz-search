let seleniumWebdriver = require('selenium-webdriver');
let until = seleniumWebdriver.until;
let By = seleniumWebdriver.By;

function stepDefinitions() {
    this.Given('I am on the UZ booking site', function () {
        return this.driver.get('http://booking.uz.gov.ua/ru/');
    });

    this.When('I choose departure station {station}', function (station) {
        return this.driver.findElement(By.id('station_from')).then((element) => {
            return element.findElement(By.name('station_from')).sendKeys(station).then(() => {
                return element.findElement(By.id('stations_from')).then((dropdownElement) => {
                    return this.driver.wait(until.elementIsVisible(dropdownElement), 1000).findElement(By.tagName('div')).click();
                });
            });
        });
    });

    this.When('I choose arrival station {station}', function (station) {
        return this.driver.findElement(By.id('station_till')).then((element) => {
            return element.findElement(By.name('station_till')).sendKeys(station).then(() => {
                return element.findElement(By.id('stations_till')).then((dropdownElement) => {
                    return this.driver.wait(until.elementIsVisible(dropdownElement), 1000).findElement(By.tagName('div')).click();
                });
            });
        });
    });

    this.When('I choose date {date}', function (date) {
        return this.driver.executeScript('document.getElementById("date_dep").setAttribute("value", "' + date + '")');
    });

    this.When('I do search', function () {
        return this.driver.findElement(By.name('search')).click();
    });

    this.Then('I should see available trains', function () {
        return this.driver.findElement(By.id('ts_res')).then((resultTableElement) => {
            return this.driver.wait(until.elementIsVisible(resultTableElement), 5000).then(this.saveScreenshot);
        });
    });

    this.Then('I should see available train {number}', function (number) {
        let xpath = "//td[contains(@class, 'num')]/a[contains(text(),'" + number + "')]";
        return this.driver.wait(until.elementLocated({xpath: xpath}), 5000).then(this.saveScreenshot);
    });
}

module.exports = stepDefinitions;
