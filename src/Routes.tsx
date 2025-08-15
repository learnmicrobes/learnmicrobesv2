import { Routes, Route, Navigate } from "react-router-dom"; // Add Navigate if missing
import App from "./App";
import BioCalculator from "./tools/BioCalculator/Calculator";
import GramPositiveRoadmap from "./tools/GramPositiveRoadmap/PositiveRoadmap";
import GramNegativeRoadmap from "./tools/GramNegativeRoadmap/NegativeRoadmap"


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={null} />
        <Route path="biochemical-calculator" element={<BioCalculator />} />
        <Route path="gram-positive-roadmap" element={<GramPositiveRoadmap />} />
        <Route path="gram-negative-roadmap" element={<GramNegativeRoadmap />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
