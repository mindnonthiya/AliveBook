import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  addToCart,
  clearCart,
  decreaseQuantity,
  removeFromCart,
  selectCart,
} from '../store/bookSlice';
import type { AppDispatch } from '../store';
import { ArrowRightIcon, CartIcon, TrashIcon } from './icons';

const fallbackCover =
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80';

const Orders: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector(selectCart);

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0),
    [cart],
  );

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  return (
    <div className="orders-page">
      <section className="section-heading">
        <div>
          <span className="section-eyebrow">Order summary</span>
          <h1 className="page-title">A cleaner checkout view with clearer quantity controls.</h1>
          <p className="muted">Minimal rows, quieter visuals, and a more compact summary than the previous design.</p>
        </div>
        <div className="section-actions">
          <Link to="/" className="button button--secondary">
            Keep browsing
          </Link>
          {cart.length > 0 ? (
            <button className="button button--ghost" onClick={() => dispatch(clearCart())}>
              Clear all
            </button>
          ) : null}
        </div>
      </section>

      {cart.length === 0 ? (
        <div className="empty-state">Your cart is empty. Add books from the home page first.</div>
      ) : (
        <div className="orders-layout orders-layout--refined">
          <section className="order-list surface">
            {cart.map((item) => (
              <article key={item.id} className="order-line">
                <div className="order-line__media">
                  <img src={item.image_url || fallbackCover} alt={item.bookname} />
                </div>
                <div className="order-line__content">
                  <div>
                    <h2 className="order-line__title">{item.bookname}</h2>
                    <p className="muted">{item.ISBN}</p>
                  </div>
                  <div className="order-line__controls">
                    <button className="quantity-button" onClick={() => dispatch(decreaseQuantity(item.id))}>
                      −
                    </button>
                    <span className="quantity-pill">{item.quantity}</span>
                    <button className="quantity-button" onClick={() => dispatch(addToCart(item))}>
                      +
                    </button>
                  </div>
                </div>
                <div className="order-line__aside">
                  <strong className="price-tag">${(Number(item.price) * item.quantity).toFixed(2)}</strong>
                  <button className="icon-action icon-action--danger" onClick={() => dispatch(removeFromCart(item.id))}>
                    <TrashIcon className="app-icon" />
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="checkout-card checkout-card--refined">
            <span className="section-eyebrow">Receipt</span>
            <h3>Quiet summary panel</h3>
            <div className="summary-list">
              <div className="summary-list__item">
                <span className="muted">Line items</span>
                <strong>{cart.length}</strong>
              </div>
              <div className="summary-list__item">
                <span className="muted">Books in cart</span>
                <strong>{totalItems}</strong>
              </div>
              <div className="summary-list__item">
                <span className="muted">Subtotal</span>
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
            </div>

            <div className="checkout-card__meta">
              <span className="badge badge--neutral">
                <CartIcon className="app-icon" />
                Review complete
              </span>
            </div>

            <button
              className="button button--dark button--wide"
              onClick={() => window.alert('Checkout flow placeholder: connect a real order or payment API next.')}
            >
              Continue
              <ArrowRightIcon className="button__icon" />
            </button>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Orders;
