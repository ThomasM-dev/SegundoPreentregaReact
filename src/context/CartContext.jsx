import React, { createContext, useReducer, useContext } from "react";

const initialState = [];

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const productIndex = state.findIndex((item) => item.id === action.payload.id);

      if (productIndex !== -1) {
        
        const updatedCart = [...state];
        updatedCart[productIndex].quantity += action.payload.quantity;
        updatedCart[productIndex].totalPrice = updatedCart[productIndex].price * updatedCart[productIndex].quantity;
        return updatedCart;
      } else {
        
        return [
          ...state,
          { ...action.payload, totalPrice: action.payload.price * action.payload.quantity }
        ];
      }

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    console.error("🚨 useCart se está usando fuera de CartProvider!");
    return {};
  }
  return context;
};
