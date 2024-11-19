// src/components/Event.js

import { useState } from "react";

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <li className="event">
            <div className="event-summary">
                <h2>{event && event.summary}</h2>
                <p className="location">{event && event.location}</p>
                <p className="event-created">{event && event.created}</p>
            </div>
            {showDetails ? 
                <div data-testid="event-details">
                    <p>{event && event.description}</p>
                </div>
             : null
             }
            <button className="details-btn"
                onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? "Hide Details" : "Show Details"}
                </button>
        </li>
    );
};

export default Event;