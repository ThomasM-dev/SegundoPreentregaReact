import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import {db} from "../../config/firebaseConfig"
import CategoryFilter from "../../components/CategoryFilter";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let productsQuery;

        if (category && category !== 'undefined') {
          productsQuery = query(collection(db, "productos"), where("category", "==", category));
        } else {
          productsQuery = collection(db, "productos");
        }

        const querySnapshot = await getDocs(productsQuery);        
        const productsList = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        setFilteredProducts(productsList);
      } catch (error) {
        console.error("Error al obtener productos de Firestore:", error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="page-catologo">
      <h2>Productos en la categoría: {category || "Todos los productos"}</h2>

      <CategoryFilter products={filteredProducts} />

      <div className="product-container">
        {filteredProducts.map((product) => (
          <div key={product.id} className="card-item-catologo">
            <h3>{product.title}</h3>
            <img src={product.imageUrl} alt={product.title} />
            <p>${product.price} ARS</p>
            <p>Categoría: {product.category}</p>
            <Link to={`/category/${product.category}/DetalleProducto/${product.id}`}>Ver detalle</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
