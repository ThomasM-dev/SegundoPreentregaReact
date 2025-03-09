import React, { createContext, useReducer, useContext } from "react";

const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { id, price, quantity = 1 } = action.payload; 
      const existingItemIndex = state.items.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        
        const updatedItems = state.items.map((item, index) => {
          if (index === existingItemIndex) {
            const newQuantity = item.quantity + quantity;
            return {
              ...item,
              quantity: newQuantity,
              totalPrice: price * newQuantity,
            };
          }
          return item;
        });

        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + quantity,
          totalAmount: state.totalAmount + price * quantity,
        };
      } else {
        
        const newItem = {
          ...action.payload,
          quantity,
          totalPrice: price * quantity,
        };
        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + quantity,
          totalAmount: state.totalAmount + price * quantity,
        };
      }
    }

    case "REMOVE_FROM_CART": {
      const itemToRemove = state.items.find((item) => item.id === action.payload);
      if (!itemToRemove) return state;

      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        totalItems: state.totalItems - itemToRemove.quantity,
        totalAmount: state.totalAmount - itemToRemove.totalPrice,
      };
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);

      if (itemIndex === -1 || quantity < 0) return state;

      const updatedItems = state.items.map((item, index) => {
        if (index === itemIndex) {
          return {
            ...item,
            quantity,
            totalPrice: item.price * quantity,
          };
        }
        return item;
      });

      const newTotalItems = state.totalItems + (quantity - state.items[itemIndex].quantity);
      const newTotalAmount = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);

      return {
        ...state,
        items: updatedItems,
        totalItems: newTotalItems,
        totalAmount: newTotalAmount,
      };
    }

    case "CLEAR_CART":
      return initialState;

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

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  
  const value = {
    cart: cart.items, 
    totalItems: cart.totalItems,
    totalAmount: cart.totalAmount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    dispatch, 
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};


export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};