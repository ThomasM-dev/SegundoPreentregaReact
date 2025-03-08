import React from "react";
import { useCart } from "../../context/CartContext";
import "./Cart.css";
import { MdDelete } from "react-icons/md";


const Cart = () => {
  const { cart, dispatch } = useCart();
  console.log(cart);
  
  const total = cart.reduce((sum, product) => sum + product.totalPrice, 0);

  return (
    <div className="cart-page">
      <h2 className="cart-header">Carrito de Compras</h2>
      <div className="product-list">
        {cart.length > 0 ? (
          cart.map((product) => (
            <div key={product.id} className="product">
              <img src={product.imageUrl} className="imgProduct" alt={`Imagen del producto ${product.title}`} />
              <span className="product-name">{product.title}</span>
              <span className="product-price">${product.totalPrice.toFixed(2)}</span>
              <span>{product.quantity}</span>
              <button 
                className="remove-btn" 
                onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: product.id })}
              >
                <MdDelete />
              </button>
            </div>
          ))
        ) : (
          <p>Tu carrito está vacío</p>
        )}
      </div>
      <div className="total">
        <span>Total:</span>
        <span className="total-price">${total.toFixed(2)}</span>
      </div>
      {cart.length > 0 && (
        <button className="clear-cart" onClick={() => dispatch({ type: "CLEAR_CART" })}>
          Vaciar carrito
        </button>
      )}
    </div>
  );
};

export default Cart;
