import React from 'react';
import './ItemListContainer.css'; 

const ItemListContainer = ({ children }) => { 
  
  return (
    <div className="item-list-container">
      <h1>{children}</h1> 
    </div>
  );
};

export default ItemListContainer;
