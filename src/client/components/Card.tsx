import * as React from 'react';
import styled, { StyledFunction } from 'styled-components';

interface CardContent {
  readonly spades: {
    [rank: number]: string;
  };
  readonly hearts: {
    [rank: number]: string;
  };
  readonly diamonds: {
    [rank: number]: string;
  };
  readonly clubs: {
    [rank: number]: string;
  };
}

const cardContent: CardContent = {
  spades: {
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
  hearts: {
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
  diamonds: {
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
  clubs: {
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
};

interface Props {
  readonly suit: string;
  readonly rank: number;
  readonly onClick?: () => void;
}

const styledCard: StyledFunction<Props & React.HTMLAttributes<HTMLDivElement>> =
  styled.div;

const StyledCard = styledCard`
  font-size: 7rem;
  width: 7rem;
  height: 7rem;
  line-height: 7rem;
  &:before {
    content: '${props => cardContent[props.suit][props.rank]}'
  }
`;

export default StyledCard;
