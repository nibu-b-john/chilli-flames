import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateQuantity: (state, action) => {
      const { id, newQuantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        if (newQuantity === 0) {
          // Remove item if quantity is 0
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          // Update quantity
          existingItem.quantity = newQuantity;
        }
      } else if (newQuantity > 0) {
        // Add new item
        state.items.push({ ...action.payload.dish, quantity: newQuantity });
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectSubtotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export default cartSlice.reducer;
