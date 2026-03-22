import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../store'; //  ใช้ type import สำหรับ TypeScript
import { selectCart, addToCart, removeFromCart } from '../store/bookSlice';

const Orders: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    //  ดึงข้อมูลสินค้าในตะกร้าจาก Redux store
    const cart = useSelector(selectCart);

    //  คำนวณราคารวมของสินค้าทั้งหมดในตะกร้า
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="p-8">
            {/* Header */}
            <h1 className="text-3xl font-bold mb-6">Order Summary</h1>

            {/*  ตรวจสอบว่าตะกร้าว่างหรือไม่ */}
            {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-10">Cart is empty</p>
            ) : (
                <div className="space-y-4 max-w-2xl mx-auto">
                    {/*  แสดงรายการสินค้าทีละชิ้น */}
                    {cart.map(item => (
                        <div key={item.id} className="flex items-center border p-4 rounded">
                            {/*  รูปหนังสือ */}
                            <img
                                src={item.image_url || 'https://via.placeholder.com/80x120'}
                                className="w-20 h-32 mr-4"
                            />

                            {/*  ข้อมูลหนังสือ */}
                            <div className="flex-1">
                                <h2>{item.bookname}</h2>
                                <p>{item.ISBN}</p>
                                <p>${item.price} x {item.quantity}</p>
                            </div>

                            {/*  ปุ่มเพิ่มจำนวน / ลบสินค้า */}
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => dispatch(addToCart(item))}
                                    className="bg-green-500 text-white px-2 py-1 rounded"
                                >
                                    +1
                                </button>
                                <button
                                    onClick={() => dispatch(removeFromCart(item.id))}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    {/*  แสดงราคารวม */}
                    <p className="text-right font-bold mt-4">Total: ${totalPrice}</p>

                    {/*  ปุ่ม Checkout */}
                    <div className="text-center mt-4">
                        <button
                            onClick={() => alert('Proceed to checkout!')}
                            className="bg-pink-500 text-white px-4 py-2 rounded"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
