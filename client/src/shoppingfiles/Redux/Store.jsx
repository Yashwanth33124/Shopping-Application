import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import cartReducer from "./CartSlice";
import orderReducer from "./OrderSlice";
import wishlistReducer from "./WishlistSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        orders: orderReducer,
        wishlist: wishlistReducer,
    },
});
