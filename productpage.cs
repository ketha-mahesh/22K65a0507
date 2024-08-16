import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/apiService';
import ProductDetails from '../components/ProductDetails';

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProductById(productId);
      setProduct(data);
    };
    loadProduct();
  }, [productId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-page">
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductPage;
