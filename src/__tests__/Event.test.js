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

    test('renders event date', () => {
        const eventTime = EventComponent.queryByText(event.created);
        expect(eventTime).toBeInTheDocument();
    });
    
    // details button
    test('renders show details button', () => {
        const button = EventComponent.queryByRole('button');
        expect(button).toBeInTheDocument();
        expect(button.textContent).toBe('Show Details');
    });
    
    // Scenario 1 
    test("event details are hidden by default", () => {
        const eventDetails = EventComponent.container.querySelector('.details');
        expect(eventDetails).not.toBeInTheDocument();
    });

    // Scenario 2
    test('show details when user clicks on button "Show Details"', async () => {
        const user = userEvent.setup();
        const button = EventComponent.getByRole('button');
        
        await user.click(button);
        
        const details = EventComponent.queryByTestId('event-details');
        expect(details).toBeInTheDocument();
        expect(details).toHaveTextContent(event.description);
        expect(button.textContent).toBe('Hide Details');
    });

    // Scenario 3
    test('hide details when user clicks on button "Hide details', async () => {
        const user = userEvent.setup();
        const button = EventComponent.getByRole('button');
        
        // First click to show details
        await user.click(button);
        // Second click to hide details
        await user.click(button);
        
        const details = EventComponent.queryByTestId('event-details');
        expect(details).not.toBeInTheDocument();
        expect(button.textContent).toBe('Show Details');
    });
    
});