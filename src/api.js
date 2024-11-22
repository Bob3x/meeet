// src/api.js

import mockData from "./mock-data";
import NProgress from "nprogress";

/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */

export const extractLocations = (events) => {
  const extractedLocations = events.map(event => event.location.trim());
  const locations = [...new Set(extractedLocations)];
  return locations;
};

const checkToken = async (accessToken) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const result = await response.json();
    console.log("Token check result:", result);
    return result;
  } catch (error) {
    console.error("Token check failed:", error);
    return { error: true };
  }
};

export const getAccessToken = async () => {
  try {
    console.log("Starting auth flow");
    console.log("localStorage contents:", { ...localStorage });
    
    const accessToken = localStorage.getItem("access_token");
    console.log("Current token:", accessToken);

    if (!accessToken) {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      console.log("Auth code from URL:", code);

      if (!code) {

        const response = await fetch(
          "https://7u8afzt0kl.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
        )
        .then(response => response.json())
        .then(console.log)
        .catch(console.error);

        const result = await response.json();
        console.log("Got auth URL:", result);
        window.location.href = result.authUrl;
        return null;
      }
      return getToken(code);
    }

    const tokenCheck = await checkToken(accessToken);
    if (tokenCheck.error) {
      console.log("Token invalid, clearing");
      localStorage.removeItem("access_token");
      window.location.reload();
      return null;
    }

    return accessToken;
  } catch (error) {
    console.error("Auth error:", error);
    throw error;
  }
};

const getToken = async (code) => {
  try {
    const encodedCode = encodeURIComponent(code);
    const response = await fetch(
      `https://7u8afzt0kl.execute-api.eu-central-1.amazonaws.com/dev/api/token/${encodedCode}`
    );
    console.log("Token response:", response);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const json = await response.json();
    console.log("Token data:", json);
    localStorage.setItem("access_token", json.access_token);
    return json.access_token;
  } catch (error) {
    console.error("Token exchange failed:", error);
    throw error;
  }
};

/**
 *
 * This function will fetch the list of all events
 */

export const getEvents = async () => {
    NProgress.start();
    
    // Use mock data for localhost
    if (window.location.href.startsWith("http://localhost")) {
      NProgress.done();
      return mockData;
    }

    // Check if offline
    if (!navigator.onLine){
      const events = localStorage.getItem("lastEvents");
      NProgress.done();
      // Return cached events or empty array if no cache
      return events ? JSON.parse(events) : [];
    }

    try {
    const token = await getAccessToken();

    if (token) {
      removeQuery();
      const url =  "https://7u8afzt0kl.execute-api.eu-central-1.amazonaws.com/dev/api/get-events" + token;
      const response = await fetch(url);
      const result = await response.json();
      if (result) {
        NProgress.done();
        // Cache the events for offline use
        localStorage.setItem("lastEvents", JSON.stringify(result.events));
        return result.events;
        } 
    }
  return null;
  } catch (error) {
    NProgress.done();
      // Return cached events if fetch fails
      const events = localStorage.getItem("lastEvents");
      return events ? JSON.parse(events) : [];
    }
};

 const removeQuery = () => {
    let newurl;
    if (window.history.pushState && window.location.pathname) {
      newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname;
      window.history.pushState("", "", newurl);
    } else {
      newurl = window.location.protocol + "//" + window.location.host;
      window.history.pushState("", "", newurl);
    }
};