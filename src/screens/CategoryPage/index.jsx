import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import products from "../../data/products.json"; 
import CategoryFilter from "../../components/CategoryFilter";
import "../Catologist/Catologist.css";

const CategoryPage = () => {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.products.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products.products);
    }
  }, [selectedCategory, category]);

  return (
    <div className="page-catologo">
      <h2>Productos en la categoría: {category}</h2>
      <CategoryFilter products={products.products} setCategory={setSelectedCategory} />

      <div className="product-container">
        {filteredProducts.map((product) => (
          <div key={product.id} className="card-item-catologo">
            <h3>{product.title}</h3>
            <img src={product.imageUrl} alt={product.title} />
            <p>${product.price} ARS</p>
            <Link to={`/DetalleProducto/${product.id}`}>Ver detalle</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
