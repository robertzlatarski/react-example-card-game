import styled, { StyledFunction } from 'styled-components';
import { CardSuits, FaceDown } from '../models/snap';

interface CardContent {
  readonly [CardSuits.Spades]: {
    [rank: number]: string;
  };
  readonly [CardSuits.Hearts]: {
    [rank: number]: string;
  };
  readonly [CardSuits.Diamonds]: {
    [rank: number]: string;
  };
  readonly [CardSuits.Clubs]: {
    [rank: number]: string;
  };
  readonly [FaceDown]: {
    0: string;
  };
}

const cardContent: CardContent = {
  [CardSuits.Spades]: {
    2: '\\1F0A2',
    3: '\\1F0A3',
    4: '\\1F0A4',
    5: '\\1F0A5',
    6: '\\1F0A6',
    7: '\\1F0A7',
    8: '\\1F0A8',
    9: '\\1F0A9',
    10: '\\1F0AA',
    11: '\\1F0AB',
    12: '\\1F0AC',
    13: '\\1F0AD',
    14: '\\1F0A1',
  },
  [CardSuits.Hearts]: {
    2: '\\1F0B2',
    3: '\\1F0B3',
    4: '\\1F0B4',
    5: '\\1F0B5',
    6: '\\1F0B6',
    7: '\\1F0B7',
    8: '\\1F0B8',
    9: '\\1F0B9',
    10: '\\1F0BA',
    11: '\\1F0BB',
    12: '\\1F0BC',
    13: '\\1F0BD',
    14: '\\1F0B1',
  },
  [CardSuits.Diamonds]: {
    2: '\\1F0C2',
    3: '\\1F0C3',
    4: '\\1F0C4',
    5: '\\1F0C5',
    6: '\\1F0C6',
    7: '\\1F0C7',
    8: '\\1F0C8',
    9: '\\1F0C9',
    10: '\\1F0CA',
    11: '\\1F0CB',
    12: '\\1F0CC',
    13: '\\1F0CD',
    14: '\\1F0C1',
  },
  [CardSuits.Clubs]: {
    2: '\\1F0D2',
    3: '\\1F0D3',
    4: '\\1F0D4',
    5: '\\1F0D5',
    6: '\\1F0D6',
    7: '\\1F0D7',
    8: '\\1F0D8',
    9: '\\1F0D9',
    10: '\\1F0DA',
    11: '\\1F0DB',
    12: '\\1F0DC',
    13: '\\1F0DD',
    14: '\\1F0D1',
  },
  [FaceDown]: {
    0: '\\1F0A0',
  },
};

interface Props {
  readonly suit: string;
  readonly rank: number;
  readonly onClick?: () => void;
}

const styledCard: StyledFunction<Props> = styled.div;

const Card = styledCard`
  font-size: 7rem;
  &:before {
    content: '${props => cardContent[props.suit][props.rank]}'
  }
`;

export default Card;
