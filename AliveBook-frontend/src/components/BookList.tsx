import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BookForm from './BookForm';
import {
  deleteBook,
  fetchBooks,
  selectBooks,
  selectError,
  selectLoading,
  type Book,
} from '../store/bookSlice';
import { type AppDispatch } from '../store';

const fallbackCover =
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80';

const BookList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector(selectBooks);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [editingBook, setEditingBook] = useState<Book | undefined>(undefined);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const totalInventoryValue = useMemo(
    () => books.reduce((sum, book) => sum + Number(book.price || 0), 0),
    [books],
  );

  if (loading) {
    return <div className="empty-state">Loading books…</div>;
  }

  if (error) {
    return <div className="empty-state">Error: {error}</div>;
  }

  return (
    <div>
      <section className="section-heading">
        <div>
          <span className="section-eyebrow">Admin workspace</span>
          <h2>Manage the library catalog</h2>
          <p className="muted">Edit items inline or open the dedicated add-book page for new entries.</p>
        </div>
        <Link to="/books/new" className="button button--primary">
          Add another book
        </Link>
      </section>

      <div className="admin-layout">
        <section>
          {books.length === 0 ? (
            <div className="empty-state">No books found. Add one to start building the collection.</div>
          ) : (
            <div className="admin-grid">
              {books.map((book) => (
                <article className="admin-book-card" key={book.id}>
                  <div className="admin-book-card__media">
                    <img src={book.image_url || fallbackCover} alt={book.bookname} />
                  </div>
                  <div className="admin-book-card__body">
                    <div className="admin-meta">
                      <span className="badge badge--neutral">Book #{book.id}</span>
                      <span className="price-tag">${Number(book.price).toFixed(2)}</span>
                    </div>

                    <h3 className="admin-book-card__title" style={{ marginTop: '0.9rem' }}>
                      {book.bookname}
                    </h3>
                    <p className="muted" style={{ marginTop: '0.35rem' }}>
                      {book.ISBN}
                    </p>

                    <div className="inline-actions" style={{ marginTop: '1rem' }}>
                      <button className="button button--soft" onClick={() => setEditingBook(book)}>
                        Edit
                      </button>
                      <button
                        className="button button--danger"
                        onClick={() => {
                          if (editingBook?.id === book.id) {
                            setEditingBook(undefined);
                          }
                          dispatch(deleteBook(book.id));
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="admin-sidebar" style={{ display: 'grid', gap: '1rem' }}>
          <div className="sidebar-card">
            <span className="section-eyebrow">Catalog metrics</span>
            <h3>At a glance</h3>
            <div className="summary-list">
              <div className="summary-list__item">
                <span className="muted">Books available</span>
                <strong>{books.length}</strong>
              </div>
              <div className="summary-list__item">
                <span className="muted">Combined listed value</span>
                <strong>${totalInventoryValue.toFixed(2)}</strong>
              </div>
              <div className="summary-list__item">
                <span className="muted">Editing mode</span>
                <strong>{editingBook ? 'Open' : 'Idle'}</strong>
              </div>
            </div>
          </div>

          {editingBook ? (
            <BookForm editingBook={editingBook} onCancelEdit={() => setEditingBook(undefined)} />
          ) : (
            <div className="sidebar-card">
              <span className="section-eyebrow">Inline editing</span>
              <h3>Pick a book to update</h3>
              <p className="muted">
                Click <strong>Edit</strong> on any card and the form will appear here with a live cover preview.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default BookList;
