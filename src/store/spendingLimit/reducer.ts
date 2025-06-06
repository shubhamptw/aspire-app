import {
    SET_SPENDING_LIMIT,
    ENABLE_SPENDING_LIMIT,
    DISABLE_SPENDING_LIMIT,
    SpendingLimitActionTypes,
} from './types';

export interface CardLimitState {
    limit: number | null;
    enabled: boolean;
}

export interface SpendingLimitState {
    cardLimits: {
        [cardId: string]: CardLimitState;
    };
}

const initialState: SpendingLimitState = {
    cardLimits: {},
};

export default function spendingLimitReducer(
    state = initialState,
    action: SpendingLimitActionTypes
): SpendingLimitState {
    switch (action.type) {
        case SET_SPENDING_LIMIT: {
            const { cardId, limit } = action.payload;
            return {
                ...state,
                cardLimits: {
                    ...state.cardLimits,
                    [cardId]: { limit, enabled: true },
                },
            };
        }
        case ENABLE_SPENDING_LIMIT: {
            const { cardId } = action.payload;
            return {
                ...state,
                cardLimits: {
                    ...state.cardLimits,
                    [cardId]: {
                        ...state.cardLimits[cardId],
                        enabled: true,
                    },
                },
            };
        }
        case DISABLE_SPENDING_LIMIT: {
            const { cardId } = action.payload;
            return {
                ...state,
                cardLimits: {
                    ...state.cardLimits,
                    [cardId]: { limit: null, enabled: false },
                },
            };
        }
        default:
            return state;
    }
} 