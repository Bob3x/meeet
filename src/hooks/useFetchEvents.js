// src/hooks/useFetchEvents.js

import { useState, useEffect } from 'react';
import { getEvents, extractLocations } from '../api';

const useFetchEvents = (currentCity, currentNOE) => {
  const [events, setEvents] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const allEvents = await getEvents();
        const filteredEvents = currentCity === "See all cities" 
          ? allEvents
          : allEvents.filter(event => event.location === currentCity);
        setEvents(filteredEvents.slice(0, currentNOE));
        setAllLocations(extractLocations(allEvents));
      } catch (error) {
        setErrorAlert("Failed to fetch events");
      } finally {
        setIsLoading(false);
      }
    };

    // Check online status
    if (navigator.onLine) {
        setWarningAlert("");
      } else {
        setWarningAlert("You are currently offline");
      }
    fetchData();
  }, [currentCity, currentNOE]);

  return { events, allLocations, isLoading, warningAlert, errorAlert, setWarningAlert, setErrorAlert, };
};

export default useFetchEvents;