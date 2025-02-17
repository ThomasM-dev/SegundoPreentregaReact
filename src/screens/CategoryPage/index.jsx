import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import products from "../../data/products.json"; 
import CategoryFilter from "../../components/CategoryFilter";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  useEffect(() => {
    if (category && category !== 'undefined') {
      const filtered = products.products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products.products);
    }
  }, [category]);

  return (
    <div className="page-catologo">
      <h2>Productos en la categoría: {category || "Todos los productos"}</h2>

      <CategoryFilter products={products.products} />

      <div className="product-container">
        {filteredProducts.length === 0 ? (
          <p>No se encontraron productos en esta categoría.</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="card-item-catologo">
              <h3>{product.title}</h3>
              <img src={product.imageUrl} alt={product.title} />
              <p>${product.price} ARS</p>
              <p>Categoría: {product.category}</p>
              <Link to={`/categoria/${product.category}/DetalleProducto/${product.id}`}>Ver detalle</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
