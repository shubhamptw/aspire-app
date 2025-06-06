import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SpendingLimitState {
    limit: number | null;
    enabled: boolean;
}

const initialState: SpendingLimitState = {
    limit: null,
    enabled: false,
};

const spendingLimitSlice = createSlice({
    name: 'spendingLimit',
    initialState,
    reducers: {
        setSpendingLimit(state, action: PayloadAction<number>) {
            state.limit = action.payload;
            state.enabled = true;
        },
        enableSpendingLimit(state) {
            state.enabled = true;
        },
        disableSpendingLimit(state) {
            state.enabled = false;
            state.limit = null;
        },
    },
});

export const { setSpendingLimit, enableSpendingLimit, disableSpendingLimit } = spendingLimitSlice.actions;
export default spendingLimitSlice.reducer; 