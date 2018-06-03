import * as React from 'react';
import GameHeading from './components/GameHeading';
import PlayerDeck from './components/PlayerDeck';
import GameWrapper from './components/GameWrapper';
import GameControls from './components/GameControls';
import CardPool from './components/CardPool';
import {
  generateDeck,
  shuffle,
  isGameOver,
  doSnap,
  splitDeck,
  Players,
  Player,
} from './models/snap';

export interface StateProps {
  readonly isStarted: boolean;
  readonly winner?: Players;
  readonly numberOfCards?: number;

  readonly player1: Player;

  readonly player2: Player;

  readonly turn: Players;
}

export const initialState: StateProps = {
  isStarted: false,
  numberOfCards: 12,
  player1: {},
  player2: {},
  turn: Players.Player1,
  winner: undefined,
};

Object.freeze(initialState);

class App extends React.Component<{}, StateProps> {
  player1 = Players.Player1;
  player2 = Players.Player2;

  state = initialState;

  componentWillUpdate(nextProps: {}, nextState: StateProps) {
    if (nextState !== this.state && !nextState.winner && nextState.isStarted) {
      this.checkEndGame(nextState);
    }
  }

  gameOver = (winner: Players) => {
    this.setState({ isStarted: false, winner });
  };

  checkEndGame = (state: StateProps) => {
    const {
      player1: { pool: player1Pool = [], deck: player1Deck = [] },
      player2: { pool: player2Pool = [], deck: player2Deck = [] },
    } = state;

    if (isGameOver(player1Pool, player1Deck)) {
      this.gameOver(Players.Player2);
    }

    if (isGameOver(player2Pool, player2Deck)) {
      this.gameOver(Players.Player1);
    }
  };

  onSnapClick = (player: Players) => {
    const { player1, player2 } = this.state;

    if (!player1.pool || !player2.pool) {
      return;
    }

    const newState = doSnap(player, player1, player2);

    this.setState(newState as any);
  };

  changeTurn = () => {
    this.setState(state => ({
      turn: state.turn === Players.Player1 ? Players.Player2 : Players.Player1,
    }));
  };

  drawCard = (playerTriggered: Players) => {
    if (this.state.turn !== playerTriggered) {
      return;
    }

    const playerKey =
      playerTriggered === Players.Player1 ? 'player1' : 'player2';

    const player = this.state[playerKey];
    const deck = [...(player.deck || [])];

    if (deck.length === 0) {
      // Player does not have any cards left in the deck, change turn.
      this.changeTurn();
      return;
    }

    const drawnCard = deck.shift()!;
    const pool = player.pool || [];

    this.setState({
      [playerKey]: {
        deck,
        pool: [...pool, drawnCard],
      },
    } as any);

    this.changeTurn();
  };

  onDeckClick = (player: Players) => {
    if (!this.state.isStarted) {
      return;
    }

    this.drawCard(player);
  };

  onStartResetClick = () => {
    if (this.state.isStarted || this.state.winner) {
      this.reset();
      return;
    }

    const allCards = shuffle(generateDeck(this.state.numberOfCards));
    const [player1Deck, player2Deck] = splitDeck(allCards, 2);

    this.setState({
      isStarted: true,
      player1: { deck: player1Deck },
      player2: { deck: player2Deck },
    });
  };

  reset = () => {
    this.setState({ ...initialState });
  };

  onNumberOfCardsChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const numberOfCards = Number(ev.target.value) || 0;

    this.setState({ numberOfCards });
  };

  onKeyPress = (ev: any) => {
    switch (ev.keyCode) {
      case 65: // a
        this.onDeckClick(Players.Player1);
        break;
      case 83: // s
        this.onSnapClick(Players.Player1);
        break;
      case 75: // k
        this.onDeckClick(Players.Player2);
        break;
      case 76: // l
        this.onSnapClick(Players.Player2);
        break;
    }
  };

  render() {
    const {
      isStarted,
      numberOfCards,
      turn,
      winner,
      player1,
      player2,
    } = this.state;

    return (
      <div onKeyUp={this.onKeyPress} tabIndex={0}>
        <GameHeading>Snap Game</GameHeading>

        {winner && <GameHeading>Winner is: {winner}</GameHeading>}

        <GameWrapper>
          <PlayerDeck
            player={this.player1}
            onSnapClick={this.onSnapClick}
            onDeckClick={this.onDeckClick}
            onTurn={isStarted && turn === Players.Player1}
            numberOfCards={player1.deck && player1.deck.length}
          />
          <CardPool cards={this.state.player1.pool} />
          <CardPool cards={this.state.player2.pool} />
          <PlayerDeck
            player={this.player2}
            onSnapClick={this.onSnapClick}
            onDeckClick={this.onDeckClick}
            onTurn={isStarted && turn === Players.Player2}
            numberOfCards={player2.deck && player2.deck.length}
          />
        </GameWrapper>
        <GameControls
          isStarted={isStarted}
          onStartResetClick={this.onStartResetClick}
          numberOfCards={numberOfCards}
          onNumberOfCardsChange={this.onNumberOfCardsChange}
        />
      </div>
    );
  }
}

export default App;
