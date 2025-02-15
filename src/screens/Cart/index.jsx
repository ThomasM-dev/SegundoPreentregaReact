import React from 'react';
import './Cart.css'; 
const Cart = () => {
  
  const products = [
    { id: 1, name: 'Producto 1', price: 20.99 },
    { id: 2, name: 'Producto 2', price: 15.49 },
    { id: 3, name: 'Producto 3', price: 10.00 },
  ];

  
  const total = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <>
    <div className="cart-page">
      <h2 className="cart-header">Carrito de Compras</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product">
            <span className="product-name">{product.name}</span>
            <span className="product-price">${product.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="total">
        <span>Total:</span>
        <span className="total-price">${total.toFixed(2)}</span>
      </div>
    </div>
    </>
  );
};

export default Cart;