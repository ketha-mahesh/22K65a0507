import React from 'react';

const ProductDetails = ({ product }) => (
  <div className="product-details">
    <img src={product.image} alt={product.name} />
    <h1>{product.name}</h1>
    <p>Company: {product.company}</p>
    <p>Category: {product.category}</p>
    <p>Price: ${product.price}</p>
    <p>Rating: {product.rating} stars</p>
    <p>Discount: {product.discount}%</p>
    <p>Availability: {product.availability}</p>
  </div>
);

export default ProductDetails;
