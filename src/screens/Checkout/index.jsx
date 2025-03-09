import React, { useState } from 'react';
import { collection, addDoc, getDoc, updateDoc, getFirestore, doc } from 'firebase/firestore';
import './Checkout.css';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductsContext';

const Checkout = () => {
  const { cart, dispatch } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();
  const db = getFirestore();
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: ''
  });
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  const reducerStock = async (itemId, cantidadComprada) => {
    try {
      const productoRef = doc(db, 'productos', itemId);
      const productoDoc = await getDoc(productoRef);
      
      if (productoDoc.exists()) {
        const producto = productoDoc.data();
        const stockActual = producto.stock;
        console.log(stockActual);
        
        if (stockActual >= cantidadComprada) {
          const nuevoStock = stockActual - cantidadComprada;
          await updateDoc(productoRef, { stock: nuevoStock });
        } else {
          console.error('No hay suficiente stock para completar la compra.');
        }
      } else {
        console.error('El producto no existe en la base de datos.');
      }
    } catch (error) {
      console.error('Error al reducir el stock:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (cart.length === 0) {
      alert("Tu carrito está vacío");
      setLoading(false);
      return;
    }

    try {
      const order = {
        buyer: formData,
        items: cart,
        date: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, 'orders'), order);
      setOrderId(docRef.id);

      for (let item of cart) {
        await reducerStock(item.idFirestore, item.quantity);
      }

      setFormData({ nombre: '', apellido: '', email: '' });

    } catch (error) {
      console.error('Error al crear la orden:', error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_CART" });
        navigate('/');
      }, 4500);
    }
  };

  if (orderId) {
    return (
      <div className="checkout-container container-orders">
        <h2 className="checkout-text">
          ¡Gracias por tu compra!<br />
          Tu orden es: {orderId}
        </h2>
        <h3>Detalles de la Orden:</h3>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <p><strong>Producto:</strong> {item.title}</p>
              <p><strong>Precio Unitario:</strong> ${item.price}</p>
              <p><strong>Cantidad:</strong> {item.quantity}</p>
              <p><strong>Total:</strong> ${item.totalPrice}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-text">Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="checkout-input"
          required
        />
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          placeholder="Apellido"
          className="checkout-input"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="checkout-input"
          required
        />
        <button 
          type="submit" 
          className="checkout-button"
          disabled={loading}
        >
          {loading ? 'Procesando...' : 'Finalizar Compra'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
