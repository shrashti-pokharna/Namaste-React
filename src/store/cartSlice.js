import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(localStorage.getItem("swgy_cartItems")) || [],
    selectedRestaurant:
      JSON.parse(localStorage.getItem("swgy_selectedRestaurant")) || null,
    totalAmount: JSON.parse(localStorage.getItem("swgy_totalAmount")) || null,
  },
  reducers: {
    addItem: (state, action) => {
      let index = state.items.findIndex(
        (items) => items.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index].itemCount++;
      } else {
        state.items.push({ ...action.payload, itemCount: 1 });
      }
      localStorage.setItem("swgy_cartItems", JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      let index = state.items.findIndex(
        (items) => items.id === action.payload.id
      );
      if (index !== -1) {
        if (state.items[index].itemCount > 1) {
          state.items[index].itemCount--;
        } else {
          state.items.slice(index, 1);
        }
      }
      localStorage.setItem("swgy_cartItems", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items.length = 0;
      state.selectedRestaurant = null;
      state.totalAmount = 0;
    },
    setRestaurant: (state, action) => {
      state.selectedRestaurant = action.payload;
      localStorage.setItem(
        "swgy_selectedRestaurant",
        JSON.stringify(state.selectedRestaurant)
      );
    },

    calculateItemTotal: (state) => {
      let totalAmount = state.items.reduce((prevCount, item) => {
        return (
          prevCount + ((item.price || item.defaultPrice) / 100) * item.itemCount
        );
      }, 0);
      state.totalAmount = parseFloat(totalAmount.toFixed(2));
      localStorage.setItem(
        "swgy_totalAmount",
        JSON.stringify(state.totalAmount)
      );
    },
  },
});

export const {
  addItem,
  removeItem,
  clearCart,
  setRestaurant,
  calculateItemTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
