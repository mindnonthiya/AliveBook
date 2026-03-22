import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchBooks,
    selectBooks,
    selectLoading,
    selectError,
    addToCart,
    likeBook,
    selectCart,
    selectFavorites,
    removeFromCart,
} from '../store/bookSlice';
import { type AppDispatch } from '../store';
import { useNavigate } from 'react-router-dom'; //  สำหรับ navigation ไปหน้าอื่น

const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate(); //  hook สำหรับเปลี่ยนหน้า

    //  ดึงข้อมูลจาก Redux store
    const books = useSelector(selectBooks);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const cart = useSelector(selectCart);
    const favorites = useSelector(selectFavorites);

    const [showCart, setShowCart] = useState(false); //  สถานะ popup ตะกร้า
    const [showFavorites, setShowFavorites] = useState(false); //  สถานะ popup รายการชอบ

    //  ดึงข้อมูลหนังสือจาก backend เมื่อหน้าโหลด
    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    //  คำนวณราคารวมในตะกร้า
    const totalPrice = cart.reduce(
        (sum, item) => sum + Number(item.price) * (item.quantity || 1),
        0
    );

    //  แสดง loading หรือ error
    if (loading) return <p className="text-center text-gray-500">Loading books...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="p-6 bg-white min-h-screen text-gray-900 relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-pink-400">Book Collection</h1>

                <div className="flex gap-6 items-center">
                    {/*  Icon ตะกร้า */}
                    <div className="relative cursor-pointer" onClick={() => setShowCart(!showCart)}>
                        <span className="material-icons text-xl text-green-500">shopping_cart</span>
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                                {cart.length}
                            </span>
                        )}
                    </div>

                    {/*  Icon รายการชอบ */}
                    <div className="relative cursor-pointer" onClick={() => setShowFavorites(!showFavorites)}>
                        <span className="material-icons text-xl text-pink-500">favorite</span>
                        {favorites.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                                {favorites.length}
                            </span>
                        )}
                    </div>

                    {/*  ปุ่มไปหน้า Orders */}
                    {cart.length > 0 && (
                        <button
                            onClick={() => navigate('/orders')} //  ใช้ navigate แทน window.location.href
                            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
                        >
                            View Orders
                        </button>
                    )}
                </div>
            </div>

            {/*  Popup: Cart */}
            {showCart && (
                <div className="absolute right-8 top-20 bg-white border border-green-300 rounded-xl p-4 w-80 z-50 shadow-lg">
                    <h2 className="text-lg font-bold mb-2 text-green-500">🛒 Cart</h2>
                    {cart.length === 0 ? (
                        <p className="text-gray-500">No items in cart.</p>
                    ) : (
                        <>
                            <ul className="max-h-64 overflow-y-auto">
                                {cart.map((book, index) => (
                                    <li key={index} className="mb-2 border-b border-gray-200 pb-2 flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold">{book.bookname}</p>
                                            <p className="text-sm text-gray-500">
                                                ${Number(book.price).toFixed(2)} x {book.quantity || 1}
                                            </p>
                                        </div>
                                        {/*  ปุ่มลบสินค้าออกจากตะกร้า */}
                                        <button
                                            onClick={() => dispatch(removeFromCart(book.id))}
                                            className="text-red-500 hover:text-red-600 text-sm font-semibold"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-2 text-right font-bold text-green-600">
                                Total: ${totalPrice.toFixed(2)}
                            </div>
                        </>
                    )}
                </div>
            )}

            {/*  Popup: Favorites */}
            {showFavorites && (
                <div className="absolute right-8 top-20 bg-white border border-pink-300 rounded-xl p-4 w-80 z-50 shadow-lg">
                    <h2 className="text-lg font-bold mb-2 text-pink-500">❤️ Favorite Books</h2>
                    {favorites.length === 0 ? (
                        <p className="text-gray-500">No favorite books yet.</p>
                    ) : (
                        <ul className="max-h-64 overflow-y-auto">
                            {books
                                .filter((book) => favorites.includes(book.id))
                                .map((book) => (
                                    <li key={book.id} className="mb-2 border-b border-gray-200 pb-2">
                                        <p className="font-semibold">{book.bookname}</p>
                                        <p className="text-sm text-gray-500">
                                            ${Number(book.price).toFixed(2)}
                                        </p>
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>
            )}

            {/*  Book List */}
            <div className="flex flex-col gap-4">
                {books.map((book) => (
                    <div
                        key={book.id}
                        className="flex items-center bg-pink-50 border border-pink-200 rounded-xl p-4 shadow-sm hover:shadow-pink-300 transition"
                    >
                        {/*  Book Image */}
                        <img
                            src={book.image_url || "https://cdn.pixabay.com/photo/2020/09/30/12/18/books-5615562_1280.jpg"}
                            alt={book.bookname}
                            className="w-24 h-36 object-cover rounded-lg shadow-md mr-4"
                        />

                        {/*  Book Info */}
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-pink-500">{book.bookname}</h2>
                            <p className="text-gray-600">Auther: {book.ISBN}</p>
                            <p className="text-gray-700 font-medium">Price: ${Number(book.price).toFixed(2)}</p>
                        </div>

                        {/*  Actions: Add to cart / Like */}
                        <div className="flex flex-col gap-2 ml-4">
                            <button
                                onClick={() => dispatch(addToCart(book))} //  เพิ่มหนังสือไปตะกร้า
                                className="bg-green-400 text-white px-3 py-1 rounded-md hover:bg-green-500 transition"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={() => dispatch(likeBook(book.id))} //  เพิ่ม/ลบรายการชอบ
                                className={`px-3 py-1 rounded-md transition ${favorites.includes(book.id)
                                    ? 'bg-pink-500 text-white'
                                    : 'bg-pink-100 hover:bg-pink-500 text-white'
                                    }`}
                            >
                                ❤️
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
