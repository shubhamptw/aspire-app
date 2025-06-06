export const SET_SPENDING_LIMIT = 'SET_SPENDING_LIMIT';
export const ENABLE_SPENDING_LIMIT = 'ENABLE_SPENDING_LIMIT';
export const DISABLE_SPENDING_LIMIT = 'DISABLE_SPENDING_LIMIT';

export interface SetSpendingLimitAction {
    type: typeof SET_SPENDING_LIMIT;
    payload: { cardId: string; limit: number };
}

export interface EnableSpendingLimitAction {
    type: typeof ENABLE_SPENDING_LIMIT;
    payload: { cardId: string };
}

export interface DisableSpendingLimitAction {
    type: typeof DISABLE_SPENDING_LIMIT;
    payload: { cardId: string };
}

export type SpendingLimitActionTypes =
    | SetSpendingLimitAction
    | EnableSpendingLimitAction
    | DisableSpendingLimitAction; 