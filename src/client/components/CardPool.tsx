import * as React from 'react';
import styled from 'styled-components';
import Card from './Card';
import { Deck } from '../models/snap';

interface Props {
  readonly cards?: Deck;
}

const StyledCardPool = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 2rem;
  flex-wrap: wrap;
`;

const CardPool: React.SFC<Props> = ({ cards }) => (
  <StyledCardPool>
    {cards &&
      cards.map(card => (
        <Card
          key={`${card.suit}-${card.rank}`}
          suit={card.suit}
          rank={card.rank}
        />
      ))}
  </StyledCardPool>
);

export default CardPool;
