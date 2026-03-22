import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  addToCart,
  fetchBooks,
  likeBook,
  removeFromCart,
  selectBooks,
  selectCart,
  selectError,
  selectFavorites,
  selectLoading,
} from '../store/bookSlice';
import { type AppDispatch } from '../store';

const fallbackCover =
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector(selectBooks);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const cart = useSelector(selectCart);
  const favorites = useSelector(selectFavorites);
  const [showCart, setShowCart] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.price) * (item.quantity || 1), 0),
    [cart],
  );

  const favoriteBooks = useMemo(
    () => books.filter((book) => favorites.includes(book.id)),
    [books, favorites],
  );

  return (
    <div>
      <section className="hero">
        <article className="surface hero-card">
          <span className="section-eyebrow">Curated reading experience</span>
          <h1>Minimal bookstore UI that feels premium and calm.</h1>
          <p>
            Browse titles, save favorites, build an order, and manage the catalog from a cleaner
            interface that now looks consistent across the whole project.
          </p>

          <div className="hero-actions">
            <Link to="/books/new" className="button button--primary">
              Add a new title
            </Link>
            <Link to="/books/list" className="button button--secondary">
              Open admin library
            </Link>
          </div>
        </article>

        <aside className="metric-grid">
          <div className="metric-card">
            <span className="metric-card__label">Titles in catalog</span>
            <div className="metric-card__value">{books.length}</div>
          </div>
          <div className="metric-card">
            <span className="metric-card__label">Favorites saved</span>
            <div className="metric-card__value">{favorites.length}</div>
          </div>
          <div className="metric-card">
            <span className="metric-card__label">Items in cart</span>
            <div className="metric-card__value">{cart.reduce((sum, item) => sum + item.quantity, 0)}</div>
          </div>
          <div className="metric-card">
            <span className="metric-card__label">Cart total</span>
            <div className="metric-card__value">${totalPrice.toFixed(2)}</div>
          </div>
        </aside>
      </section>

      <section className="section-heading">
        <div>
          <span className="section-eyebrow">Quick overview</span>
          <h2>Storefront status</h2>
        </div>

        <div className="section-actions">
          <button className="button button--ghost" onClick={() => setShowCart((value) => !value)}>
            {showCart ? 'Hide cart panel' : 'Show cart panel'}
          </button>
          <button
            className="button button--ghost"
            onClick={() => setShowFavorites((value) => !value)}
          >
            {showFavorites ? 'Hide favorites' : 'Show favorites'}
          </button>
        </div>
      </section>

      <div className="hero" style={{ marginTop: 0 }}>
        <div className="panel-stack">
          {showCart ? (
            <section className="panel">
              <div className="price-row">
                <div>
                  <span className="section-eyebrow">Cart snapshot</span>
                  <h3 style={{ margin: '0.25rem 0 0' }}>Ready for checkout</h3>
                </div>
                <span className="badge badge--accent">{cart.length} unique items</span>
              </div>

              {cart.length === 0 ? (
                <div className="empty-state" style={{ marginTop: '1rem' }}>
                  Add some books to start your order.
                </div>
              ) : (
                <ul style={{ marginTop: '1rem' }}>
                  {cart.map((book) => (
                    <li key={book.id}>
                      <div className="price-row">
                        <div>
                          <strong>{book.bookname}</strong>
                          <div className="muted">
                            ${Number(book.price).toFixed(2)} × {book.quantity}
                          </div>
                        </div>
                        <button
                          className="button button--danger"
                          onClick={() => dispatch(removeFromCart(book.id))}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ) : null}

          {showFavorites ? (
            <section className="panel">
              <div className="price-row">
                <div>
                  <span className="section-eyebrow">Favorites</span>
                  <h3 style={{ margin: '0.25rem 0 0' }}>Saved inspiration</h3>
                </div>
                <span className="badge badge--favorite">{favoriteBooks.length} liked</span>
              </div>

              {favoriteBooks.length === 0 ? (
                <div className="empty-state" style={{ marginTop: '1rem' }}>
                  Tap the heart on any title to collect favorites.
                </div>
              ) : (
                <ul style={{ marginTop: '1rem' }}>
                  {favoriteBooks.map((book) => (
                    <li key={book.id}>
                      <div>
                        <strong>{book.bookname}</strong>
                        <div className="muted">${Number(book.price).toFixed(2)}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ) : null}
        </div>

        <section className="surface hero-card">
          <span className="section-eyebrow">Design direction</span>
          <h3 style={{ margin: '0.3rem 0 0', fontSize: '1.8rem', letterSpacing: '-0.04em' }}>
            Airy spacing, soft cards, clear typography.
          </h3>
          <p>
            The updated interface keeps actions visible, reduces noisy colors, and gives each page a
            more refined editorial feel.
          </p>
          <div className="pill-row" style={{ marginTop: '1rem' }}>
            <span className="badge badge--neutral">Glassmorphism surfaces</span>
            <span className="badge badge--neutral">Responsive cards</span>
            <span className="badge badge--neutral">Consistent action buttons</span>
          </div>
        </section>
      </div>

      <section className="section-heading">
        <div>
          <span className="section-eyebrow">Collection</span>
          <h2>Featured catalog</h2>
        </div>
      </section>

      {loading ? <div className="empty-state">Loading books…</div> : null}
      {error ? <div className="empty-state">{error}</div> : null}
      {!loading && !error && books.length === 0 ? (
        <div className="empty-state">No books found yet. Add your first title from the admin area.</div>
      ) : null}

      <div className="book-grid">
        {books.map((book) => {
          const isFavorite = favorites.includes(book.id);

          return (
            <article className="book-card" key={book.id}>
              <div className="book-card__media">
                <img src={book.image_url || fallbackCover} alt={book.bookname} />
              </div>
              <div className="book-card__body">
                <div className="pill-row">
                  <span className="badge badge--accent">Book #{book.id}</span>
                  {isFavorite ? <span className="badge badge--favorite">Liked</span> : null}
                </div>

                <h3 className="book-card__title" style={{ marginTop: '0.9rem' }}>
                  {book.bookname}
                </h3>
                <p className="muted" style={{ marginTop: '0.35rem' }}>
                  {book.ISBN}
                </p>

                <div className="price-row" style={{ marginTop: '1rem' }}>
                  <span className="price-tag">${Number(book.price).toFixed(2)}</span>
                  <button
                    className={`icon-button ${isFavorite ? 'icon-button--active' : ''}`}
                    onClick={() => dispatch(likeBook(book.id))}
                    aria-label={isFavorite ? `Unlike ${book.bookname}` : `Like ${book.bookname}`}
                    title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    ♥
                  </button>
                </div>

                <div className="form-actions" style={{ marginTop: '1rem' }}>
                  <button className="button button--primary" onClick={() => dispatch(addToCart(book))}>
                    Add to cart
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
