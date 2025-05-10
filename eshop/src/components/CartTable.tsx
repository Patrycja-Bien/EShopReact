import React from 'react';
import { CartItem, useCart } from './CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

type Props = {
  cartItems: CartItem[];
  editable?: boolean;
};

const CartTable: React.FC<Props> = ({ cartItems, editable = false }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const getItemTotal = (item: CartItem): number => {
    return item.quantity * (item.price.main + item.price.fractional / 100);
  };

  const getCartTotal = (): string => {
    const total = cartItems.reduce((sum, item) => sum + getItemTotal(item), 0);
    return total.toFixed(2);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Produkt</th>
          <th>Cena</th>
          <th>Ilość</th>
          <th>Suma</th>
          {editable && <FontAwesomeIcon icon={faTrashCan}/>}
        </tr>
      </thead>
      <tbody>
        {cartItems.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.price.main}.{item.price.fractional} zł</td>
            <td>
              {editable ? (
                <>
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  {' '}{item.quantity}{' '}
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </>
              ) : (
                item.quantity
              )}
            </td>
            <td>{getItemTotal(item).toFixed(2)} zł</td>
            {editable && (
              <td>
                <button onClick={() => removeFromCart(item.id)}>🗑 Usuń</button>
              </td>
            )}
          </tr>
        ))}
        <tr>
          <td colSpan={3}><strong>Łącznie:</strong></td>
          <td><strong>{getCartTotal()} zł</strong></td>
          {editable && <td />}
        </tr>
      </tbody>
    </table>
  );
};

export default CartTable;