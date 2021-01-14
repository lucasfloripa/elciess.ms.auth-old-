Feature: Authenticate
Like a access user
I want login in the elciess system with my account

Scenario: User informs valid data
Given user informs email and password
And submit the register
When system check fields
Then system authenticate user
And send a token

Scenario: User informs invalid data
Given user informs email and password
And submit the register
When system check fields
Then system inform the invalid field(s)
And dont authenticate user

Scenario: User informs not register email
Given user informs email and password
And submit the register
When system check fields
Then system inform the invalid email
And dont authenticate user

Scenario: User informs wrong password
Given user informs email and password
And submit the register
When system check fields
Then system inform the password dont match
And dont authenticate user