import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userDetails: {
        name: 'User',
        country: '',
    },
    bookmarks: [],
};

export const reducerSlice = createSlice({
    name: 'necessaryInfo',
    initialState,
    reducers: {
        saveUserInfo: (state, action) => {
            state.userDetails = { ...action.payload }
        },
        saveBookmarks: (state, action) => {
            state.bookmarks = [
                ...state.bookmarks,
                { ...action['payload'] }
            ];
        },
        removeBookmark: (state, action) => {
            state.bookmarks.splice(action.payload, 1)
        }
    }
});

export const { saveUserInfo, saveBookmarks, removeBookmark } = reducerSlice.actions;

export default reducerSlice.reducer;