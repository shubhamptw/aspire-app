import { Card } from '../types/card';

export function generateCardNumber(): string {
    return Array(4)
        .fill(0)
        .map(() => Math.floor(1000 + Math.random() * 9000).toString())
        .join('   ');
}

export function generateExpiryDate(): string {
    const now = new Date();
    const year = now.getFullYear() + 3;
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    return `${month}/${year.toString().slice(-2)}`;
}

export function generateCVV(): string {
    return Math.floor(100 + Math.random() * 900).toString();
}

export function generateId(): string {
    return Math.random().toString(36).substr(2, 9);
}

export function createNewCard(name: string): Card {
    return {
        id: generateId(),
        name,
        cardNumber: generateCardNumber(),
        expiryDate: generateExpiryDate(),
        cvv: generateCVV(),
        isFrozen: false,
        isActive: true,
        weeklyLimitEnabled: false,
        weeklyLimit: null,
    };
}

export function getInitialCards(): Card[] {
    return [
        {
            id: generateId(),
            name: 'Mark Henry',
            cardNumber: '5647   3411   2413   2020',
            expiryDate: '12/25',
            cvv: '456',
            isFrozen: false,
            isActive: true,
            weeklyLimitEnabled: false,
            weeklyLimit: null,
        },
    ];
} 