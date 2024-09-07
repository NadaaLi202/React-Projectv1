import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from './wishlistSlice';
import productReducer from './productSlice'; // 
const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    products: productReducer,
  },
});

export default store;
