import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from './index';

// ----------------- Types -----------------
export interface Book {
    id: number;
    bookname: string;
    ISBN: string;
    price: number;
    image_url?: string;
}

export interface CartItem extends Book {
    quantity: number; // เพิ่มจำนวนของหนังสือในตะกร้า
}

interface BookState {
    books: Book[];           // ข้อมูลหนังสือทั้งหมด
    loading: boolean;        // สถานะกำลังโหลด
    error: string | null;    // ข้อผิดพลาดถ้ามี
    favorites: number[];     // เก็บ ID หนังสือที่ถูกชอบ
    cart: CartItem[];        // ข้อมูลตะกร้าสินค้า
}

// ----------------- Initial State -----------------
const initialState: BookState = {
    books: [],
    loading: false,
    error: null,
    favorites: [],
    cart: [],
};

// ----------------- API URL -----------------
const API_URL = 'http://localhost:3000/books';

// ----------------- Async Thunks -----------------
// ดึงรายการหนังสือจาก API
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
    const response = await axios.get<Book[]>(API_URL);
    return response.data;
});

// เพิ่มหนังสือใหม่ไปยัง API
export const addBook = createAsyncThunk(
    'books/addBook',
    async (newBook: { bookname: string; ISBN: string; price: number; image_url?: string }) => {
        const response = await axios.post<Book>(API_URL, newBook);
        return response.data;
    }
);

// แก้ไขหนังสือบน API
export const updateBook = createAsyncThunk('books/updateBook', async (updatedBook: Book) => {
    const response = await axios.put<Book>(`${API_URL}/${updatedBook.id}`, updatedBook);
    return response.data;
});

// ลบหนังสือจาก API
export const deleteBook = createAsyncThunk('books/deleteBook', async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

// ----------------- Slice -----------------
const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        //  ชอบ/เลิกชอบหนังสือ
        likeBook: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            if (state.favorites.includes(id)) {
                state.favorites = state.favorites.filter(favId => favId !== id);
            } else {
                state.favorites.push(id);
            }
        },
        //  เพิ่มหนังสือลงในตะกร้า
        addToCart: (state, action: PayloadAction<Book>) => {
            const item = state.cart.find(ci => ci.id === action.payload.id);
            if (item) {
                item.quantity += 1; // ถ้ามีแล้วเพิ่มจำนวน
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        //  ลบหนังสือออกจากตะกร้า
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter(item => item.id !== action.payload);
        },
        //  เพิ่มจำนวนในตะกร้า
        increaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.cart.find(ci => ci.id === action.payload);
            if (item) item.quantity += 1;
        },
        //  ลดจำนวนในตะกร้า (ถ้าเหลือ 0 จะลบออก)
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.cart.find(ci => ci.id === action.payload);
            if (item) {
                item.quantity -= 1;
                if (item.quantity <= 0) {
                    state.cart = state.cart.filter(ci => ci.id !== action.payload);
                }
            }
        },
        // 🧹 ล้างตะกร้าทั้งหมด
        clearCart: (state) => {
            state.cart = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // กำหนดสถานะโหลดเมื่อ fetchBooks เริ่มทำงาน
            .addCase(fetchBooks.pending, (state) => { state.loading = true; })
            // เมื่อดึงข้อมูลสำเร็จ
            .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
                state.loading = false;
                state.books = action.payload;
            })
            // เมื่อดึงข้อมูลล้มเหลว
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch books';
            })
            // เพิ่มหนังสือใหม่ใน state
            .addCase(addBook.fulfilled, (state, action: PayloadAction<Book>) => {
                state.books.push(action.payload);
            })
            // อัปเดตหนังสือใน state
            .addCase(updateBook.fulfilled, (state, action: PayloadAction<Book>) => {
                const index = state.books.findIndex(b => b.id === action.payload.id);
                if (index !== -1) state.books[index] = action.payload;
            })
            // ลบหนังสือจาก state, cart และ favorites
            .addCase(deleteBook.fulfilled, (state, action: PayloadAction<number>) => {
                state.books = state.books.filter(b => b.id !== action.payload);
                state.cart = state.cart.filter(c => c.id !== action.payload);
                state.favorites = state.favorites.filter(f => f !== action.payload);
            });
    },
});

// ----------------- Exports -----------------
export const { likeBook, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = bookSlice.actions;

// Selectors ใช้ดึงข้อมูลจาก state
export const selectBooks = (state: RootState) => state.books.books;
export const selectLoading = (state: RootState) => state.books.loading;
export const selectError = (state: RootState) => state.books.error;
export const selectFavorites = (state: RootState) => state.books.favorites;
export const selectCart = (state: RootState) => state.books.cart;

export default bookSlice.reducer;
