import * as React from 'react';
import GameHeading from './components/GameHeading';
import PlayerDeck from './components/PlayerDeck';
import GameWrapper from './components/GameWrapper';
import GameControls from './components/GameControls';
import CardPool from './components/CardPool';
import {
  Deck,
  generateDeck,
  shuffle,
  isSnapValid,
  isGameOver,
} from './models/snap';

export enum Players {
  Player1 = 'Robert',
  Player2 = 'Dani',
}

interface Player {
  readonly deck?: Deck;
  readonly pool?: Deck;
}

interface StateProps {
  readonly isStarted: boolean;
  readonly winner?: Players;
  readonly numberOfCards?: number;

  readonly player1: Player;

  readonly player2: Player;

  readonly turn: Players;
}

const initialState: StateProps = {
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
      player1: { pool: player1Pool, deck: player1Deck },
      player2: { pool: player2Pool, deck: player2Deck },
    } = state;

    if (isGameOver(player1Pool, player1Deck)) {
      this.gameOver(Players.Player2);
    }

    if (isGameOver(player2Pool, player2Deck)) {
      this.gameOver(Players.Player1);
    }
  };

  player1CollectPool = (player1: Player, player2: Player) => {
    const { pool: player1Pool = [], deck: player1Deck = [] } = player1;
    const { pool: player2Pool = [] } = player2;

    this.setState({
      player1: {
        deck: [...(player1Deck || []), ...player2Pool, ...player1Pool],
        pool: [],
      },
      player2: {
        ...player2,
        pool: [],
      },
    });
  };

  player2CollectPool = (player1: Player, player2: Player) => {
    const { pool: player1Pool = [] } = player1;
    const { pool: player2Pool = [], deck: player2Deck = [] } = player2;

    this.setState({
      player2: {
        deck: [...player2Deck, ...player2Pool, ...player1Pool],
        pool: [],
      },
      player1: {
        ...player1,
        pool: [],
      },
    });
  };

  onSnapClick = (player: Players) => {
    const {
      player1: { pool: player1Pool },
      player2: { pool: player2Pool },
      player1,
      player2,
    } = this.state;

    if (!player1Pool || !player2Pool) {
      return;
    }

    if (!isSnapValid(player1Pool, player2Pool)) {
      if (player === Players.Player1) {
        this.player2CollectPool(player1, player2);
      }
      if (player === Players.Player2) {
        this.player1CollectPool(player1, player2);
      }

      return;
    }

    if (player === Players.Player1) {
      this.player1CollectPool(player1, player2);
    }

    if (player === Players.Player2) {
      this.player2CollectPool(player1, player2);
    }
  };

  changeTurn = () => {
    this.setState(state => ({
      turn: state.turn === Players.Player1 ? Players.Player2 : Players.Player1,
    }));
  };

  onDeckClick = (player: Players) => {
    if (!this.state.isStarted) {
      return;
    }

    if (player === Players.Player1 && this.state.turn === Players.Player1) {
      if (this.state.player1.deck && this.state.player1.deck.length === 0) {
        this.changeTurn();
        return;
      }

      const { pool = [], deck } = this.state.player1;
      const card = deck!.shift()!;

      this.setState({
        player1: {
          pool: [...pool, card],
          deck,
        },
      });

      this.changeTurn();
    }

    if (player === Players.Player2 && this.state.turn === Players.Player2) {
      if (this.state.player2.deck && this.state.player2.deck.length === 0) {
        this.changeTurn();
        return;
      }

      const { pool = [], deck } = this.state.player2;
      const card = deck!.shift()!;

      this.setState({
        player2: {
          pool: [...pool, card],
          deck,
        },
      });

      this.changeTurn();
    }
  };

  onStartResetClick = () => {
    if (this.state.isStarted || this.state.winner) {
      this.reset();
      return;
    }

    const allCards = shuffle(generateDeck(this.state.numberOfCards));
    const allCardsLength = allCards.length;
    const halfDeckSize = Math.ceil(allCardsLength / 2);

    const player1Deck = allCards.slice(0, halfDeckSize);
    const player2Deck = allCards.slice(halfDeckSize, allCardsLength);

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
