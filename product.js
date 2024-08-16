
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <div className="product-card">
    <img src={product.image} alt={product.name} />
    <h3>{product.name}</h3>
    <p>Company: {product.company}</p>
    <p>Category: {product.category}</p>
    <p>Price: ${product.price}</p>
    <p>Rating: {product.rating} stars</p>
    <Link to={`/products/${product.id}`}>View Details</Link>
  </div>
);

export default ProductCard;
