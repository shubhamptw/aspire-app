import { configureStore } from '@reduxjs/toolkit';
import spendingLimitReducer from './spendingLimit/reducer';

export const store = configureStore({
    reducer: {
        spendingLimit: spendingLimitReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch; 