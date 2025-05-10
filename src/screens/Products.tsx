import React, { useState, useEffect } from 'react';
import products from '../components/products.json';
import { useCart } from '../components/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

type Product = {
  id: number;
  name: string;
  price: {
    main: number;
    fractional: number;
  };
};

const Products: React.FC = () => {
  const { addToCart } = useCart();
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = (product: Product) => {
    addToCart(product);
    setShowAlert(true);
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <div>
      <h1>Produkty</h1>

      <div className={`alert ${showAlert ? '' : 'hide'}`}>
        Dodano do koszyka!
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nazwa</th>
            <th>Cena</th>
            <th><FontAwesomeIcon icon={faCartArrowDown} /></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price.main}.{product.price.fractional} zł</td>
              <td>
                <button onClick={() => handleClick(product)}>
                  Dodaj do koszyka
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
