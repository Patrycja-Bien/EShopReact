import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import Products from './screens/Products';
import Cart from './screens/Cart';
import OrderSummary from './screens/OrderSummary';
import { FC } from 'react';
import { useCart } from './components/CartContext';
import OrderConfirmation from './screens/OrderConfirmation';

const AppInner: FC = () => {
  const location = useLocation();
  const isProds = location.pathname === '/';
  const isCart = location.pathname === '/cart';
  const isOrderSum = location.pathname === '/ordersum';
  const isOrderConf = location.pathname === '/orderconf';
  const { cart } = useCart();

  return (
    <>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/ordersum" element={<OrderSummary />} />
        <Route path="/orderconf" element={<OrderConfirmation />} />
      </Routes>
    <nav>
      {(!isOrderSum && !isProds) && (
        <Link to="/">Produkty</Link>
      )}
      
      {!isCart && (
        <Link to="/cart">
          {isOrderSum || isOrderConf ? 'Powrót do koszyka' : 'Koszyk'}
        </Link>
      )}

      {isCart && (
        cart.length > 0 ? (
          <Link to="/ordersum">Podsumowanie zamówienia</Link>
        ) : (
          <span style={{ color: '#aaa' }}>Podsumowanie zamówienia</span>
        )
      )}
    </nav>
    </>
  );
};

const App: FC = () => {
  return (
    <CartProvider>
      <Router>
        <AppInner />
      </Router>
    </CartProvider>
  );
};

export default App;
