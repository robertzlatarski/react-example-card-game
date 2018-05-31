import * as React from 'react';
import styled from 'styled-components';
import Button from './Button';
import Card from './Card';
import { FaceDown } from '../models/snap';
import { Players } from '../App';

interface Props {
  readonly onSnapClick: (player: Players) => void;
  readonly onDeckClick: (player: Players) => void;
  readonly player: Players;
  readonly onTurn: boolean;
  readonly numberOfCards?: number;
}

const StyledPlayerDeck = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button)`
  margin: 1rem 0;
`;

const PlayerDeck: React.SFC<Props> = ({
  onSnapClick,
  onDeckClick,
  player,
  onTurn,
  numberOfCards,
}) => (
  <StyledPlayerDeck>
    {numberOfCards && <span>Remaining: {numberOfCards}</span>}
    <Card onClick={onDeckClick.bind(null, player)} suit={FaceDown} rank={0} />
    <span>{player}</span>
    <StyledButton onClick={onSnapClick.bind(null, player)}>Snap!</StyledButton>
    {onTurn && <span> Your turn!</span>}
  </StyledPlayerDeck>
);

export default PlayerDeck;
