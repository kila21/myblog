import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AuthStateType } from '../../types/store/auth/AuthStateType';

const initialState : AuthStateType = {
    user: localStorage.getItem('username') || null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart(state) {
            state.isLoading = true
        },

        loginSuccess(state, action: PayloadAction<{user: string, token: string}>) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;
            state.isLoading = false;
        },

        loginFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.isLoading = false;
        },

        logout(state) {
            state.user = null;
            state.error = null;
            state.token = null;
            state.isLoading = false;
            localStorage.removeItem('refresh');
            localStorage.removeItem('token');   
        }
    }
})

export const {loginStart, loginSuccess, loginFailure, logout } = authSlice.actions

export default authSlice.reducer