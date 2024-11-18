Feature: Show/Hide Event Details

    Scenario: An event element is collapsed by default 
        Given user has oppened the app 
        When user clicks a button to open or close the event details
        Then user will open or close (hide) additional event information

    Scenario: User can expand an event to see details 
        Given user views the available events
        When user clicks to open an event details 
        Then more details about the events are shown

    Scenario: User can collapse an event to hide details
        Given user has clicked show details button
        When user clicks hide details button 
        Then the event details are collapsed