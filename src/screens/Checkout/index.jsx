import React, { useState } from 'react';
import { db } from '../../config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import './Checkout.css';

const Checkout = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: ''
  });
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

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

    try {
      const order = {
        buyer: {
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email
        },
        date: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, 'orders'), order);
      setOrderId(docRef.id);
      
      setFormData({
        nombre: '',
        apellido: '',
        email: ''
      });
    } catch (error) {
      console.error('Error al crear la orden:', error);
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <div className="checkout-container">
        <h2 className="checkout-text">
          Gracias por tu compra!<br />
          Tu orden es: {orderId}
        </h2>
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