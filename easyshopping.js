import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Top N Products</h1>
        <Switch>
          <Route path="/products/:productId">
            <ProductDetails />
          </Route>
          <Route path="/">
            <AllProducts />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ category: '', company: '', minPrice: 0, maxPrice: 10000 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/products`, { params: filters });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div>
      <FilterPanel handleFilterChange={handleFilterChange} />
      {loading ? <p>Loading...</p> : (
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={`https://picsum.photos/200/300?random=${product.id}`} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Company: {product.company}</p>
              <p>Price: ${product.price}</p>
              <p>Rating: {product.rating} stars</p>
              <Link to={`/products/${product.id}`}>Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductById = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductById();
  }, [productId]);

  return (
    <div>
      {loading ? <p>Loading...</p> : product && (
        <div className="product-details">
          <img src={`https://picsum.photos/400/600?random=${product.id}`} alt={product.name} />
          <h1>{product.name}</h1>
          <p>Company: {product.company}</p>
          <p>Price: ${product.price}</p>
          <p>Rating: {product.rating} stars</p>
          <p>Discount: {product.discount}%</p>
          <p>Availability: {product.availability ? 'In Stock' : 'Out of Stock'}</p>
        </div>
      )}
    </div>
  );
};

const FilterPanel = ({ handleFilterChange }) => (
  <div className="filter-panel">
    <select name="category" onChange={handleFilterChange}>
      <option value="">All Categories</option>
      <option value="electronics">Electronics</option>
      <option value="fashion">Fashion</option>
      <option value="books">Books</option>
    </select>
    <select name="company" onChange={handleFilterChange}>
      <option value="">All Companies</option>
      <option value="company1">Company 1</option>
      <option value="company2">Company 2</option>
    </select>
    <input type="number" name="minPrice" placeholder="Min Price" onChange={handleFilterChange} />
    <input type="number" name="maxPrice" placeholder="Max Price" onChange={handleFilterChange} />
  </div>
);

export default App;
