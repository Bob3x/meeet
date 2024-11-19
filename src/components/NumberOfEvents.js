// src/components/NumberOfEvents.js

import { useState } from "react";
import PropTypes from "prop-types";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
    const [number, setNumber] = useState("32");

    const handleInputChanged = (event) => {
        const value = event.target.value;
        setNumber(value)
        if(isNaN(value) || parseInt(value) <= 0) {
            setErrorAlert("Enter a valid number");
        } else if ( value > 32) {
            setErrorAlert("Maximum of 32 is allowed")
        } else {
            setErrorAlert("");
            setCurrentNOE(parseInt(value));
        }
    };

    return (
       <div id="number-of-events">
            <label htmlFor="numberOfEventsInput">Number of Events:</label>
            <input 
                type="text"
                value={number}
                onChange={handleInputChanged}
                data-testid="numberOfEventsInput"
                className="numberOfEventsInput"
            />
        </div>
    );
};

NumberOfEvents.propTypes = {
    setCurrentNOE: PropTypes.func.isRequired,
    setErrorAlert: PropTypes.func.isRequired
};

export default NumberOfEvents;