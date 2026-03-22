// 1) import
import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './bookSlice';

// 2) สร้าง store
const store = configureStore({
    reducer: {
        books: bookReducer,
    },
});

// 3) Export store and Dispach
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 