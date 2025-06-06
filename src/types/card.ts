export interface Card {
    id: string;
    name: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    isFrozen: boolean;
    isActive: boolean;
    weeklyLimitEnabled: boolean;
    weeklyLimit: number | null;
} 