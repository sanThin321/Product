import React, { useState } from "react";
import Header from "../components/header";
import Select from "react-select";

const AddProductPage = () => {
  const [numProducts, setNumProducts] = useState(0);
  const [products, setProducts] = useState([]);
  const [location, setLocation] = useState({
    dzongkhag: "",
    gewog: "",
    chiwog: "",
  });

  const dzongkhags = [
    { value: "Thimphu", label: "Thimphu" },
    { value: "Paro", label: "Paro" },
    { value: "Punakha", label: "Punakha" },
    { value: "Haa", label: "Haa" },
  ];

  const gewogs = [
    { value: "Gewog A", label: "Gewog A" },
    { value: "Gewog B", label: "Gewog B" },
    { value: "Gewog C", label: "Gewog C" },
  ];

  const chiwogs = [
    { value: "Chiwog 1", label: "Chiwog 1" },
    { value: "Chiwog 2", label: "Chiwog 2" },
    { value: "Chiwog 3", label: "Chiwog 3" },
  ];

  const handleNumProductsChange = (e) => {
    const count = parseInt(e.target.value, 10) || 0;
    setNumProducts(count);
    setProducts(Array.from({ length: count }, () => ({ name: "", total: "" })));
  };

  const handleProductChange = (index, field, value) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = { ...updatedProducts[index], [field]: value };
      return updatedProducts;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { location, products };
    console.log("Uploading Data:", formData);
    // API call to upload the data can be placed here
    setLocation({ dzongkhag: "", gewog: "", chiwog: "" });
    setNumProducts(0);
    setProducts([]);
  };

  return (
    <Header>
      <div className="ms-5 me-5">
        <h6>Add New Product</h6>
        <form onSubmit={handleSubmit}>
          {/* Location Select Inputs */}
          <div className="container">
            <div className="row">
              <div className=" col-4 mb-3">
                <label>Dzongkhag:</label>
                <Select
                  options={dzongkhags}
                  value={
                    dzongkhags.find(
                      (opt) => opt.value === location.dzongkhag
                    ) || ""
                  }
                  onChange={(selectedOption) =>
                    setLocation({
                      ...location,
                      dzongkhag: selectedOption.value,
                    })
                  }
                />
              </div>

              <div className="col-4 mb-3">
                <label>Gewog:</label>
                <Select
                  options={gewogs}
                  value={
                    gewogs.find((opt) => opt.value === location.gewog) || ""
                  }
                  onChange={(selectedOption) =>
                    setLocation({ ...location, gewog: selectedOption.value })
                  }
                />
              </div>

              <div className="col-4 mb-3">
                <label>Chiwog:</label>
                <Select
                  options={chiwogs}
                  value={
                    chiwogs.find((opt) => opt.value === location.chiwog) || ""
                  }
                  onChange={(selectedOption) =>
                    setLocation({ ...location, chiwog: selectedOption.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Number of Products Input */}
          <div className="container">
            <div className="row">
              <div className="col-4 mb-3">
                <label>How many different products?</label>
                <input
                  type="number"
                  className="form-control"
                  value={numProducts}
                  onChange={handleNumProductsChange}
                  min="0"
                />
              </div>
              {products.map((product, index) => (
                <div key={index} className="col-4 mb-3 d-flex gap-1">
                  <div>
                    <label>Product {index + 1} Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={product.name}
                      onChange={(e) =>
                        handleProductChange(index, "name", e.target.value)
                      }
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <label>Total Product:</label>
                    <input
                      type="number"
                      className="form-control"
                      value={product.total}
                      onChange={(e) =>
                        handleProductChange(index, "total", e.target.value)
                      }
                      placeholder="Enter total quantity"
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Submit Button */}
            <button type="submit" className="pb-1 pt-1 ps-5 pe-5 button">
              Upload
            </button>
          </div>
        </form>
      </div>
    </Header>
  );
};

export default AddProductPage;
