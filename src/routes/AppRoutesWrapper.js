import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router";
import AppRoutes from "./AppRoutes";
import Footer from "../sections/Footer";

const AppRoutesWrapper = ({
  onRouteComplete,
  onRouteStart,
  routeLoadingStates,
}) => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  // Kiểm tra route hiện tại đã load xong chưa
  const isCurrentRouteLoaded = routeLoadingStates[location.pathname] === true;

  useEffect(() => {
    // Khi route thay đổi
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
