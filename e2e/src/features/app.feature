Feature: log in app
  Display the title

  Scenario: Home page
    Given I am on the login page
    When I do nothing
    Then I should see the title


  Scenario Outline: Fill Input
    Given I am on the home page
    When I write "test@mail.com" in "inputLogin"
    And I write "password" in "inputPass"
    And I connect
    Then I see tab in url
    Then I see Scanner page

Scenario Outline: See List
  Given I am on the list page
  Then I should see pas de coupons
 
  
  

  