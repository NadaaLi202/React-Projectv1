import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid'; // Import a library for generating unique IDs

const initialState = {
  items: JSON.parse(localStorage.getItem('products')) || [],
  status: 'idle',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProducts: (state) => {
      state.status = 'succeeded';
    },
    addProduct: (state, action) => {
      // Generate a unique ID for the new product
      const newProduct = {
        ...action.payload,
        id: nanoid(), // Add a new unique ID to the product
      };
    
      // Add the new product with the unique ID to the state
      state.items.push(newProduct);
    
      // Update localStorage with the new state
      localStorage.setItem('products', JSON.stringify(state.items));
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        localStorage.setItem('products', JSON.stringify(state.items));
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(product => product.id !== action.payload);
      localStorage.setItem('products', JSON.stringify(state.items));
    },
  },
});

export const { fetchProducts, addProduct, updateProduct, deleteProduct } = productSlice.actions;

export default productSlice.reducer;
