import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Orders from './Orders';
import BookForm from './BookForm';
import BookList from './BookList';
import { selectCart, selectFavorites } from '../store/bookSlice';
import { BookIcon, CartIcon, DashboardIcon, HeartIcon } from './icons';

const links = [
  { to: '/', label: 'Store', end: true },
  { to: '/orders', label: 'My Orders' },
  { to: '/books/list', label: 'Admin Catalog' },
  { to: '/books/new', label: 'New Entry' },
];

const RoutingApp: React.FC = () => {
  const cart = useSelector(selectCart);
  const favorites = useSelector(selectFavorites);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="site-header">
          <div className="container site-header__inner">
            <Link to="/" className="brand brand--interactive">
              <span className="brand-mark">
                <BookIcon className="app-icon" />
              </span>
              <span className="brand-copy">
                <span className="brand__title">AliveBook</span>
                <span className="brand__caption">Storefront for readers, separate tools for admins.</span>
              </span>
            </Link>

            <nav className="site-nav" aria-label="Main navigation">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `site-nav__link ${isActive ? 'site-nav__link--active' : ''}`.trim()
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="header-actions" aria-label="Quick stats and shortcuts">
              <Link to="/" className="header-icon-link" title="Favorites saved">
                <HeartIcon className="app-icon" />
                <span className="header-icon-link__badge">{favorites.length}</span>
              </Link>
              <Link to="/orders" className="header-icon-link" title="Items in cart">
                <CartIcon className="app-icon" />
                <span className="header-icon-link__badge">{cartCount}</span>
              </Link>
              <Link to="/books/list" className="header-icon-link" title="Open admin dashboard">
                <DashboardIcon className="app-icon" />
              </Link>
            </div>
          </div>
        </header>

        <main className="page-section">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/books/list" element={<BookList />} />
              <Route path="/books/new" element={<BookForm />} />
            </Routes>
          </div>
        </main>

        <footer className="site-footer">
          <div className="container site-footer__inner">
            <span>Minimal, quiet, and more visual than the previous version.</span>
            <span>© {new Date().getFullYear()} AliveBook</span>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default RoutingApp;
