import { render, waitFor, within } from "@testing-library/react";
import { loadFeature, defineFeature } from "jest-cucumber";
import { getEvents } from "../api";
import userEvent from "@testing-library/user-event";
import Event from "../components/Event";

import App from "../App";

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {

        let AppComponent;       
        given('user has oppened the app', () => {
            AppComponent = render(<App />);
        });

        when('user clicks a button to open or close the event details', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            })
        });

        then('user will open or close (hide) additional event information', () => {
            const AppDOM = AppComponent.container.firstChild;
            const eventDetails = AppDOM.querySelector('.details');
            expect(eventDetails).not.toBeInTheDocument();
        });
    })

    test('User can expand an event to see details', ({ given, when, then }) => {

        let EventComponent;
        let allEvents;
        given('user views the available events', async () => {
            allEvents = await getEvents();
            EventComponent = render(<Event event={allEvents[0]} />);
            expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();

        });

        when('user clicks to open an event details', async () => {
            const user = userEvent.setup();
            const showDetails = EventComponent.container.querySelector('.details-btn');
            await user.click(showDetails);

        });

        then('more details about the events are shown', async () => {
            await waitFor(() => {
            const eventDetails = EventComponent.container.querySelector('.event');
            expect(eventDetails).toBeInTheDocument();
            });
        });
    })

    test('User can collapse an event to hide details', ({ given, when, then }) => {

        let EventComponent;
        let allEvents;
        given('user has clicked show details button', async () => {
            allEvents = await getEvents();
            EventComponent = render(<Event event={allEvents[0]} />);
            expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
        });

        when('user clicks hide details button', async () => {
            const user = userEvent.setup();
            const hideDetails = EventComponent.container.querySelector('.details-btn');  
            await user.click(hideDetails);
        });

        then('the event details are collapsed', () => {
            expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
        });
    });
})
