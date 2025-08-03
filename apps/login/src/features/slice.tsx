import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    name: '',
    token: '',
    isAuthenticated: false,
    loading: false,
    error: null
};

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.token = action.payload.token;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logoutRequest: (state) => {
            state.email = '';
            state.name = '';
            state.token = '';
            state.isAuthenticated = false;
        }
    }
});

export const { loginRequest, loginSuccess, loginFailure, logoutRequest } = userInfoSlice.actions;
export default userInfoSlice.reducer;