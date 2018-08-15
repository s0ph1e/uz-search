let seleniumWebdriver = require('selenium-webdriver');
let until = seleniumWebdriver.until;
let By = seleniumWebdriver.By;
let {defineSupportCode} = require('cucumber');

defineSupportCode(function({Given, When, Then}) {
    Given(/^I am on the UZ booking site$/, function () {
        return this.driver.get('http://booking.uz.gov.ua/ru/');
    });

    When(/^I choose departure station (.*)$/, function (station) {
        return this.driver.findElement(By.className('search-block')).then((element) => {
            return element.findElement(By.name('from-title')).sendKeys(station).then(() => {
                return element.findElement(By.id('ui-id-1')).then((dropdownElement) => {
                    return this.driver.wait(until.elementIsVisible(dropdownElement), 2000).findElement(By.tagName('li')).click();
                })
            })
        });
    });

    When(/^I choose arrival station (.*)$/, function (station) {
        return this.driver.findElement(By.className('search-block')).then((element) => {
            return element.findElement(By.name('to-title')).sendKeys(station).then(() => {
                return element.findElement(By.id('ui-id-2')).then((dropdownElement) => {
                    return this.driver.wait(until.elementIsVisible(dropdownElement), 2000).findElement(By.tagName('li')).click();
                })
            })
        })
    });

    When(/^I choose date (.*)$/, function (date) {
        return this.driver.executeScript('document.getElementsByName("date")[0].setAttribute("value", "' + date + '")');
    });

    When(/^I do search$/, function () {
        let xpath = "//div[contains(@class, 'button')]/div/button[contains(text(), 'Поиск')]";
        return this.driver.findElement(By.xpath(xpath)).click();
    });

    Then(/^I should see available trains$/, function () {
        return this.driver.wait(until.elementLocated({className: 'train-table'}), 5000).then(element => {
            return this.driver.wait(until.elementIsVisible(element))
        }).then(this.saveScreenshot);
    });

    Then(/^I should see available train (.*)$/, function (number) {
        let xpath = "//td[contains(@class, 'num')]/div[contains(text(),'" + number + "')]";
        return this.driver.wait(until.elementLocated({xpath: xpath}), 5000).then(element => {
            return this.driver.wait(until.elementIsVisible(element))
        }).then(this.saveScreenshot);
    });

    Then(/^I should see available places of type (.*)$/, function (type) {
        let xpath = "//td[contains(@class, 'place')]/div/span[contains(text(), " + type + ")]";
        return this.driver.wait(until.elementLocated({xpath: xpath}), 5000).then(element => {
            return this.driver.wait(until.elementIsVisible(element))
        }).then(this.saveScreenshot);
    });
});
