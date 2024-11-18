import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

const feature = loadFeature('./src/features/SpecifyNumberOfEvents.feature');

defineFeature(feature, test => {
    

    test('Show all available events when user hasnt specify any number', ({ given, when, then }) => {
        let AppComponent;
        
        given('user was viewing all available events', () => {
            AppComponent = render(<App />);
        });

        when('user hasnt specified any number of events', async () => {
            await waitFor(() => {
                const AppDOM = AppComponent.container.firstChild;
                const EventListDOM = AppDOM.querySelector('#event-list');
                expect(EventListDOM).toBeTruthy();
            });
        });

        then('default number of events `(32)` are displayed', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });
    });

    test('User can change number of events', ({ given, when, then}) => {
        
        let AppComponent;
        given('event list is displayed', async () => {
            AppComponent = render(<App />);
            await waitFor(() => {
                const AppDOM = AppComponent.container.firstChild;
                const EventListDOM = AppDOM.querySelector('#event-list');
                
                expect(EventListDOM).toBeTruthy();
            });

            /*const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            NumberOfEventsComponent = render(<NumberOfEvents setCurrentNOE={() => { }} setErrorAlert={() => {}} />, { container: EventListDOM });
            expect(NumberOfEventsComponent).toBeTruthy();*/
        });

        when('user changes the number of events to `10`', async () => {
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            const numberOfEventsInput = within(AppDOM).getByTestId('numberOfEventsInput');
            await user.clear(numberOfEventsInput);
            await user.type(numberOfEventsInput, '10');
        });

        then('user views maximum `10` events', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(10);
            });
        });
    });
});
