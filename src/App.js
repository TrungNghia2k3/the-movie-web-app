import React, { useState, useCallback } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/App.css";
import { BrowserRouter as Router } from "react-router";
import AppRoutes from "./routes/AppRoutes";
import Header from "./sections/Header";
import Footer from "./sections/Footer";

function App() {
  const [isAppRoutesLoaded, setIsAppRoutesLoaded] = useState(false);

  const handleAppRoutesComplete = useCallback(() => {
    setIsAppRoutesLoaded(true);
  }, []);

  return (
    <Router>
      <Header />
      <AppRoutes onRenderComplete={handleAppRoutesComplete} />
      {isAppRoutesLoaded && <Footer />}
    </Router>
  );
}

export default App;
