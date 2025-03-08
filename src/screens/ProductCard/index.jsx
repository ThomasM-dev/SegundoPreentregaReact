import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import products from "../../data/products.json";
import "./ProductCard.css";

const ProductCard = () => {
  const { itemId } = useParams();
  const { addToCart } = useCart();
  const [prod, setProd] = useState({});
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const product = products.products.find((p) => p.id === Number(itemId));
    if (product) setProd(product);
  }, [itemId]);

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
      <div className="container">
        <div className="imgBx">
          <img src={prod.imageUrl} alt={prod.title || "Producto"} />
        </div>
        <div className="details">
          <div className="content">
            <h2>{prod.title || "Sin título"}</h2>
            <p>{prod.description || "Sin descripción"}</p>
            <h3>
              {prod.price
                ? `$${prod.price.toLocaleString()} ARS`
                : "Precio no disponible"}
            </h3>

            <div className="quantity-container">
              <label htmlFor="quantity" className="quantity-label">
                Cantidad
              </label>
              <div className="quantity-controls">
                <button
                  onClick={decreaseQuantity}
                  className="quantity-btn"
                  aria-label="Disminuir cantidad"
                >
                  -
                </button>
                <span id="quantity" className="quantity">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  className="quantity-btn"
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>
            </div>

            <div className="button-animation-container" aria-live="polite">
              <div className={`btn-wrapper ${isAdded ? "add" : ""}`}>
                <button
                  className="add-to-cart buttonCart"
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  aria-label={
                    isAdded
                      ? "Producto agregado al carrito"
                      : "Agregar al carrito"
                  }
                >
                  <span className="btn-text">
                    {isAdded ? "Agregado" : "Agregar al carrito"}
                  </span>
                </button>

                <svg
                  className="icon-loader-check"
                  x="0px"
                  y="0px"
                  width="471.197px"
                  height="471.197px"
                  viewBox="0 0 510 510"
                  overflow="inherit"
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden="true"
                >
                  <g id="loader">
                    <circle
                      className="circle"
                      fill="transparent"
                      stroke="#41BD59"
                      strokeWidth="48"
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                      cx="250"
                      cy="250"
                      r="212.599"
                    />
                    <polyline
                      className="check"
                      fill="none"
                      stroke="#41BD59"
                      strokeWidth="32"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="227.599,322.099 290.599,259.099 180.599,149.099"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
