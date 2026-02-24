import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalAmount: 0,
    lastAddedItem: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === newItem.id);
            state.totalQuantity++;

            if (!existingItem) {
                state.cartItems.push({
                    id: newItem.id,
                    title: newItem.title,
                    image: newItem.images?.[0] || newItem.image || newItem.src || newItem.img,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    size: newItem.size || "Standard",
                    color: newItem.color || "Default",
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price);
            }

            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity),
                0
            );

            state.lastAddedItem = {
                id: newItem.id,
                title: newItem.title,
                image: newItem.images?.[0] || newItem.image || newItem.src || newItem.img,
                price: newItem.price,
                size: newItem.size || "Standard",
                color: newItem.color || "Default",
                quantity: existingItem ? existingItem.quantity : 1,
                timestamp: Date.now()
            };
        },

        clearLastAddedItem(state) {
            state.lastAddedItem = null;
        },

        removeFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);

            if (existingItem) {
                state.totalQuantity--;
                if (existingItem.quantity === 1) {
                    state.cartItems = state.cartItems.filter((item) => item.id !== id);
                } else {
                    existingItem.quantity--;
                    existingItem.totalPrice = Number(existingItem.totalPrice) - Number(existingItem.price);
                }
            }

            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity),
                0
            );
        },

        deleteFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);

            if (existingItem) {
                state.totalQuantity = state.totalQuantity - existingItem.quantity;
                state.cartItems = state.cartItems.filter((item) => item.id !== id);
            }

            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity),
                0
            );
        },
    },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
