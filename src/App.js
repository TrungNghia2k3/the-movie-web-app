import React, { useState, useCallback } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/App.css";
import { BrowserRouter as Router } from "react-router";
import AppRoutesWrapper from "./routes/AppRoutesWrapper";
import Header from "./sections/Header";

function App() {
  const [routeLoadingStates, setRouteLoadingStates] = useState({});
  
  console.log("Route loading states: ", routeLoadingStates);

  const handleRouteComplete = useCallback((routePath) => {
    console.log("Route completed:", routePath);
    setRouteLoadingStates(prev => ({
      ...prev,
      [routePath]: true
    }));
  }, []);

  const handleRouteStart = useCallback((routePath) => {
    console.log("Route started:", routePath);
    setRouteLoadingStates(prev => ({
      ...prev,
      [routePath]: false
    }));
  }, []);

  return (
    <Router>
      <Header />
      <AppRoutesWrapper 
        onRouteComplete={handleRouteComplete}
        onRouteStart={handleRouteStart}
        routeLoadingStates={routeLoadingStates}
      />
    </Router>
  );
}

export default App;
