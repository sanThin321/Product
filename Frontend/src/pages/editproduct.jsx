import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../components/header";
import Select from "react-select";
import axios from "axios";
import "./css/product.css";

const EditProduct = () => {
  const navigate = useNavigate();
  const productId = localStorage.getItem("selectedProductId");

  const [productData, setProductData] = useState({
    dzongkhag: null,
    gewog: null,
    chiwog: null,
    product_name: "",
    total_product: 0,
  });

  const [dzongkhags, setDzongkhags] = useState([]);
  const [gewogs, setGewogs] = useState([]);
  const [chiwogs, setChiwogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/product/dzongkhags")
      .then((response) => {
        const dzongkhagOptions = response.data.map((dzongkhag) => ({
          value: dzongkhag.id,
          label: dzongkhag.name,
        }));
        setDzongkhags(dzongkhagOptions);
      })
      .catch((error) => {
        console.error("Error fetching Dzongkhags:", error);
      });
  }, []);

  useEffect(() => {
    if (productId) {
      axios
        .get(`http://localhost:3000/product/editProduct/${productId}`)
        .then((response) => {
          const data = response.data;
          setProductData({
            dzongkhag: data.dzongkhag ? { value: data.dzongkhag, label: data.dzongkhag } : null,
            gewog: data.gewog ? { value: data.gewog, label: data.gewog } : null,
            chiwog: data.chiwog ? { value: data.chiwog, label: data.chiwog } : null,
            product_name: data.product_name,
            total_product: data.total_product,
          });
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    }
  }, [productId]);

  useEffect(() => {
    if (productData.dzongkhag) {
      axios
        .get(`http://localhost:3000/product/gewogs/${productData.dzongkhag.value}`)
        .then((response) => {
          const gewogOptions = response.data.map((gewog) => ({
            value: gewog.id,
            label: gewog.name,
          }));
          setGewogs(gewogOptions);
        })
        .catch((error) => {
          console.error("Error fetching Gewogs:", error);
        });
    }
  }, [productData.dzongkhag]);

  useEffect(() => {
    if (productData.gewog) {
      axios
        .get(`http://localhost:3000/product/chiwogs/${productData.gewog.value}`)
        .then((response) => {
          const chiwogOptions = response.data.map((chiwog) => ({
            value: chiwog.id,
            label: chiwog.name,
          }));
          setChiwogs(chiwogOptions);
        })
        .catch((error) => {
          console.error("Error fetching Chiwogs:", error);
        });
    }
  }, [productData.gewog]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Don't save",
      buttonsStyling:false,
      customClass: {
        confirmButton: 'save', 
        cancelButton: 'cancel'
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedProductData = {
          dzongkhag: productData.dzongkhag?.label,
          gewog: productData.gewog?.label,
          chiwog: productData.chiwog?.label,
          product_name: productData.product_name,
          total_product: productData.total_product,
        };

        axios
          .put(`http://localhost:3000/product/updateProduct/${productId}`, updatedProductData)
          .then(() => {
            Swal.fire("Saved!", "Your changes have been saved.", "success").then(() => {
              navigate("/");
            });
          })
          .catch(() => {
            Swal.fire("Error!", "There was an error saving the product.", "error");
          });
      }
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      buttonsStyling:false,
      customClass: {
        actions:'swal-actions',
        confirmButton: 'delete', 
        cancelButton: 'cancl'
      },

    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/product/deleteProduct/${productId}`)
          .then(() => {
            Swal.fire("Deleted!", "Your product has been deleted.", "success").then(() => {
              navigate("/");
            });
          })
          .catch(() => {
            Swal.fire("Error!", "There was an error deleting the product.", "error");
          });
      }
    });
  };

  return (
    <Header>
      <div className="container">
        <h6>Edit Product</h6>
        <form>
          <div className="row">
            <div className="col-4 mb-3">
              <label>Dzongkhag:</label>
              <Select
                options={dzongkhags}
                value={productData.dzongkhag}
                onChange={(selectedOption) =>
                  setProductData({ ...productData, dzongkhag: selectedOption, gewog: null, chiwog: null })
                }
              />
            </div>

            <div className="col-4 mb-3">
              <label>Gewog:</label>
              <Select
                options={gewogs}
                value={productData.gewog}
                onChange={(selectedOption) =>
                  setProductData({ ...productData, gewog: selectedOption, chiwog: null })
                }
                isDisabled={!productData.dzongkhag}
              />
            </div>

            <div className="col-4 mb-3">
              <label>Chiwog:</label>
              <Select
                options={chiwogs}
                value={productData.chiwog}
                onChange={(selectedOption) =>
                  setProductData({ ...productData, chiwog: selectedOption })
                }
                isDisabled={!productData.gewog}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-4 mb-3">
              <label>Product Name:</label>
              <input type="text" className="form-control" name="product_name" value={productData.product_name} onChange={handleChange} />
            </div>

            <div className="col-4 mb-3">
              <label>Total Product:</label>
              <input type="number" className="form-control" name="total_product" value={productData.total_product} onChange={handleChange} />
            </div>
          </div>

          <button type="button" onClick={handleSave} className="button me-2">Save</button>
          <button type="button" onClick={handleDelete} className="button danger">Delete</button>
        </form>
      </div>
    </Header>
  );
};

export default EditProduct;
