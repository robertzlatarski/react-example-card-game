export interface Card {
  readonly suit: CardSuits;
  readonly rank: number;
}

export type Deck = Card[];

export enum CardSuits {
  Spades = 'Spades',
  Hearts = 'Hearts',
  Diamonds = 'Diamonds',
  Clubs = 'Clubs',
}

export const FaceDown = 'FaceDown';

const cardRanks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const generateCard = (suit: CardSuits, rank: number): Card => ({ suit, rank });

export const generateDeck = (size: number = 52): Deck => {
  const cardsPerSuit = Math.ceil(size / Object.keys(CardSuits).length);

  const deck: Deck = [];

  const ranks = cardRanks.slice(0, cardsPerSuit);

  ranks.forEach(rank => {
    Object.keys(CardSuits).forEach(suit => {
      deck.push(generateCard(CardSuits[suit], rank));
    });
  });

  return deck;
};

export const randomNumber = (length: number) =>
  Math.floor(Math.random() * length);

export const shuffle = (deck: Deck): Deck => {
  let deckSize = deck.length;
  let index;
  let temp;
  const shuffledDeck = [...deck];

  while (deckSize > 0) {
    index = randomNumber(deckSize);
    deckSize--;
    temp = shuffledDeck[deckSize];
    shuffledDeck[deckSize] = shuffledDeck[index];
    shuffledDeck[index] = temp;
  }

  return shuffledDeck;
};

export const isSnapValid = (deck: Deck, deck2: Deck): boolean =>
  deck.some(card => deck2.some(card2 => card.rank === card2.rank));

export const isGameOver = (deck?: Deck, pool?: Deck): boolean =>
  !!deck && deck.length === 0 && !!pool && pool.length === 0;
