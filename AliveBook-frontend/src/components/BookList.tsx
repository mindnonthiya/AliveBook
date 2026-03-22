import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type AppDispatch } from '../store';
import {
    fetchBooks,
    deleteBook,
    selectBooks,
    selectLoading,
    selectError,
    type Book,
} from '../store/bookSlice';
import BookForm from './BookForm';

const BookList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    // ดึงข้อมูลหนังสือทั้งหมดจาก Redux store
    const books = useSelector(selectBooks);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    // เก็บสถานะหนังสือที่กำลังแก้ไข
    const [editingBook, setEditingBook] = useState<Book | undefined>(undefined);

    //  Fetch books จาก backend ตอน component โหลดครั้งแรก
    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    //  Handler สำหรับเลือกหนังสือเพื่อแก้ไข
    const handleEdit = (book: Book) => setEditingBook(book);

    //  Handler สำหรับยกเลิกการแก้ไข
    const handleCancelEdit = () => setEditingBook(undefined);

    // แสดงข้อความระหว่างโหลด / error / ข้อมูลไม่ถูกต้อง
    if (loading) return <p className="text-center text-gray-500">Loading books...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;
    if (!Array.isArray(books))
        return <p className="text-center text-red-500">Invalid book data received.</p>;

    return (
        <div className="p-8 bg-white min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-center text-pink-500">
                Book Management
            </h2>

            {/*  แสดงรายการหนังสือ */}
            {books.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No books found — try adding one!</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {books.map((book) => (
                        <div
                            key={book.id}
                            className="flex items-center bg-pink-50 border border-pink-200 rounded-xl p-4 shadow-sm hover:shadow-pink-300 transition"
                        >
                            {/*  แสดงรูปหนังสือ */}
                            <div className="w-24 h-36 flex-shrink-0 rounded-lg overflow-hidden shadow-md mr-4">
                                <img
                                    src={book.image_url || "https://cdn.pixabay.com/photo/2020/09/30/12/18/books-5615562_1280.jpg"}
                                    alt={book.bookname}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/*  ข้อมูลหนังสือ */}
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-pink-500">{book.bookname}</h3>
                                <p className="text-gray-600 text-sm">Author: {book.ISBN}</p>
                                <p className="text-gray-700 font-medium mt-1">
                                     ${(Number(book.price) || 0).toFixed(2)}
                                </p>
                            </div>

                            {/*  ปุ่มแก้ไข / ลบ */}
                            <div className="flex flex-col gap-2 ml-4">
                                {/* Edit → set editingBook */}
                                <button
                                    onClick={() => handleEdit(book)}
                                    className="bg-blue-400 text-white px-3 py-1 rounded-md hover:bg-blue-500 transition"
                                >
                                    Edit
                                </button>

                                {/* Delete → dispatch deleteBook */}
                                <button
                                    onClick={() => dispatch(deleteBook(book.id))}
                                    className="bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-500 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/*  ฟอร์มแก้ไขหนังสือ */}
            {editingBook && (
                <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-300">
                    <h3 className="text-xl font-semibold text-pink-500 mb-4">
                         Edit Book — {editingBook.bookname}
                    </h3>

                    {/* ส่ง props editingBook และ onCancelEdit ไปให้ BookForm */}
                    <BookForm editingBook={editingBook} onCancelEdit={handleCancelEdit} />
                </div>
            )}
        </div>
    );
};

export default BookList;
