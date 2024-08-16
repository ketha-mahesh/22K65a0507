import React from 'react';

const ProductFilter = ({ filters, setFilters }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="filter-container">
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
      <input
        type="number"
        name="rating"
        placeholder="Min Rating"
        onChange={handleFilterChange}
      />
      <input
        type="number"
        name="minPrice"
        placeholder="Min Price"
        onChange={handleFilterChange}
      />
      <input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default ProductFilter;
