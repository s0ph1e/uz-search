Feature: UZ search return tickets

  Scenario: Search return tickets
    Given I am on the UZ booking site
    When I choose departure station Воловец
    And I choose arrival station Киев
    And I choose date 2018-08-26
    And I do search
    Then I should see available trains
    #And I should see available places of type К
    #Then I should see available train 081
