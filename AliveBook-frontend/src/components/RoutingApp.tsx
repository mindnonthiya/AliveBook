import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Orders from './Orders';
import BookForm from './BookForm';
import BookList from './BookList';

const links = [
  { to: '/', label: 'Discover', end: true },
  { to: '/orders', label: 'Orders' },
  { to: '/books/list', label: 'Library Admin' },
  { to: '/books/new', label: 'Add Book' },
];

const RoutingApp: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="site-header">
          <div className="container site-header__inner">
            <div className="brand">
              <span className="brand__title">AliveBook</span>
              <span className="brand__caption">Minimal storefront + admin dashboard for your book catalog.</span>
            </div>

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
            <span>Designed to feel calm, modern, and easy to navigate.</span>
            <span>© {new Date().getFullYear()} AliveBook</span>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default RoutingApp;
