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
import { PencilIcon, PlusIcon, TrashIcon } from './icons';

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
    <div className="admin-page">
      <section className="section-heading">
        <div>
          <span className="section-eyebrow">Admin only · catalog workspace</span>
          <h1 className="page-title">A tidier dashboard for curating the catalog.</h1>
          <p className="muted">This area is for admins only: the left side manages inventory and the right side edits the selected book.</p>
        </div>
        <Link to="/books/new" className="button button--dark">
          <PlusIcon className="button__icon" />
          Add book
        </Link>
      </section>

      <div className="admin-layout admin-layout--refined">
        <section className="surface admin-shelf">
          <div className="admin-shelf__stats">
            <div className="stats-item">
              <span className="muted">Titles</span>
              <strong>{books.length}</strong>
            </div>
            <div className="stats-item">
              <span className="muted">Catalog value</span>
              <strong>${totalInventoryValue.toFixed(2)}</strong>
            </div>
            <div className="stats-item">
              <span className="muted">Editing</span>
              <strong>{editingBook ? editingBook.bookname : 'Nothing selected'}</strong>
            </div>
          </div>

          {books.length === 0 ? (
            <div className="empty-state">No books found. Add one to start building the collection.</div>
          ) : (
            <div className="admin-list-grid">
              {books.map((book) => (
                <article className="admin-row-card" key={book.id}>
                  <div className="admin-row-card__image">
                    <img src={book.image_url || fallbackCover} alt={book.bookname} />
                  </div>
                  <div className="admin-row-card__content">
                    <span className="section-eyebrow">Book #{book.id}</span>
                    <h3>{book.bookname}</h3>
                    <p className="muted">{book.ISBN}</p>
                  </div>
                  <div className="admin-row-card__meta">
                    <strong className="price-tag">${Number(book.price).toFixed(2)}</strong>
                    <div className="card-icon-actions">
                      <button className="icon-action" onClick={() => setEditingBook(book)} title="Edit book">
                        <PencilIcon className="app-icon" />
                      </button>
                      <button
                        className="icon-action icon-action--danger"
                        onClick={() => {
                          if (editingBook?.id === book.id) {
                            setEditingBook(undefined);
                          }
                          dispatch(deleteBook(book.id));
                        }}
                        title="Delete book"
                      >
                        <TrashIcon className="app-icon" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="admin-editor-panel">
          {editingBook ? (
            <BookForm editingBook={editingBook} onCancelEdit={() => setEditingBook(undefined)} mode="panel" />
          ) : (
            <div className="sidebar-card sidebar-card--empty">
              <span className="section-eyebrow">Admin edit studio</span>
              <h3>Select a book to edit</h3>
              <p className="muted">Choose the pencil icon from any card and the editor will appear here with a live preview.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default BookList;
