// src/components/EventList.js

import Event from './Event';

const EventList = ({ events }) => {
    return (
      <div>
        {!events ? (
          <p>No events found</p>
        ) : (
          <ul id="event-list">
        {events.map(event => <Event key={event.id} event={event} />)}
      </ul>
        )}
      </div>
    );
  };
  
  export default EventList;