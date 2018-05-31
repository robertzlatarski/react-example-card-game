import * as React from 'react';
import styled from 'styled-components';
import Button from './Button';

interface Props {
  readonly isStarted: boolean;
  readonly onStartResetClick: () => void;
  readonly numberOfCards?: number;
  readonly onNumberOfCardsChange: (
    ev: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const StyledGameControls = styled.div`
  margin: 4rem 0;
  display: flex;
  min-width: 20rem;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const StyledInput = styled.input`
  margin-left: 0.3rem;
  width: 2rem;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlayerDeck: React.SFC<Props> = ({
  onStartResetClick,
  isStarted,
  numberOfCards,
  onNumberOfCardsChange,
}) => (
  <StyledWrapper>
    <StyledGameControls>
      <Button onClick={onStartResetClick}>
        {isStarted ? 'Reset' : 'Start'}
      </Button>
      <span>
        Cards in game:
        <StyledInput
          type="number"
          value={numberOfCards}
          onChange={onNumberOfCardsChange}
        />
      </span>
    </StyledGameControls>
    <span>
      Controls player 1: Draw: click on deck or press 'a'; Snap: click or press
      's'
    </span>
    <span>
      Controls player 2: Draw: click on deck or press 'k'; Snap: click or press
      'l'
    </span>
  </StyledWrapper>
);

export default PlayerDeck;
