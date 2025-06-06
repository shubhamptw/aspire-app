import { generateCardNumber, generateId, createNewCard } from '../cardUtils';

describe('Card Utils', () => {
    describe('generateCardNumber', () => {
        it('should generate a card number with 4 groups of 4 digits', () => {
            const cardNumber = generateCardNumber();
            const groups = cardNumber.split('   ');

            expect(groups.length).toBe(4);
            groups.forEach(group => {
                expect(group.length).toBe(4);
                expect(/^\d{4}$/.test(group)).toBe(true);
            });
        });
    });

    describe('generateId', () => {
        it('should generate a non-empty string', () => {
            const id = generateId();
            expect(id).toBeTruthy();
            expect(typeof id).toBe('string');
        });

        it('should generate different IDs on each call', () => {
            const id1 = generateId();
            const id2 = generateId();
            expect(id1).not.toBe(id2);
        });
    });

    describe('createNewCard', () => {
        it('should create a new card with the given name', () => {
            const name = 'John Doe';
            const card = createNewCard(name);

            expect(card.name).toBe(name);
            expect(card.id).toBeTruthy();
            expect(card.cardNumber).toBeTruthy();
            expect(card.expiryDate).toBeTruthy();
            expect(card.cvv).toBeTruthy();
            expect(card.isFrozen).toBe(false);
            expect(card.isActive).toBe(true);
            expect(card.weeklyLimitEnabled).toBe(false);
            expect(card.weeklyLimit).toBe(null);
        });
    });
}); 