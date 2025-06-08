import { Navigate, Route, Routes } from "react-router";
import HomePage from "../pages/HomePage";
import MovieDetailPage from "../pages/MovieDetailPage";
import MovieListing from "../pages/MovieListing";

function AppRoutes({ onRenderComplete }) {
  
  return (
    <Routes>
      <Route path="/" element={<HomePage onRenderComplete={onRenderComplete} />} />
      <Route path="/movie/:id" element={<MovieDetailPage onRenderComplete={onRenderComplete} />} />
      <Route path="/movie-listing/:genreId?/:countryCode?/:keyword?" element={<MovieListing onRenderComplete={onRenderComplete} />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
