// src/components/NumberOfEvents.js

import { useState } from "react";
import PropTypes from "prop-types";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
    const [number, setNumber] = useState(32);

    const handleInputChanged = (event) => {
        const value = event.target.value;
        setNumber(value)
        if(isNaN(value) || value <= 0) {
            setErrorAlert("Enter a valud number");
        } else if ( value > 32) {
            setErrorAlert("Maximum of 32 is allowed")
        } else {
            setErrorAlert("");
            setCurrentNOE(value);
        }
    };

    return (
       <div id="number-of-events">
            <label>
                Number of Events:
            <input 
                type="text"
                value={number}
                onChange={handleInputChanged}
                data-testid="numberOfEventsInput"
            />
            </label>
        </div>
    )
};

export default NumberOfEvents;

NumberOfEvents.propTypes = {
    setCurrentNOE: PropTypes.func.isRequired,
    setErrorAlert: PropTypes.func.isRequired
}