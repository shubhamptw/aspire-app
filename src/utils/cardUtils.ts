import { Card } from '../types/card';

export const generateCardNumber = (): string => {
    const groups = Array(4).fill(0).map(() =>
        Math.floor(1000 + Math.random() * 9000).toString()
    );
    return groups.join('    ');
};

export const generateExpiryDate = (): string => {
    const month = Math.floor(1 + Math.random() * 12).toString().padStart(2, '0');
    const year = (new Date().getFullYear() + Math.floor(Math.random() * 5)).toString().slice(-2);
    return `${month}/${year}`;
};

export const generateCVV = (): string => {
    return Math.floor(100 + Math.random() * 900).toString();
};

export const generateId = (): string => {
    return Math.random().toString(36).substr(2, 9);
};

export const createNewCard = (name: string): Card => ({
    id: generateId(),
    name,
    cardNumber: generateCardNumber(),
    expiryDate: generateExpiryDate(),
    cvv: generateCVV(),
    isFrozen: false,
    isActive: true,
});

export const getInitialCards = (): Card[] => [
    {
        id: generateId(),
        name: 'Mark Henry',
        cardNumber: '5647   3411   2413   2020',
        expiryDate: '12/20',
        cvv: '456',
        isFrozen: false,
        isActive: true,
    },
    {
        id: generateId(),
        name: 'John Doe',
        cardNumber: '1234   5678   9012   3456',
        expiryDate: '09/25',
        cvv: '789',
        isFrozen: false,
        isActive: true,
    },
]; 