import React from 'react';
import CartWidget from './CartWidget'; 
import './NavBar.css'; 

const NavBar = () => {
  return (
    <nav>
      <div className="logo">
        <img src="/logoTienda.png" alt="Logo" />
      </div>
      <ul className="nav-links">
        <li><a href="/">Inicio</a></li>
        <li><a href="/productos">Productos</a></li>
        <li><a href="/contacto">Contacto</a></li>
      </ul>
      <CartWidget />
    </nav>
  );
};

export default NavBar;
