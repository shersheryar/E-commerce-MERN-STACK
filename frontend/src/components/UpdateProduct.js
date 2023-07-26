import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetail();
  }, []);

  const getProductDetail = async () => {
    let result = await fetch(`http://localhost:5005/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };
  const updateProduct = async () => {
    // console.log(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;

    // console.log(userId);
    let result = await fetch(`http://localhost:5005/product/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    if (result) {
      alert("Updated Successfully");
      navigate("/");
    }
  };
  return (
    <div className="add-product">
      <h1>Update Product</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <input
        className="inputBox"
        type="text"
        placeholder="Enter product price"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />

      <input
        className="inputBox"
        type="text"
        placeholder="Enter product category"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product company"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
      />
      <button
        className="update-product-btn"
        type="button"
        onClick={updateProduct}
      >
        Update Product
      </button>
    </div>
  );
};

export default AddProduct;
