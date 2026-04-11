import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [], // [{id, name, price, image, category}]
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        toggleWishlist(state, action) {
            const product = action.payload;
            const existingIndex = state.items.findIndex(item => item._id === product._id);

            if (existingIndex >= 0) {
                // Remove if already in wishlist
                state.items.splice(existingIndex, 1);
            } else {
                // Add if not in wishlist
                state.items.push(product);
            }
        },
        clearWishlist(state) {
            state.items = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase("auth/logout", (state) => {
                state.items = [];
            })
            .addCase("auth/authSuccess", (state) => {
                state.items = [];
            });
    },
});

export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice.reducer;
