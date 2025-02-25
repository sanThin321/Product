import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/product";
import AddProductPage from "./pages/addproduct";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
