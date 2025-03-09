import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import CategoryFilter from "../../components/CategoryFilter";
import Spinner from "../../components/Spinner"
import "./CategoryPage.css";

const CategoryPage = () => {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let productsQuery;

        if (category && category !== "undefined") {
          productsQuery = query(collection(db, "productos"), where("category", "==", category));
        } else {
          productsQuery = collection(db, "productos");
        }

        const querySnapshot = await getDocs(productsQuery);
        const productsList = querySnapshot.docs.map((doc) => ({
          idFirestore: doc.id,
          ...doc.data(),
        }));
        setFilteredProducts(productsList);
      } catch (error) {
        console.error("Error al obtener productos de Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

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
