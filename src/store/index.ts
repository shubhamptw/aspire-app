import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import spendingLimitReducer from './spendingLimit/reducer';
import cardsReducer from './cardsSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['cards'], // only persist the cards slice
};

const rootReducer = {
    spendingLimit: spendingLimitReducer,
    cards: cardsReducer,
};

const persistedReducer = persistReducer(persistConfig, (state, action) => {
    return {
        spendingLimit: rootReducer.spendingLimit(state?.spendingLimit, action),
        cards: rootReducer.cards(state?.cards, action),
    };
});

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 