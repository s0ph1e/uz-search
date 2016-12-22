let seleniumWebdriver = require('selenium-webdriver');
let until = seleniumWebdriver.until;
let By = seleniumWebdriver.By;
let {defineSupportCode} = require('cucumber');

defineSupportCode(function({Given, When, Then}) {
    Given(/^I am on the UZ booking site$/, function () {
        return this.driver.get('http://booking.uz.gov.ua/ru/');
    });

    When(/^I choose departure station (.*)$/, function (station) {
        return this.driver.findElement(By.id('station_from')).then((element) => {
            return element.findElement(By.name('station_from')).sendKeys(station).then(() => {
                return element.findElement(By.id('stations_from')).then((dropdownElement) => {
                    return this.driver.wait(until.elementIsVisible(dropdownElement), 1000).findElement(By.tagName('div')).click();
                })
            })
        })
    });

    When(/^I choose arrival station (.*)$/, function (station) {
        return this.driver.findElement(By.id('station_till')).then((element) => {
            return element.findElement(By.name('station_till')).sendKeys(station).then(() => {
                return element.findElement(By.id('stations_till')).then((dropdownElement) => {
                    return this.driver.wait(until.elementIsVisible(dropdownElement), 1000).findElement(By.tagName('div')).click();
                })
            })
        })
    });

    When(/^I choose date (.*)$/, function (date) {
        return this.driver.executeScript('document.getElementById("date_dep").setAttribute("value", "' + date + '")');
    });

    When(/^I do search$/, function () {
        return this.driver.findElement(By.name('search')).click();
    });

    Then(/^I should see available trains$/, function () {
        return this.driver.findElement(By.id('ts_res')).then((resultTableElement) => {
            return this.driver.wait(until.elementIsVisible(resultTableElement), 5000).then(this.saveScreenshot);
        });
    });

    Then(/^I should see available train (.*)$/, function (number) {
        let xpath = "//td[contains(@class, 'num')]/a[contains(text(),'" + number + "')]";
        return this.driver.wait(until.elementLocated({xpath: xpath}), 5000).then(this.saveScreenshot);
    });
});
