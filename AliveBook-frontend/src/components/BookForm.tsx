import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../store';
import { addBook, updateBook, type Book } from '../store/bookSlice';

interface BookFormProps {
    editingBook?: Book;           // ถ้ามี จะเป็นโหมดแก้ไข
    onCancelEdit?: () => void;    // ฟังก์ชันเรียกเมื่อยกเลิกการแก้ไข
}

const BookForm: React.FC<BookFormProps> = ({ editingBook, onCancelEdit }) => {
    const dispatch = useDispatch<AppDispatch>();

    //  State ของฟอร์มแต่ละ field
    const [bookname, setBookname] = useState(editingBook?.bookname || '');
    const [ISBN, setISBN] = useState(editingBook?.ISBN || '');
    const [price, setPrice] = useState(editingBook?.price || 0);
    const [imageUrl, setImageUrl] = useState(editingBook?.image_url || '');

    //  ฟังก์ชันหลัก: submit ฟอร์มเพิ่มหรือแก้ไขหนังสือ
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const bookData = { bookname, ISBN, price, image_url: imageUrl };

            if (editingBook) {
                // Update หนังสือเก่า
                await dispatch(updateBook({ id: editingBook.id, ...bookData })).unwrap();
                onCancelEdit?.(); // ปิดฟอร์มแก้ไข
            } else {
                // Add หนังสือใหม่
                await dispatch(addBook(bookData)).unwrap();

                // Reset ฟอร์ม
                setBookname('');
                setISBN('');
                setPrice(0);
                setImageUrl('');
            }
        } catch (error) {
            console.error('Failed to save the book:', error);
        }
    };

    return (
        <div className="min-h-screen p-8 bg-white flex justify-center items-start">
            <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-3xl p-8 shadow-lg">
                {/*  Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        {editingBook ? 'Edit Book' : 'Add New Book'}
                    </h1>
                    <p className="text-gray-500">
                        {editingBook ? 'Update book information below' : 'Enter new book details below'}
                    </p>
                </div>

                {/*  Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/*  Image Preview */}
                    <div className="flex justify-center">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="Book Preview"
                                className="w-48 h-64 object-cover rounded-xl shadow-md"
                            />
                        ) : (
                            <div className="w-48 h-64 bg-gray-100 flex items-center justify-center rounded-xl text-gray-400 shadow-md">
                                No Image
                            </div>
                        )}
                    </div>

                    {/*  Image URL */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Image URL</label>
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="Enter image URL"
                            className="w-full px-5 py-3 text-lg border-2 border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition"
                        />
                    </div>

                    {/*  Book Title */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Book Title</label>
                        <input
                            type="text"
                            value={bookname}
                            onChange={(e) => setBookname(e.target.value)}
                            placeholder="Enter book title"
                            required
                            className="w-full px-5 py-3 text-lg border-2 border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition"
                        />
                    </div>

                    {/*  Author */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Author</label>
                        <input
                            type="text"
                            value={ISBN}
                            onChange={(e) => setISBN(e.target.value)}
                            placeholder="Enter author"
                            required
                            className="w-full px-5 py-3 text-lg border-2 border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition"
                        />
                    </div>

                    {/*  Price */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Price</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                required
                                className="w-full px-5 py-3 pr-20 text-lg border-2 border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition"
                            />
                            <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                                USD
                            </div>
                        </div>
                    </div>

                    {/*  Buttons */}
                    <div className="flex gap-4 mt-4">
                        {/* Submit → Add / Update */}
                        <button
                            type="submit"
                            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl text-lg font-medium transition"
                        >
                            {editingBook ? 'Update Book' : 'Add Book'}
                        </button>

                        {/* Cancel → เฉพาะโหมดแก้ไข */}
                        {editingBook && onCancelEdit && (
                            <button
                                type="button"
                                onClick={onCancelEdit}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl text-lg font-medium transition"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

                {/*  Footer Info */}
                <div className="text-center mt-6 text-gray-400">
                    <p>All fields are required</p>
                </div>
            </div>
        </div>
    );
};

export default BookForm;
