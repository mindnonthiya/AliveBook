import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCart, addToCart } from '../store/bookSlice';
import { type AppDispatch } from '../store';

const Cart: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const cart = useSelector(selectCart); //  ดึงข้อมูลตะกร้าสินค้าจาก Redux store

    return (
        <div className="p-6">
            {/*  หัวข้อหน้าตะกร้า */}
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Shopping Cart</h2>

            {/*  กรณีตะกร้าว่าง */}
            {cart.length === 0 ? (
                <div className="text-center py-8">
                    <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
                    <p className="text-xl text-gray-500">Your cart is empty</p>
                </div>
            ) : (
                //  กรณีมีสินค้า แสดงเป็น grid
                <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
                    {cart.map(item => (
                        <div
                            key={item.id}
                            className="bg-gray-900/70 border border-pink-600/40 rounded-2xl p-6 shadow-lg shadow-pink-900/30 hover:shadow-pink-600/50 hover:-translate-y-1 transform transition-all duration-300 flex flex-col items-center"
                        >
                            {/*  ข้อมูลหนังสือในตะกร้า */}
                            <h3 className="text-2xl font-semibold text-pink-300 mb-2">{item.bookname}</h3>
                            <p className="text-gray-400 mb-1">Author: {item.ISBN}</p>
                            <p className="text-gray-300 mb-1">Price: ${item.price.toFixed(2)}</p>
                            <p className="text-gray-300 mb-4">Quantity: {item.quantity}</p>

                            {/*  ปุ่มเพิ่มจำนวนสินค้าในตะกร้า */}
                            <button
                                onClick={() => dispatch(addToCart(item))}
                                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                            >
                                +1
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart;
