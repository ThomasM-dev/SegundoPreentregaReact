import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductsContext";
import Spinner from "../../components/Spinner";
import "./ProductCard.css";

const ProductCard = () => {
  const { itemId } = useParams();  
  const { addToCart } = useCart();
  const { products } = useProducts();
  const [prod, setProd] = useState({});
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const product = products.find((product) => product.idFirestore === itemId);
    if (product) {
      setProd(product);
    } else {
      console.log("Producto no encontrado");
    }
    setLoading(false);
  }, [itemId, products]);

  const handleAddToCart = () => {
    addToCart({ ...prod, quantity, totalPrice: prod.price * quantity });
    setIsAdded(true);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="body">
      {loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <div className="imgBx">
            <img src={prod.imageUrl} alt={prod.title || "Producto"} />
          </div>
          <div className="details">
            <div className="content">
              <h2>{prod.title || "Sin título"}</h2>
              <p>{prod.description || "Sin descripción"}</p>
              <h3>
                {prod.price ? `$${prod.price.toLocaleString()} ARS` : "Precio no disponible"}
              </h3>

              <div className="quantity-container">
                <label htmlFor="quantity" className="quantity-label">Cantidad</label>
                <div className="quantity-controls">
                  <button onClick={decreaseQuantity} className="quantity-btn" aria-label="Disminuir cantidad">-</button>
                  <span id="quantity" className="quantity">{quantity}</span>
                  <button onClick={increaseQuantity} className="quantity-btn" aria-label="Aumentar cantidad">+</button>
                </div>
              </div>

              <div className="button-animation-container" aria-live="polite">
                <div className={`btn-wrapper ${isAdded ? "add" : ""}`}>
                  <button
                    className="add-to-cart buttonCart"
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    aria-label={isAdded ? "Producto agregado al carrito" : "Agregar al carrito"}
                  >
                    <span className="btn-text">{isAdded ? "Agregado" : "Agregar al carrito"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
