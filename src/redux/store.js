import { configureStore } from '@reduxjs/toolkit';
import necessaryInfoReducer from './infoSlice';

export const store = configureStore({
    reducer: {
        necessaryInfo: necessaryInfoReducer
    },
});