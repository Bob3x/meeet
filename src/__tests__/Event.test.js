// src/__tests__/Event.test.js

import Event from "../components/Event";
import userEvent from "@testing-library/user-event";
import { render } from '@testing-library/react';
import mockData from "../mock-data";


describe('<Event /> component', () => {
    let EventComponent;
    const event = mockData[0];

    beforeEach(() => {
        EventComponent = render(<Event event={event}/>);
    });
    
    test('renders event title', () => {
        const eventTitle = EventComponent.queryByText(event.summary);
        expect(eventTitle).toBeInTheDocument();
    });

    test('renders event location', () => {
        const eventLocation = EventComponent.queryByText(event.location);
        expect(eventLocation).toBeInTheDocument();
    });

    test('renders event start time', () => {
        const eventTime = EventComponent.queryByText(event.created);
        expect(eventTime).toBeInTheDocument();
    });
    
    // details button
    test('render event details button', () => {
        const detailButton = EventComponent.queryByText('Show Details');
        expect(detailButton).toBeInTheDocument();
    });
    
    // Scenario 1 
    test("event details are hidden by default", () => {
        const eventDetails = EventComponent.container.querySelector('.details');
        expect(eventDetails).not.toBeInTheDocument();
    });

    // Scenario 2
    test('show details when user clicks on button "Show Details"', async () => {
        const user = userEvent.setup();
        
        const showDetailButton = EventComponent.queryByText('Show Details');
        await user.click(showDetailButton);

        const eventDetailsDom = EventComponent.container.firstChild;
        const eventDetails = eventDetailsDom.querySelector('.eventDetails');
        expect(eventDetails).toBeInTheDocument();
    });

    // Scenario 3
    test('hide details when user clicks on button "Hide details', async () => {
        const user = userEvent.setup();
        
        const showDetailButton = EventComponent.queryByText('Show Details');
        await user.click(showDetailButton);
        
        const hideDetailButton = EventComponent.queryByText('Hide Details');
        await user.click(hideDetailButton);

        const eventDetailsDom = EventComponent.container.firstChild;
        const eventDetails = eventDetailsDom.querySelector('.eventDetails');
        expect(eventDetails).not.toBeInTheDocument();
    });

    
});