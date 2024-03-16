import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
    userData: null,
    token: '',
    isLoggedIn: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        token(state, action) {
            state.token = action.payload
        },
        userData(state, action) {
            state.userData = action.payload
        },
        isLoggedIn(state, action) {
            state.isLoggedIn = action.payload
        }
    }
})

export const authActions = authSlice.actions;


export default authSlice.reducer;