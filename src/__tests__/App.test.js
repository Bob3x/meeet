// src/__tests__/App.test.js

import { render, within, waitFor } from "@testing-library/react";
import { getEvents } from "../api";
import userEvent from "@testing-library/user-event";

import App from "../App";

describe('<App /> component', () => {
    let AppDOM;

    beforeEach(() => {
        AppDOM = render(<App />).container.firstChild;
    })

        test('renders list of events', () => {
            expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
        });

        test('renders CitySearch', () => {
            expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
        });
        
        test('renders NumberOfEvents', () => {
            expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
        }); 
});

describe('<App /> integration', () => {

    test('renders a list of events matching the city selected by the user', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
    
        const CitySearchDOM = AppDOM.querySelector('#city-search');
        const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');
    
        await user.type(CitySearchInput, "Berlin");
        const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
        await user.click(berlinSuggestionItem);
    
        const EventListDOM = AppDOM.querySelector('#event-list');
        const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
    
        const allEvents = await getEvents();
        const berlinEvents = allEvents.filter(event => event.location === 'Berlin, Germany');
        expect(allRenderedEventItems.length).toBe(berlinEvents.length);
        
        allRenderedEventItems.forEach(event => {
            expect(event.textContent).toContain("Berlin, Germany");
        });
    });

    test('renders a list of events matching the city selected by the user', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
    
        const CitySearchDOM = AppDOM.querySelector('#city-search');
        const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');
    
        await user.type(CitySearchInput, "Berlin");
        const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
        await user.click(berlinSuggestionItem);
    
        const EventListDOM = AppDOM.querySelector('#event-list');
        const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
    
        const allEvents = await getEvents();
        const berlinEvents = allEvents.filter(event => event.location === 'Berlin, Germany');
        expect(allRenderedEventItems.length).toBe(berlinEvents.length);
        
        allRenderedEventItems.forEach(event => {
          expect(event.textContent).toContain("Berlin, Germany");
        });
      });

    test('number of events per page changes according to what user types', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
        const NumberOfEventsInput = within(NumberOfEventsDOM).queryByTestId('numberOfEventsInput');
        
        await user.clear(NumberOfEventsInput);
        await user.type(NumberOfEventsInput, '{backspace}{backspace}10');
                
        await waitFor(() => {
            const EventListDOM = AppDOM.querySelector('#event-list');
            const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
            expect(allRenderedEventItems).toHaveLength(10);
          });
    });
});