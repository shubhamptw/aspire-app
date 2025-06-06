import { Card } from '../types/card';
import { getInitialCards } from '../utils/cardUtils';

// Action Types
const SET_CARDS = 'cards/setCards';

// State
export interface CardsState {
    cards: Card[];
}

const initialState: CardsState = {
    cards: getInitialCards(),
};

// Reducer
export default function cardsReducer(state = initialState, action: any): CardsState {
    switch (action.type) {
        case SET_CARDS:
            return { ...state, cards: action.payload };
        default:
            return state;
    }
}

// Action Creators
export const setCards = (cards: Card[]) => ({ type: SET_CARDS, payload: cards }); 