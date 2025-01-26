import React from 'react';
import { IoCart } from "react-icons/io5";
import './CartWidget.css'; // Asegúrate de tener el archivo CSS para el estilo

const CartWidget = () => {
  return (
    <div className="cart-widget">
      <IoCart size={30} /> 
    </div>
  );
}

export default CartWidget;
