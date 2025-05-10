import { useCart } from '../components/CartContext';
import CartTable from '../components/CartTable';

const Cart: React.FC = () => {
  const { cart } = useCart();

  return (
    <div>
      <h1>Koszyk</h1>
      {cart.length === 0 ? (
        <p>Koszyk jest pusty.</p>
      ) : (
        <CartTable cartItems={cart} editable={true} />
      )}
    </div>
  );
};

export default Cart;
