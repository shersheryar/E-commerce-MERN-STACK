import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5005/products");
    result = await result.json();
    // console.log(products);
    setProducts(result);
  };
  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5005/product/${id}`, {
      method: "delete",
    });
    result = await result.json();
    if (result) {
      alert("Record is deleted");
      getProducts();
    }
  };
  return (
    <div className="product-list">
      <h2>Product List</h2>
      <ul>
        <li className="head">S. No</li>
        <li className="head">Name</li>
        <li className="head">Price</li>
        <li className="head">Category</li>
        <li className="head">Company</li>
        <li className="head">Operation</li>
      </ul>
      {products.map((item, index) => (
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>${item.price}</li>
          <li>{item.category}</li>
          <li>{item.company}</li>
          <li>
            <button onClick={() => deleteProduct(item._id)}>Delete</button>
            <Link to={`/update/${item._id}`}>Update</Link>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default ProductList;
