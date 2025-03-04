import React, { useState, useEffect } from "react";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios"; // Import axios
import "./css/product.css";

const LandingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [totalSum, setTotalSum] = useState(0);
  const [data, setData] = useState([]); // State to store data fetched from the backend
  const [filteredData, setFilteredData] = useState([]); // State to store filtered data based on search
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    axios
      .get("http://localhost:3000/product/products") // Replace with your backend API URL
      .then((response) => {
        setData(response.data); // Assuming the backend returns an array of products
        setFilteredData(response.data); // Set the fetched data as filteredData initially
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the data:", error);
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <Header>
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      </Header>
    );
  }
  if (error) {
    return (
      <Header>
        <div className="error-message">{error}</div>
      </Header>
    );
  }

  const handleAddClick = () => {
    navigate("/add-product");
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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

  const handleRowClick = (id) => {
    // Store the product ID in localStorage
    localStorage.setItem("selectedProductId", id);

    // Navigate to the edit product page
    navigate(`/editproduct/${id}`);
  };

  // Group products with similar names (case-insensitive) and calculate total for each product
  const groupByProductName = (data) => {
    return data.reduce((acc, item) => {
      const productName = item.product_name.toLowerCase();
      if (!acc[productName]) {
        acc[productName] = [];
      }
      acc[productName].push(item);
      return acc;
    }, {});
  };

  const handleProductChange = (selectedOption) => {
    setSelectedProduct(selectedOption);
    const productName = selectedOption.value.toLowerCase();
    const groupedData = groupByProductName(data);
    
    // Get total product count for the selected product
    const totalForProduct = groupedData[productName].reduce((acc, item) => acc + item.total_product, 0);
    setTotalSum(totalForProduct);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    const query = event.target.value.toLowerCase();
    
    const filtered = data.filter((item) => {
      return (
        item.product_name.toLowerCase().includes(query) ||
        item.dzongkhag.toLowerCase().includes(query) ||
        item.gewog.toLowerCase().includes(query) ||
        item.chiwog.toLowerCase().includes(query)
      );
    });

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page when search query changes
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading text while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Display error message if there's an error fetching data
  }

  // Prepare product options for the select dropdown
  const productOptions = [
    ...new Set(
      data.map((item) => item.product_name.toLowerCase())
    )
  ].map(productName => ({
    value: productName,
    label: productName.charAt(0).toUpperCase() + productName.slice(1)
  }));

  return (
    <Header>
      <div>
        <div className="d-flex gap-3 position-relative ms-5 me-5">
          <input
            type="search"
            placeholder="Search product, dzongkhag, gewog, chiwog..."
            className="form-control no-focus text-dark w-25"
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearch} // Handle search input changes
          />
          <button className="pe-5 ps-5 button" onClick={handleAddClick}>Add</button>
          
          <Select
            className="w-25"
            options={productOptions}
            value={selectedProduct}
            onChange={handleProductChange}
            isSearchable
            placeholder="Select Total Product"
          />
          <div className="d-flex align-items-center">Total: {totalSum}</div>
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
            {filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item) => (
              <tr key={item.id} onClick={() => handleRowClick(item.id)} style={{ cursor: "pointer" }}>
                <td>{item.product_name}</td>
                <td>{item.dzongkhag}</td>
                <td>{item.gewog}</td>
                <td>{item.chiwog}</td>
                <td>{item.total_product}</td>
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
