// src/__tests__/NumberOfEvents.test.js

import { render, screen } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";
import userEvent from "@testing-library/user-event";

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;
    beforeEach(() => {
        NumberOfEventsComponent = render(
            <NumberOfEvents 
            currentNOE={32} 
            setCurrentNOE={() => {}}
            setErrorAlert={() => {}}
            />
        )
    })

    test('number of events has the role of textbox', () => {
        const input = screen.getByTestId('numberOfEventsInput');
        expect(input).toBeInTheDocument();
    })

    test('ensure the default value of textbox is 32', () => {
        const input = screen.getByTestId('numberOfEventsInput');
        expect(input).toHaveValue("32");
    })

    test('textbox value changes when user types', async () => {
        const user = userEvent.setup();
        const input = screen.getByTestId('numberOfEventsInput');
       
        await user.clear(input);
        await user.type(input, "33");
        expect(input).toHaveValue("33");
    })
})