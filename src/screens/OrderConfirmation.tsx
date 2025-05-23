import React, { useEffect, useState } from 'react';
import { useCart, CartItem } from '../components/CartContext';
import CartTable from '../components/CartTable';
import { useLocation } from 'react-router-dom';

const OrderConfirmation: React.FC = () => {
  const { clearCart } = useCart();
  const [orderItems, setOrderItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<string>('0.00');
  const location = useLocation();

  useEffect(() => {
    const data = localStorage.getItem('orderData');
    if (data) {
      const parsed = JSON.parse(data);
      setOrderItems(parsed.products);
      setTotal(parsed.total.toFixed(2));
      localStorage.removeItem('orderData');
    }
  }, []);

  useEffect(() => {
    return () => {
      if (location.pathname === '/orderconf') {
        clearCart();
      }
    };
  }, [location]);

  return (
    <div>
      <h1>Potwierdzenie zamówienia</h1>
      <p>Dziękujemy za złożenie zamówienia!</p>
      <CartTable cartItems={orderItems} editable={false} />
    </div>
  );
};

export default OrderConfirmation;
