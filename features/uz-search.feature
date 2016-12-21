Feature: UZ search

  Scenario: Search tickets
    Given I am on the UZ booking site
    When I choose departure station Киев
    And I choose arrival station Ивано-Франковск
    And I choose date 13.01.2017
    And I do search
    Then I should see available trains
    #Then I should see available train 043
