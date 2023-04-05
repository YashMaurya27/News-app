import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userDetails: {
        name: 'User',
        country: '',
    },
};

export const reducerSlice = createSlice({
    name: 'necessaryInfo',
    initialState,
    reducers: {
        saveUserInfo: (state, action) => {
            state.userDetails = { ...action.payload }
        },
    }
});

export const { saveUserInfo } = reducerSlice.actions;

export default reducerSlice.reducer;