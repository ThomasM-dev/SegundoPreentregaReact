import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import CategoryFilter from "../../components/CategoryFilter";
import Spinner from "../../components/Spinner";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { category } = useParams();
  const { products, loading } = useProducts();
  
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (category && category !== "undefined") {
      setFilteredProducts(products.filter(product => product.category === category));
    } else {
      setFilteredProducts(products);
    }
  }, [category, products]);

  return (
    <div className="page-catologo">
      <h2>Productos en la categoría: {category || "Todos los productos"}</h2>

      <CategoryFilter products={filteredProducts} />

      {loading ? (
        <Spinner />
      ) : (
        <div className="product-container">
          {filteredProducts.map((product) => (
            <div key={product.idFirestore} className="card-item-catologo">
              <h3>{product.title}</h3>
              <img src={product.imageUrl} alt={product.title} />
              <p>${product.price} ARS</p>
              <p>Stock: {product.stock}</p>
              <Link to={`/categoria/${product.category}/DetalleProducto/${product.idFirestore}`}>Ver detalle</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
