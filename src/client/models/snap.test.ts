import { generateDeck, randomNumber, Card, isSnapValid } from './snap';

describe('snap', () => {
  describe('generateDeck', () => {
    const deck = generateDeck(10);

    it('should return a deck of x length cards ', () => {
      expect(deck).toHaveLength(12);
    });

    it('should return a deck containing Card objects', () => {
      const card = deck[0];
      const mockCard: Card = {
        suit: expect.any(Number),
        rank: expect.any(Number),
      };

      expect(card).toMatchObject(mockCard);
    });

    it('should generate unique cards', () => {
      const hasRepetition = deck.some(card => {
        const cardString = JSON.stringify(card);
        const deckString = JSON.stringify(deck);

        const trimmedDeckString = deckString.replace(cardString, '');

        return (
          trimmedDeckString.length !== deckString.length - cardString.length
        );
      });

      expect(hasRepetition).toBe(false);
    });
  });

  describe('randomNumber', () => {
    const num = randomNumber(5);

    it('should be between 0 and 5', () => {
      expect(num).toBeLessThan(5);
      expect(num).toBeGreaterThanOrEqual(0);
    });
  });

  describe('isSnapValid', () => {
    it('should return true if 2 decks share common card', () => {
      const deck = [
        { suit: 1, rank: 1 },
        { suit: 2, rank: 1 },
        { suit: 3, rank: 1 },
      ];

      const deck1 = [
        { suit: 1, rank: 2 },
        { suit: 2, rank: 3 },
        { suit: 3, rank: 1 },
      ];

      expect(isSnapValid(deck, deck1)).toBe(true);
    });

    it('should return false if 2 decks do not share common card', () => {
      const deck = [
        { suit: 1, rank: 1 },
        { suit: 2, rank: 1 },
        { suit: 3, rank: 1 },
      ];

      const deck1 = [
        { suit: 1, rank: 2 },
        { suit: 2, rank: 3 },
        { suit: 3, rank: 4 },
      ];

      expect(isSnapValid(deck, deck1)).toBe(false);
    });
  });
});
