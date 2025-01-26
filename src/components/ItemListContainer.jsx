import React from 'react';
import './ItemListContainer.css'; // Importamos el archivo CSS

const ItemListContainer = ({ children }) => { 
  return (
    <div className="item-list-container">
      <h1>{children}</h1> 
    </div>
  );
};

export default ItemListContainer;
