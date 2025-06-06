import {
    SET_SPENDING_LIMIT,
    ENABLE_SPENDING_LIMIT,
    DISABLE_SPENDING_LIMIT,
    SetSpendingLimitAction,
    EnableSpendingLimitAction,
    DisableSpendingLimitAction,
} from './types';

export const setSpendingLimit = (cardId: string, limit: number): SetSpendingLimitAction => ({
    type: SET_SPENDING_LIMIT,
    payload: { cardId, limit },
});

export const enableSpendingLimit = (cardId: string): EnableSpendingLimitAction => ({
    type: ENABLE_SPENDING_LIMIT,
    payload: { cardId },
});

export const disableSpendingLimit = (cardId: string): DisableSpendingLimitAction => ({
    type: DISABLE_SPENDING_LIMIT,
    payload: { cardId },
}); 