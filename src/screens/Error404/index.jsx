import React from 'react';
import './Error404.css';

const Error404 = () => {
  return (
    <div className="error-404-container">
      <div className="error-content">
        <h1 className="error-number">404</h1>
        <h2 className="error-title">¡Oops! Página no encontrada</h2>
        <p className="error-message">
          Parece que nos hemos perdido en el espacio digital. 
          La página que buscas no existe o se ha movido a otra galaxia.
        </p>
        <a href="/" className="error-button">
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default Error404;