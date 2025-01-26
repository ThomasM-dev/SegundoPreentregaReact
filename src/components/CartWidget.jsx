import React from 'react';
import { IoCart } from "react-icons/io5";
import './CartWidget.css'; 

const CartWidget = () => {
  return (
    <div className="cart-widget">
      <IoCart size={30} /> 
    </div>
  );
}

export default CartWidget;
