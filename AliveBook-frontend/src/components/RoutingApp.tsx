import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './Home';
import Orders from './Orders';   // หน้า Orders
import BookForm from './BookForm';
import BookList from './BookList';

const RoutingApp: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">

                {/*  Navbar ส่วนบน */}
                <nav className="backdrop-blur-md bg-gray-900/60 border-b border-pink-500/40 shadow-lg shadow-pink-900/20 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                        {/* Logo */}
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                            AliveBooks
                        </h1>

                        {/* Menu Navigation */}
                        <ul className="flex space-x-6 text-lg">
                            {/*  ลิงก์ไปหน้า Home */}
                            <li>
                                <NavLink
                                    to="/"
                                    end
                                    className={({ isActive }) =>
                                        `transition hover:text-pink-400 ${isActive ? 'text-pink-400 font-semibold border-b-2 border-pink-400 pb-1' : 'text-gray-300'}`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>

                            {/*  ลิงก์ไปหน้า Orders */}
                            <li>
                                <NavLink
                                    to="/orders"
                                    className={({ isActive }) =>
                                        `transition hover:text-pink-400 ${isActive ? 'text-pink-400 font-semibold border-b-2 border-pink-400 pb-1' : 'text-gray-300'}`
                                    }
                                >
                                    Orders
                                </NavLink>
                            </li>

                            {/*  ลิงก์ไปหน้าแสดงรายการหนังสือ */}
                            <li>
                                <NavLink
                                    to="/books/list"
                                    className={({ isActive }) =>
                                        `transition hover:text-pink-400 ${isActive ? 'text-pink-400 font-semibold border-b-2 border-pink-400 pb-1' : 'text-gray-300'}`
                                    }
                                >
                                    Manage Books
                                </NavLink>
                            </li>

                            {/*  ลิงก์ไปหน้าเพิ่มหนังสือ */}
                            <li>
                                <NavLink
                                    to="/books/new"
                                    className={({ isActive }) =>
                                        `transition hover:text-pink-400 ${isActive ? 'text-pink-400 font-semibold border-b-2 border-pink-400 pb-1' : 'text-gray-300'}`
                                    }
                                >
                                    Add Book
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/*  Main Content ของแต่ละ Route */}
                <main className="flex-1 w-full px-4 sm:px-6 lg:px-8">
                    <Routes>
                        {/*  Route สำหรับหน้า Home */}
                        <Route path="/" element={<Home />} />

                        {/*  Route สำหรับหน้า Orders */}
                        <Route path="/orders" element={<Orders />} />

                        {/*  Route สำหรับหน้าแสดงรายการหนังสือ */}
                        <Route path="/books/list" element={<BookList />} />

                        {/*  Route สำหรับหน้าเพิ่มหนังสือ */}
                        <Route path="/books/new" element={<BookForm />} />
                    </Routes>
                </main>

                {/*  Footer ของเว็บไซต์ */}
                <footer className="text-center py-6 border-t border-gray-700 text-gray-400 mt-8">
                    © {new Date().getFullYear()} BookStore — Crafted with ❤️
                </footer>
            </div>
        </BrowserRouter>
    );
};

export default RoutingApp;
