import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    isPrime: JSON.parse(localStorage.getItem("user"))?.isPrime || false,
    primePlan: JSON.parse(localStorage.getItem("user"))?.primePlan || null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        authSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.isPrime = action.payload.user.isPrime || false;
            state.primePlan = action.payload.user.primePlan || null;
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);
        },
        authFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updatePrimeStatus: (state, action) => {
            if (state.user) {
                const { isPrime, plan } = action.payload;
                state.user.isPrime = isPrime;
                state.user.primePlan = plan;
                state.isPrime = isPrime;
                state.primePlan = plan;
                localStorage.setItem("user", JSON.stringify(state.user));
            }
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isPrime = false;
            state.primePlan = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
    },
});

export const { authStart, authSuccess, authFailure, logout, updatePrimeStatus } = authSlice.actions;
export default authSlice.reducer;
