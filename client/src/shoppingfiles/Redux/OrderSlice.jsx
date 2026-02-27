import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: JSON.parse(localStorage.getItem("vogue_orders")) || []
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addOrder: (state, action) => {
            const newOrder = {
                ...action.payload,
                status: "Processing",
                trackingId: `VGC-${Math.floor(100000000 + Math.random() * 900000000)}`,
                timeline: [
                    { status: "Order Placed", date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString(), completed: true },
                    { status: "Processing", date: "Pending", time: "", completed: false },
                    { status: "Shipped", date: "Pending", time: "", completed: false },
                    { status: "Out for Delivery", date: "Pending", time: "", completed: false },
                    { status: "Delivered", date: "Pending", time: "", completed: false }
                ]
            };
            state.orders.unshift(newOrder); // Add to beginning
            localStorage.setItem("vogue_orders", JSON.stringify(state.orders));
        }
    }
});

export const orderActions = orderSlice.actions;
export default orderSlice.reducer;
