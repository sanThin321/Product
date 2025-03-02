import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Select from "react-select";
import axios from "axios";

const AddProductPage = () => {
  const [numProducts, setNumProducts] = useState(0);
  const [products, setProducts] = useState([]);
  const [location, setLocation] = useState({
    dzongkhag: "",
    gewog: "",
    chiwog: "",
  });
  const [dzongkhags, setDzongkhags] = useState([]);
  const [gewogs, setGewogs] = useState([]);
  const [chiwogs, setChiwogs] = useState([]);

  // Fetch Dzongkhags on initial render
  useEffect(() => {
    axios
      .get("http://localhost:3000/product/dzongkhags")
      .then((response) => {
        const dzongkhagOptions = response.data.map((dzongkhag) => ({
          value: dzongkhag.id, // Assuming the ID is present in the response
          label: dzongkhag.name, // Assuming the name of Dzongkhag is 'name'
        }));
        setDzongkhags(dzongkhagOptions);
      })
      .catch((error) => {
        console.error("There was an error fetching Dzongkhags!", error);
      });
  }, []);

  // Fetch Gewogs when Dzongkhag is selected
  useEffect(() => {
    if (location.dzongkhag) {
      axios
        .get(`http://localhost:3000/product/gewogs/${location.dzongkhag}`)
        .then((response) => {
          const gewogOptions = response.data.map((gewog) => ({
            value: gewog.id, // Assuming the ID is present in the response
            label: gewog.name, // Assuming the name of Gewog is 'name'
          }));
          setGewogs(gewogOptions);
        })
        .catch((error) => {
          console.error("There was an error fetching Gewogs!", error);
        });
    }
  }, [location.dzongkhag]);

  // Fetch Chiwogs when Gewog is selected
  useEffect(() => {
    if (location.gewog) {
      axios
        .get(`http://localhost:3000/product/chiwogs/${location.gewog}`)
        .then((response) => {
          const chiwogOptions = response.data.map((chiwog) => ({
            value: chiwog.id, // Assuming the ID is present in the response
            label: chiwog.name, // Assuming the name of Chiwog is 'name'
          }));
          setChiwogs(chiwogOptions);
        })
        .catch((error) => {
          console.error("There was an error fetching Chiwogs!", error);
        });
    }
  }, [location.gewog]);

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

    // Get the selected Dzongkhag, Gewog, and Chiwog names
    const selectedDzongkhag = dzongkhags.find(
      (dzongkhag) => dzongkhag.value === location.dzongkhag
    );
    const selectedGewog = gewogs.find((gewog) => gewog.value === location.gewog);
    const selectedChiwog = chiwogs.find(
      (chiwog) => chiwog.value === location.chiwog
    );

    // Loop through the products and send them one by one
    products.forEach((product) => {
      const productData = {
        product_name: product.name,
        dzongkhag: selectedDzongkhag ? selectedDzongkhag.label : "", // Include Dzongkhag name
        gewog: selectedGewog ? selectedGewog.label : "", // Include Gewog name
        chiwog: selectedChiwog ? selectedChiwog.label : "", // Include Chiwog name
        total_product: product.total,
      };

      // API call to upload the product data to the backend
      axios
        .post("http://localhost:3000/product/add-product", productData)
        .then((response) => {
          console.log("Product uploaded successfully:", response.data);
        })
        .catch((error) => {
          console.error("There was an error uploading the product:", error);
        });
    });

    // Reset form data after submitting
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
          <div className="row">
            <div className="col-4 mb-3">
              <label>Dzongkhag:</label>
              <Select
                options={dzongkhags}
                value={dzongkhags.find((opt) => opt.value === location.dzongkhag) || ""}
                onChange={(selectedOption) =>
                  setLocation({ ...location, dzongkhag: selectedOption.value })
                }
              />
            </div>

            <div className="col-4 mb-3">
              <label>Gewog:</label>
              <Select
                options={gewogs}
                value={gewogs.find((opt) => opt.value === location.gewog) || ""}
                onChange={(selectedOption) =>
                  setLocation({ ...location, gewog: selectedOption.value })
                }
              />
            </div>

            <div className="col-4 mb-3">
              <label>Chiwog:</label>
              <Select
                options={chiwogs}
                value={chiwogs.find((opt) => opt.value === location.chiwog) || ""}
                onChange={(selectedOption) =>
                  setLocation({ ...location, chiwog: selectedOption.value })
                }
              />
            </div>
          </div>

          {/* Number of Products Input */}
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
                    onChange={(e) => handleProductChange(index, "name", e.target.value)}
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label>Total Product:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={product.total}
                    onChange={(e) => handleProductChange(index, "total", e.target.value)}
                    placeholder="Enter total quantity"
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Submit Button */}
          <button type="submit" className="button">
            Upload
          </button>
        </form>
      </div>
    </Header>
  );
};

export default AddProductPage;
