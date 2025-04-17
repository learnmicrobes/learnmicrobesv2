import { Routes, Route } from "react-router-dom";
import App from "./App";
import BioCalculator from "./tools/BioCalculator/Calculator";
import GramPositiveRoadmap from "./tools/GramPositiveRoadmap/PositiveRoadmap";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={null} />
        <Route path="biochemical-calculator" element={<BioCalculator />} />
        <Route
          path="gram-positive-roadmap"
          element={<GramPositiveRoadmap />} // Replace the placeholder with the actual component
        />
        <Route
          path="gram-negative-roadmap"
          element={
            <div className="coming-soon">
              <h3>Gram Negative Identification Guide</h3>
              <p>Interactive roadmap coming soon!</p>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}
