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
import { ArrowRightIcon, CartIcon, HeartIcon, PlusIcon, SparklesIcon } from './icons';

const fallbackCover =
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector(selectBooks);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const cart = useSelector(selectCart);
  const favorites = useSelector(selectFavorites);
  const [activePanel, setActivePanel] = useState<'cart' | 'favorites' | null>('cart');

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

  const featuredBook = books[0];
  const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="home-layout">
      <section className="hero-panel surface surface--hero">
        <div className="hero-copy">
          <span className="section-eyebrow">Refined reading experience</span>
          <h1>A sharper, cleaner bookstore UI with icon-first actions.</h1>
          <p>
            This version leans more editorial: spacious layout, quiet colors, stronger hierarchy,
            and quick actions for favorites and cart using icons instead of text-heavy controls.
          </p>

          <div className="hero-actions">
            <Link to="/books/new" className="button button--primary">
              <PlusIcon className="button__icon" />
              Add title
            </Link>
            <Link to="/books/list" className="button button--secondary">
              Open admin
              <ArrowRightIcon className="button__icon" />
            </Link>
          </div>
        </div>

        <div className="hero-showcase">
          <div className="hero-note-card">
            <span className="note-chip">
              <SparklesIcon className="app-icon" />
              Minimal refresh
            </span>
            <div className="stats-stack">
              <div className="stats-item">
                <span className="muted">Books</span>
                <strong>{books.length}</strong>
              </div>
              <div className="stats-item">
                <span className="muted">Favorites</span>
                <strong>{favorites.length}</strong>
              </div>
              <div className="stats-item">
                <span className="muted">Cart items</span>
                <strong>{cartQuantity}</strong>
              </div>
              <div className="stats-item">
                <span className="muted">Subtotal</span>
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
            </div>
          </div>

          {featuredBook ? (
            <article className="featured-card">
              <div className="featured-card__image">
                <img src={featuredBook.image_url || fallbackCover} alt={featuredBook.bookname} />
              </div>
              <div className="featured-card__body">
                <span className="section-eyebrow">Featured today</span>
                <h2>{featuredBook.bookname}</h2>
                <p className="muted">{featuredBook.ISBN}</p>
                <div className="price-row" style={{ marginTop: '1rem' }}>
                  <span className="price-tag">${Number(featuredBook.price).toFixed(2)}</span>
                  <button className="button button--dark" onClick={() => dispatch(addToCart(featuredBook))}>
                    Quick add
                  </button>
                </div>
              </div>
            </article>
          ) : null}
        </div>
      </section>

      <section className="utility-dock surface">
        <div>
          <span className="section-eyebrow">Quick utilities</span>
          <h2>Favorites and cart now use icons</h2>
        </div>

        <div className="dock-actions">
          <button
            className={`dock-button ${activePanel === 'favorites' ? 'dock-button--active' : ''}`}
            onClick={() => setActivePanel(activePanel === 'favorites' ? null : 'favorites')}
            aria-label="Toggle favorites panel"
          >
            <HeartIcon className="app-icon" />
            <span>{favoriteBooks.length}</span>
          </button>
          <button
            className={`dock-button ${activePanel === 'cart' ? 'dock-button--active' : ''}`}
            onClick={() => setActivePanel(activePanel === 'cart' ? null : 'cart')}
            aria-label="Toggle cart panel"
          >
            <CartIcon className="app-icon" />
            <span>{cartQuantity}</span>
          </button>
        </div>
      </section>

      {activePanel ? (
        <section className="floating-panel surface">
          <div className="panel-header">
            <div>
              <span className="section-eyebrow">{activePanel === 'cart' ? 'Cart' : 'Favorites'}</span>
              <h3>{activePanel === 'cart' ? 'Current order' : 'Saved picks'}</h3>
            </div>
            <button className="button button--ghost" onClick={() => setActivePanel(null)}>
              Close
            </button>
          </div>

          {activePanel === 'cart' ? (
            cart.length === 0 ? (
              <div className="empty-state">Your cart is empty for now.</div>
            ) : (
              <div className="list-stack">
                {cart.map((book) => (
                  <div key={book.id} className="list-row">
                    <div>
                      <strong>{book.bookname}</strong>
                      <p className="muted">${Number(book.price).toFixed(2)} × {book.quantity}</p>
                    </div>
                    <button className="icon-action icon-action--danger" onClick={() => dispatch(removeFromCart(book.id))}>
                      <CartIcon className="app-icon" />
                    </button>
                  </div>
                ))}
              </div>
            )
          ) : favoriteBooks.length === 0 ? (
            <div className="empty-state">No favorites yet. Tap the heart icon on a book card.</div>
          ) : (
            <div className="list-stack">
              {favoriteBooks.map((book) => (
                <div key={book.id} className="list-row">
                  <div>
                    <strong>{book.bookname}</strong>
                    <p className="muted">${Number(book.price).toFixed(2)}</p>
                  </div>
                  <span className="badge badge--neutral">Saved</span>
                </div>
              ))}
            </div>
          )}
        </section>
      ) : null}

      <section className="section-heading section-heading--compact">
        <div>
          <span className="section-eyebrow">Collection</span>
          <h2>Browse the shelf</h2>
        </div>
      </section>

      {loading ? <div className="empty-state">Loading books…</div> : null}
      {error ? <div className="empty-state">{error}</div> : null}
      {!loading && !error && books.length === 0 ? (
        <div className="empty-state">No books found yet. Add your first title from the admin page.</div>
      ) : null}

      <div className="book-grid book-grid--editorial">
        {books.map((book) => {
          const isFavorite = favorites.includes(book.id);

          return (
            <article className="book-card book-card--editorial" key={book.id}>
              <div className="book-card__media book-card__media--tall">
                <img src={book.image_url || fallbackCover} alt={book.bookname} />
              </div>
              <div className="book-card__body">
                <div className="card-topline">
                  <span className="section-eyebrow">Book #{book.id}</span>
                  <div className="card-icon-actions">
                    <button
                      className={`icon-action ${isFavorite ? 'icon-action--active' : ''}`}
                      onClick={() => dispatch(likeBook(book.id))}
                      aria-label={isFavorite ? `Remove ${book.bookname} from favorites` : `Add ${book.bookname} to favorites`}
                      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <HeartIcon className="app-icon" />
                    </button>
                    <button
                      className="icon-action icon-action--dark"
                      onClick={() => dispatch(addToCart(book))}
                      aria-label={`Add ${book.bookname} to cart`}
                      title="Add to cart"
                    >
                      <CartIcon className="app-icon" />
                    </button>
                  </div>
                </div>

                <h3 className="book-card__title">{book.bookname}</h3>
                <p className="muted">{book.ISBN}</p>
                <div className="price-row" style={{ marginTop: '1rem' }}>
                  <span className="price-tag">${Number(book.price).toFixed(2)}</span>
                  {isFavorite ? <span className="badge badge--favorite">Favorite</span> : null}
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
