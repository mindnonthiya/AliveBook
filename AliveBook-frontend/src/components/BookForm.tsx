import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook, type Book, updateBook } from '../store/bookSlice';
import { type AppDispatch } from '../store';

interface BookFormProps {
  editingBook?: Book;
  onCancelEdit?: () => void;
}

const fallbackCover =
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80';

const BookForm: React.FC<BookFormProps> = ({ editingBook, onCancelEdit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [bookname, setBookname] = useState('');
  const [isbn, setIsbn] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const isEditing = Boolean(editingBook);

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
    <div className="form-layout">
      <section className="form-card">
        <div className="form-header">
          <span className="section-eyebrow">Book editor</span>
          <h1>{isEditing ? 'Update your catalog item' : 'Add a new title to the collection'}</h1>
          <p className="muted">
            Keep the details clean and consistent so the storefront looks polished everywhere.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="form-grid" style={{ marginTop: '1.5rem' }}>
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
              placeholder="Atomic Habits"
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
              placeholder="James Clear"
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
              placeholder="19.99"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="field-span-2 form-actions" style={{ marginTop: '0.5rem' }}>
            <button type="submit" className="button button--primary">
              {isEditing ? 'Save changes' : 'Create book'}
            </button>
            {isEditing && onCancelEdit ? (
              <button type="button" className="button button--secondary" onClick={onCancelEdit}>
                Cancel editing
              </button>
            ) : null}
          </div>
        </form>
      </section>

      <aside className="sidebar-card">
        <span className="section-eyebrow">Live preview</span>
        <div className="image-preview" style={{ marginTop: '0.85rem' }}>
          <img src={previewImage} alt={bookname || 'Book cover preview'} />
        </div>

        <div style={{ marginTop: '1rem', display: 'grid', gap: '0.65rem' }}>
          <div>
            <p className="card-label">Title</p>
            <strong>{bookname || 'Your next featured title'}</strong>
          </div>
          <div>
            <p className="card-label">Author / ISBN</p>
            <strong>{isbn || 'Display the author name here'}</strong>
          </div>
          <div>
            <p className="card-label">Price</p>
            <strong>{price ? `$${Number(price).toFixed(2)}` : '$0.00'}</strong>
          </div>
          <p className="muted">Tip: good cover art instantly upgrades the storefront.</p>
        </div>
      </aside>
    </div>
  );
};

export default BookForm;
