import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook, type Book, updateBook } from '../store/bookSlice';
import { type AppDispatch } from '../store';
import { ArrowRightIcon, BookIcon, SparklesIcon } from './icons';

interface BookFormProps {
  editingBook?: Book;
  onCancelEdit?: () => void;
  mode?: 'page' | 'panel';
}

const fallbackCover =
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80';

const BookForm: React.FC<BookFormProps> = ({ editingBook, onCancelEdit, mode = 'page' }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [bookname, setBookname] = useState('');
  const [isbn, setIsbn] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const isEditing = Boolean(editingBook);
  const isPanelMode = mode == 'panel';

  useEffect(() => {
    setBookname(editingBook?.bookname ?? '');
    setIsbn(editingBook?.ISBN ?? '');
    setPrice(editingBook ? String(editingBook.price) : '');
    setImageUrl(editingBook?.image_url ?? '');
  }, [editingBook]);

  const previewImage = useMemo(() => imageUrl.trim() || fallbackCover, [imageUrl]);

  const resetForm = () => {
    setBookname('');
    setIsbn('');
    setPrice('');
    setImageUrl('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const bookData = {
      bookname: bookname.trim(),
      ISBN: isbn.trim(),
      price: Number(price),
      image_url: imageUrl.trim(),
    };

    try {
      if (editingBook) {
        await dispatch(updateBook({ id: editingBook.id, ...bookData })).unwrap();
        onCancelEdit?.();
      } else {
        await dispatch(addBook(bookData)).unwrap();
        resetForm();
      }
    } catch (error) {
      console.error('Failed to save the book:', error);
    }
  };

  return (
    <div className={`form-layout form-layout--refined ${isPanelMode ? 'form-layout--panel' : ''}`.trim()}>
      <section className="form-card form-card--refined">
        <div className="form-header form-header--refined">
          <span className="section-eyebrow">{isPanelMode ? 'Admin editor' : 'Admin create page'}</span>
          <h1>{isEditing ? 'Refine the selected title' : 'Create a new catalog entry'}</h1>
          <p className="muted">
            {isPanelMode
              ? 'This panel is for admins only and stays compact so it will not overlap the catalog list.'
              : 'This is the dedicated admin page for creating a new book entry with a full live preview.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="form-grid form-grid--refined">
          <div className="field-group field-span-2">
            <label htmlFor="imageUrl">Cover image URL</label>
            <input
              id="imageUrl"
              type="url"
              className="input"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="https://example.com/book-cover.jpg"
            />
          </div>

          <div className="field-group field-span-2">
            <label htmlFor="bookname">Book title</label>
            <input
              id="bookname"
              type="text"
              className="input"
              value={bookname}
              onChange={(event) => setBookname(event.target.value)}
              placeholder="The Design of Everyday Things"
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="isbn">Author / ISBN label</label>
            <input
              id="isbn"
              type="text"
              className="input"
              value={isbn}
              onChange={(event) => setIsbn(event.target.value)}
              placeholder="Don Norman"
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="price">Price (USD)</label>
            <input
              id="price"
              type="number"
              className="input"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="24.00"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="field-span-2 form-actions">
            <button type="submit" className="button button--dark">
              <BookIcon className="button__icon" />
              {isEditing ? 'Save book' : 'Create book'}
            </button>
            {isEditing && onCancelEdit ? (
              <button type="button" className="button button--secondary" onClick={onCancelEdit}>
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </section>

      <aside className={`preview-panel surface ${isPanelMode ? 'preview-panel--panel' : ''}`.trim()}>
        <div className="preview-panel__topline">
          <span className="note-chip">
            <SparklesIcon className="app-icon" />
            Live preview
          </span>
        </div>

        <div className="preview-panel__cover">
          <img src={previewImage} alt={bookname || 'Book cover preview'} />
        </div>

        <div className="preview-panel__content">
          <h3>{bookname || 'Your next featured title'}</h3>
          <p className="muted">{isbn || 'Author / ISBN label appears here'}</p>
          <div className="price-row">
            <strong className="price-tag">{price ? `$${Number(price).toFixed(2)}` : '$0.00'}</strong>
            <span className="badge badge--neutral">
              Preview
              <ArrowRightIcon className="app-icon" />
            </span>
          </div>
          <p className="muted">Use a strong cover image to make the storefront feel more premium instantly.</p>
        </div>
      </aside>
    </div>
  );
};

export default BookForm;
