# uz-search
Search tickets on [Ukrzaliznytsia booking site](http://booking.uz.gov.ua/ru/) using selenium-webdriver, cucumber and phantomjs  
```gherkin
  Scenario: Search tickets
    Given I am on the UZ booking site
    When I choose departure station Киев
    And I choose arrival station Ивано-Франковск
    And I choose date 2017-01-13
    And I do search
    Then I should see available trains
```

If tickets found - sends email with screenshot


### Install
* install nodejs 8
* `npm i`
* `npm start`

It will run `./node_modules/.bin/cucumber-js` and test features described in `features` directory.

### Configure
* to set email credential - update [config.js](https://github.com/s0ph1e/uz-search/blob/master/config.js#L7-L8)
* to set departure station, destination, etc - update scenario in [features/uz-search.feature](https://github.com/s0ph1e/uz-search/blob/master/features/uz-search.feature) or create new one
