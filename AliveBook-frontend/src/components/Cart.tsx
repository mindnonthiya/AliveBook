import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectCart } from '../store/bookSlice';
import { type AppDispatch } from '../store';

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector(selectCart);

  if (cart.length === 0) {
    return <div className="empty-state">Your cart is empty.</div>;
  }

  return (
    <div className="order-grid">
      {cart.map((item) => (
        <article key={item.id} className="order-card">
          <div className="order-card__body">
            <span className="badge badge--neutral">Qty {item.quantity}</span>
            <h3 className="order-card__title" style={{ marginTop: '0.85rem' }}>
              {item.bookname}
            </h3>
            <p className="muted">{item.ISBN}</p>
            <div className="order-summary-row" style={{ marginTop: '1rem' }}>
              <strong>${Number(item.price).toFixed(2)}</strong>
              <button className="button button--success" onClick={() => dispatch(addToCart(item))}>
                Add one more
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Cart;
