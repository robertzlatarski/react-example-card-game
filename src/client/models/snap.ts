import { StateProps } from '../App';

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

export enum Players {
  Player1 = 'Robert',
  Player2 = 'Dani',
}

export interface Player {
  readonly deck?: Deck;
  readonly pool?: Deck;
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

export const isGameOver = (deck: Deck, pool: Deck): boolean =>
  !!deck && deck.length === 0 && !!pool && pool.length === 0;

export const splitDeck = (deck: Deck, splitBy: number) => {
  const allCardsLength = deck.length;
  const deckPartSize = Math.ceil(allCardsLength / splitBy);

  const decks = [];

  for (let i = 0; i < allCardsLength; i += deckPartSize) {
    const deckPart = deck.slice(i, i + deckPartSize);
    decks.push(deckPart);
  }
  return decks;
};

export const doSnap = (
  playerTriggered: Players,
  player1: Player,
  player2: Player
): Partial<StateProps> => {
  const player1Pool = player1.pool || [];
  const player2Pool = player2.pool || [];
  const pool = [...player1Pool, ...player2Pool];

  let winnerName: string;
  let winnerDeck: Deck;
  let looserName: string;
  let looser: Player;

  if (
    playerTriggered === Players.Player1 &&
    isSnapValid(player1Pool, player2Pool)
  ) {
    winnerName = 'player1';
    winnerDeck = player1.deck || [];
    looserName = 'player2';
    looser = player2;
  } else {
    winnerName = 'player2';
    winnerDeck = player2.deck || [];
    looserName = 'player1';
    looser = player1;
  }

  return {
    [winnerName]: {
      deck: [...winnerDeck, ...pool],
      pool: [],
    },
    [looserName]: {
      ...looser,
      pool: [],
    },
  };
};
