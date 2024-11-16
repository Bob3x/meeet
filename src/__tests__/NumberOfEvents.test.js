// src/__tests__/NumberOfEvents.test.js

import { render } from "@testing-library/react";
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
        const input = NumberOfEventsComponent.queryByRole('textbox');
        expect(input).toBeInTheDocument();
    })

    test('ensure the default value of textbox is 32', () => {
        const input = NumberOfEventsComponent.queryByRole('textbox');
        expect(input).toHaveValue('32');
    })

    test('textbox value changes when user types', async () => {
        const input = NumberOfEventsComponent.getByTestId('numberOfEventsInput');
        const user = userEvent.setup();
        await user.type(input, '33');
        expect(input).toHaveValue('11');
    })
})