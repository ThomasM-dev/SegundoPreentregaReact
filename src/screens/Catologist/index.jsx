import React, { useState, useEffect } from "react";
import products from "../../data/products.json";
import { Link } from "react-router-dom";
import CategoryFilter from "../../components/CategoryFilter"; 
import "./Catologist.css";

const Catologist = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (category) {
      setFilteredProducts(products.products.filter((prod) => prod.category === category));
    } else {
      setFilteredProducts(products.products);
    }
  }, [category]);

  return (
    <div className="page-catologo">
      <h2>Catálogo De Productos</h2>
      <CategoryFilter products={products.products} setCategory={setCategory} />
      <div className="product-container">
        {filteredProducts.map((prod) => (
          <div className="card-item-catologo" key={prod.id}>
            <h3>{prod.title}</h3>
            <img src={prod.imageUrl} alt={prod.title} />
            <p>${prod.price} ARS</p>
            <Link to={`/DetalleProducto/${prod.id}`}>Ver detalle</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catologist;
