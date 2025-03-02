import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/product";
import AddProductPage from "./pages/addproduct";
import EditProduct from "./pages/editproduct";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/editproduct/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
