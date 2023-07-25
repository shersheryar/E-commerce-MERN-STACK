import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5005/products");
    result = await result.json();
    console.log(products);
    setProducts(result);
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
      </ul>
      {products.map((item, index) => (
        <ul>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>${item.price}</li>
          <li>{item.category}</li>
          <li>{item.company}</li>
        </ul>
      ))}
    </div>
  );
};

export default ProductList;
