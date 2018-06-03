import {
  generateDeck,
  randomNumber,
  Card,
  isSnapValid,
  CardSuits,
  isGameOver,
  splitDeck,
  Deck,
  doSnap,
  Players,
} from './snap';

describe('snap', () => {
  describe('generateDeck', () => {
    const deck = generateDeck(10);

    it('should return a deck of x length cards ', () => {
      expect(deck).toHaveLength(12);
    });

    it('should return a deck containing Card objects', () => {
      const card = deck[0];
      const mockCard: Card = {
        suit: expect.any(String),
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
      const deck: Deck = [
        { suit: CardSuits.Clubs, rank: 4 },
        { suit: CardSuits.Diamonds, rank: 5 },
        { suit: CardSuits.Hearts, rank: 4 },
      ];

      const deck1: Deck = [
        { suit: CardSuits.Clubs, rank: 2 },
        { suit: CardSuits.Diamonds, rank: 3 },
        { suit: CardSuits.Hearts, rank: 4 },
      ];

      expect(isSnapValid(deck, deck1)).toBe(true);
    });

    it('should return false if 2 decks do not share common card', () => {
      const deck: Deck = [
        { suit: CardSuits.Clubs, rank: 5 },
        { suit: CardSuits.Diamonds, rank: 5 },
        { suit: CardSuits.Hearts, rank: 5 },
      ];

      const deck1: Deck = [
        { suit: CardSuits.Clubs, rank: 2 },
        { suit: CardSuits.Diamonds, rank: 3 },
        { suit: CardSuits.Hearts, rank: 4 },
      ];

      expect(isSnapValid(deck, deck1)).toBe(false);
    });
  });

  describe('isGameOver', () => {
    it('should return true', () => {
      expect(isGameOver([], [])).toBe(true);
    });

    describe('return false', () => {
      const deck: Deck = [
        { suit: CardSuits.Clubs, rank: 2 },
        { suit: CardSuits.Diamonds, rank: 2 },
        { suit: CardSuits.Hearts, rank: 2 },
      ];

      const pool: Deck = [
        { suit: CardSuits.Clubs, rank: 2 },
        { suit: CardSuits.Diamonds, rank: 3 },
        { suit: CardSuits.Hearts, rank: 4 },
      ];

      it('return false when deck is not empty', () => {
        expect(isGameOver(deck, [])).toBe(false);
      });

      it('return false when pool is not empty', () => {
        expect(isGameOver([], pool)).toBe(false);
      });

      it('return false when pool and deck are not empty', () => {
        expect(isGameOver(deck, pool)).toBe(false);
      });
    });
  });

  describe('splitDeck', () => {
    const deck: Deck = [
      { suit: CardSuits.Clubs, rank: 2 },
      { suit: CardSuits.Diamonds, rank: 2 },
      { suit: CardSuits.Hearts, rank: 2 },
      { suit: CardSuits.Spades, rank: 2 },
    ];

    it('should return an array of decks of the length provided if length is uneven ', () => {
      const result = splitDeck(deck, 3);

      expect(result).toMatchObject([
        [{ suit: CardSuits.Clubs, rank: 2 }],
        [{ suit: CardSuits.Diamonds, rank: 2 }],
        [
          { suit: CardSuits.Hearts, rank: 2 },
          { suit: CardSuits.Spades, rank: 2 },
        ],
      ]);
    });

    it('should return an array of decks of the length provided if length is even', () => {
      const result = splitDeck(deck, 2);

      expect(result).toMatchObject([
        [
          { suit: CardSuits.Clubs, rank: 2 },
          { suit: CardSuits.Diamonds, rank: 2 },
        ],
        [
          { suit: CardSuits.Hearts, rank: 2 },
          { suit: CardSuits.Spades, rank: 2 },
        ],
      ]);
    });
  });

  describe('doSnap', () => {
    const deck: Deck = [{ suit: CardSuits.Clubs, rank: 3 }];
    const pool: Deck = [
      { suit: CardSuits.Clubs, rank: 2 },
      { suit: CardSuits.Diamonds, rank: 2 },
    ];
    const pool2: Deck = [
      { suit: CardSuits.Hearts, rank: 2 },
      { suit: CardSuits.Diamonds, rank: 4 },
    ];

    describe('transfer pool if snap rules are met', () => {
      const player1 = {
        deck,
        pool,
      };
      const player2 = {
        deck: [],
        pool: pool2,
      };

      it('is trigger by player1', () => {
        const result = doSnap(Players.Player1, player1, player2);

        expect(result).toEqual({
          player1: {
            deck: [...deck, ...pool, ...pool2],
            pool: [],
          },
          player2: {
            deck: [],
            pool: [],
          },
        });
      });

      it('is trigger by player2', () => {
        const result = doSnap(Players.Player2, player1, player2);

        expect(result).toEqual({
          player2: {
            deck: [...pool, ...pool2],
            pool: [],
          },
          player1: {
            deck,
            pool: [],
          },
        });
      });
    });

    describe('transfer pool if snap rules are not met', () => {
      const pool3 = [pool2.pop()!];
      const player1 = {
        deck,
        pool,
      };
      const player2 = {
        deck: [],
        pool: pool3,
      };

      it('is trigger by player1', () => {
        const result = doSnap(Players.Player1, player1, player2);

        expect(result).toEqual({
          player2: {
            deck: [...pool, ...pool3],
            pool: [],
          },
          player1: {
            deck,
            pool: [],
          },
        });
      });

      it('is trigger by player2', () => {
        const result = doSnap(Players.Player2, player1, player2);

        expect(result).toEqual({
          player1: {
            deck: [...deck, ...pool, ...pool3],
            pool: [],
          },
          player2: {
            deck: [],
            pool: [],
          },
        });
      });
    });
  });
});
