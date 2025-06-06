import { Routes, Route, Navigate } from "react-router";
import HomePage from "../pages/HomePage";
import MoviePage from "../pages/MoviePage";
import MovieDetailPage from "../pages/MovieDetailPage";
import ShowPage from "../pages/ShowPage";
import ShowDetailPage from "../pages/ShowDetailPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movie" element={<MoviePage />} />
      <Route path="/movie/:id" element={<MovieDetailPage />} />
      <Route path="/show" element={<ShowPage />} />
      <Route path="/show/:id" element={<ShowDetailPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
