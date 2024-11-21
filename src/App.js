// src/App.js

import React, { useState, lazy, Suspense } from 'react';
import useFetchEvents from './hooks/useFetchEvents';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { InfoAlert, WarningAlert, ErrorAlert } from './components/Alert';

import './App.css';

const EventGenresChart = lazy(() => import('./components/EventGenresChart'));
const CityEventsChart = lazy(() => import('./components/CityEventsChart'));

const App = () => {
  const [currentNOE, setCurrentNOE] = useState(32);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");

  const { events, allLocations, isLoading, errorAlert, warningAlert, setErrorAlert, setWarningAlert } = useFetchEvents(currentCity, currentNOE);

  const handleCloseAlert = (alertType) => {
    switch(alertType) {
      case 'info':
        setInfoAlert("");
        break;
      case 'error':
        setErrorAlert("");
        break;
      case 'warning':
        setWarningAlert("");
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <header className="header">
      <h1>Meeet</h1>
      <p>Find events in your city</p>
      <div className="alerts-container">
        {infoAlert &&  <InfoAlert text={infoAlert} onClose={() => handleCloseAlert('info')} />}
        {errorAlert && <ErrorAlert text={errorAlert} onClose={() => handleCloseAlert('error')} />}
        {warningAlert && <WarningAlert text={warningAlert} onClose={() => handleCloseAlert('warning')} />}
      </div>
      </header>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
      />
      <NumberOfEvents
        setCurrentNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert}
      />
      {isLoading ? (
        <div className="loading-container">Loading...</div>
      ) : (
        <div className="charts-container">
        <Suspense fallback={<div>Loading...</div>}>
        <div className="chart-wrapper">
      <EventGenresChart events={events} />
      </div>
      <div className="chart-wrapper">
      <CityEventsChart allLocations={allLocations} events={events} />
      </div>
      </Suspense>
      </div>
      )}
      <EventList events={events} />
      <footer className="footer">
        <div className="footer-content">
            <p>&copy; 2024 Meeet App. All rights reserved.</p>
            <div className="footer-links">
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Use</a>
                <a href="#contact">Contact</a>
            </div>
        </div>
    </footer>
    </div>
  );
};

export default App;
