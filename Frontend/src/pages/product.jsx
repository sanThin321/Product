import React, { useState } from "react";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import "./css/product.css";

const LandingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const navigate = useNavigate();
  const handleAddClick = () => {
    navigate("/add-product"); // Navigate to your add product page
  };
  
  // Generate 50 dummy data entries
  const data = Array.from({ length: 50 }, (_, index) => ({
    product: `Product ${index + 1}`,
    dzongkhag: `Dzongkhag ${(index % 5) + 1}`,
    gewog: `Gewog ${(index % 10) + 1}`,
    chiwog: `Chiwog ${(index % 15) + 1}`,
    total: Math.floor(Math.random() * 1000) + 100,
  }));

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Get current page data
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Header>
      <div>
        <div className="d-flex gap-5 position-relative ms-5 me-5">
          <input
            type="search"
            placeholder="Search product..."
            className="form-control no-focus text-dark w-25"
            aria-label="Search"
          />
          <button className="pe-5 ps-5 button" onClick={handleAddClick}>Add</button>
        </div>
        <table className="table table-bordered mt-5">
          <thead className="table-dark">
            <tr>
              <th>Product</th>
              <th>Dzongkhag</th>
              <th>Gewog</th>
              <th>Chiwog</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                <td>{item.product}</td>
                <td>{item.dzongkhag}</td>
                <td>{item.gewog}</td>
                <td>{item.chiwog}</td>
                <td>{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-center gap-5 align-items-center mt-3 ms-5 me-5">
          <button
            className="btn btn-primary buttonpage"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-primary buttonpage"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </Header>
  );
};

export default LandingPage;