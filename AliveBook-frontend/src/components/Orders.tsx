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
    <div>
      <section className="section-heading orders-header">
        <div>
          <span className="section-eyebrow">Order flow</span>
          <h1>Your book order summary</h1>
          <p className="muted">Adjust quantities, review totals, and keep the checkout view tidy.</p>
        </div>
        <div className="section-actions">
          <Link to="/" className="button button--secondary">
            Back to store
          </Link>
          {cart.length > 0 ? (
            <button className="button button--ghost" onClick={() => dispatch(clearCart())}>
              Clear cart
            </button>
          ) : null}
        </div>
      </section>

      {cart.length === 0 ? (
        <div className="empty-state">
          Your cart is empty. Head back to the storefront and add a few titles first.
        </div>
      ) : (
        <div className="orders-layout">
          <section className="order-grid">
            {cart.map((item) => (
              <article key={item.id} className="order-card">
                <div className="order-card__media">
                  <img src={item.image_url || fallbackCover} alt={item.bookname} />
                </div>
                <div className="order-card__body">
                  <div className="pill-row">
                    <span className="badge badge--neutral">Qty {item.quantity}</span>
                  </div>

                  <h2 className="order-card__title" style={{ marginTop: '0.9rem' }}>
                    {item.bookname}
                  </h2>
                  <p className="muted" style={{ marginTop: '0.35rem' }}>
                    {item.ISBN}
                  </p>

                  <div className="order-summary-row" style={{ marginTop: '1rem' }}>
                    <span className="price-tag">${Number(item.price).toFixed(2)}</span>
                    <strong>${(Number(item.price) * item.quantity).toFixed(2)}</strong>
                  </div>

                  <div className="order-actions" style={{ marginTop: '1rem' }}>
                    <button className="quantity-button" onClick={() => dispatch(decreaseQuantity(item.id))}>
                      −
                    </button>
                    <button className="quantity-button" onClick={() => dispatch(addToCart(item))}>
                      +
                    </button>
                    <button className="button button--danger" onClick={() => dispatch(removeFromCart(item.id))}>
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="checkout-card">
            <span className="section-eyebrow">Checkout overview</span>
            <h3 style={{ margin: '0.25rem 0 0', fontSize: '1.6rem', letterSpacing: '-0.04em' }}>
              Calm, readable totals
            </h3>

            <div className="summary-list">
              <div className="summary-list__item">
                <span className="muted">Unique titles</span>
                <strong>{cart.length}</strong>
              </div>
              <div className="summary-list__item">
                <span className="muted">Total quantity</span>
                <strong>{totalItems}</strong>
              </div>
              <div className="summary-list__item">
                <span className="muted">Estimated subtotal</span>
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
            </div>

            <div className="form-actions" style={{ marginTop: '1.25rem' }}>
              <button
                className="button button--primary"
                onClick={() => window.alert('Checkout flow placeholder: connect payment or order API next.')}
              >
                Proceed to checkout
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Orders;
