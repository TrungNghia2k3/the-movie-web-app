import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import Footer from "../sections/Footer";
import AppRoutes from "./AppRoutes";

const AppRoutesWrapper = ({
  onRouteComplete,
  onRouteStart,
  routeLoadingStates,
}) => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  // Check route is loaded
  const isCurrentRouteLoaded = routeLoadingStates[location.pathname] === true;

  useEffect(() => {
    // When route changes
    if (location.pathname !== currentPath) {
      console.log("Route changed from", currentPath, "to", location.pathname);

      // Notify route start
      onRouteStart(location.pathname);
      setCurrentPath(location.pathname);
    }
  }, [location.pathname, currentPath, onRouteStart]);

  const handleRenderComplete = useCallback(() => {
    onRouteComplete(location.pathname);
  }, [location.pathname, onRouteComplete]);

  return (
    <>
      <AppRoutes onRenderComplete={handleRenderComplete} />
      {isCurrentRouteLoaded && <Footer />}
    </>
  );
};

export default AppRoutesWrapper;
