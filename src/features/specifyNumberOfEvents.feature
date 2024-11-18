Feature: Specify Number of Events

    Scenario: Show all available events when user hasnt specify any number
        Given user was viewing all available events
        When user hasnt specified any number of events
        Then default number of events `(32)` are displayed
    
    Scenario: User can change number of events
        Given event list is displayed
        When user changes the number of events to `10`
        Then user views maximum `10` events        