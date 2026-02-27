import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import cartReducer from "./CartSlice";
import orderReducer from "./OrderSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        orders: orderReducer,
    },
});
