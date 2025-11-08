import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:5000/api';

// Async Thunk for fetching the cart
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await axios.get(`${API_BASE_URL}/cart`);
  return response.data;
});

// Async Thunk for adding to cart
export const addProductToCart = createAsyncThunk('cart/addProduct', async (product) => {
  // The 'product' object is the 'post' from your Product.js
  const response = await axios.post(`${API_BASE_URL}/cart`, product);
  toast.success("Item added to the Cart");
  return response.data; // This will be the new/updated cart item
});

// Async Thunk for removing from cart
export const removeProductFromCart = createAsyncThunk('cart/removeProduct', async (productId) => {
  // We send the 'id' of the product to be removed
  await axios.delete(`${API_BASE_URL}/cart/${productId}`);
  toast.error("Item removed from the Cart");
  return productId; // Return the ID for removal from state
});

// Async Thunk for checkout
export const checkoutCart = createAsyncThunk('cart/checkout', async ({ cartItems, totalAmount }) => {
    const response = await axios.post(`${API_BASE_URL}/checkout`, { cartItems, totalAmount });
    toast.success("Checkout Successful!");
    return response.data; // This is the mock receipt
});


const initialState = {
  cart: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // We keep these sync reducers if needed, but thunks are preferred
    // add: (state, action) => {
    //   state.cart.push(action.payload);
    // },
    // remove: (state, action) => {
    //   state.cart = state.cart.filter((item) => item.id !== action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload; // Set cart from DB
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add Product
      .addCase(addProductToCart.fulfilled, (state, action) => {
        // action.payload is the item returned from the API
        const newItem = action.payload;
        // Check if item already exists by 'productId'
        const existingItemIndex = state.cart.findIndex(item => item.productId === newItem.productId);
        
        if (existingItemIndex !== -1) {
            // If exists, update it (e.g., quantity)
            state.cart[existingItemIndex] = newItem;
        } else {
            // If new, add it
            state.cart.push(newItem);
        }
      })
      // Remove Product
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        // action.payload is the productId we sent
        state.cart = state.cart.filter((item) => item.productId !== action.payload);
      })
      // Checkout
      .addCase(checkoutCart.fulfilled, (state, action) => {
          state.cart = []; // Empty the cart on successful checkout
          console.log("Receipt:", action.payload); // Log the mock receipt
      });
  },
});

// We export the thunks, not the old reducers
// export const { add, remove } = CartSlice.actions;
export default CartSlice.reducer;