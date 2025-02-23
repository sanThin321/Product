import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LandingPage from "./pages/product";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
