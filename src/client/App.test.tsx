jest.mock('./models/snap');

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App, { initialState } from './App';
import {
  mount,
  ReactWrapper,
  shallow,
  ShallowWrapper,
  configure,
} from 'enzyme';
import GameHeading from './components/GameHeading';
import GameWrapper from './components/GameWrapper';
import PlayerDeck from './components/PlayerDeck';
import CardPool from './components/CardPool';
import GameControls from './components/GameControls';
import {
  Card,
  CardSuits,
  Players,
  generateDeck,
  shuffle,
  isSnapValid,
  isGameOver,
  splitDeck,
  doSnap,
} from './models/snap';
const Snap = require.requireActual('./models/snap');

const Adapter = require('enzyme-adapter-react-16');
configure({ adapter: new Adapter() });

describe('App', () => {
  beforeAll(() => {
    (generateDeck as any).mockImplementation(Snap.generateDeck);
    (shuffle as any).mockImplementation(Snap.shuffle);
    (isSnapValid as any).mockImplementation(Snap.isSnapValid);
    (isGameOver as any).mockImplementation(Snap.isGameOver);
    (splitDeck as any).mockImplementation(Snap.splitDeck);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('render', () => {
    let wrapper: ShallowWrapper | ReactWrapper;
    it('should render GameHeading', () => {
      wrapper = shallow(<App />);

      expect(wrapper.find(GameHeading)).toHaveLength(1);
    });

    it('should render a winner', () => {
      wrapper = mount(<App />);
      wrapper.setState({ winner: Players.Player1 });

      expect(wrapper.find(GameHeading)).toHaveLength(2);
      expect(wrapper.find(GameHeading).get(1).props.children).toContain(
        Players.Player1
      );
    });

    it('should render a GameWrapper', () => {
      wrapper = shallow(<App />);

      expect(wrapper.find(GameWrapper)).toHaveLength(1);
    });

    it('should render two PlayerDeck', () => {
      wrapper = shallow(<App />);

      expect(wrapper.find(PlayerDeck)).toHaveLength(2);
    });

    it('should render two CardPool', () => {
      wrapper = shallow(<App />);

      expect(wrapper.find(CardPool)).toHaveLength(2);
    });

    it('should render two GameControls', () => {
      wrapper = shallow(<App />);

      expect(wrapper.find(GameControls)).toHaveLength(1);
    });
  });

  describe('End Game', () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = mount(<App />);
      (wrapper.instance() as any).onStartResetClick();
    });

    it('should set a winner', () => {
      wrapper.setState({ player1: { deck: [], pool: [] } });
      expect(wrapper.state()).toHaveProperty('winner', Players.Player2);
      expect(wrapper.state()).toHaveProperty('isStarted', false);
    });

    it('should not set a winner if a card is still in deck', () => {
      wrapper.setState({ player1: { deck: [expect.any(Object)], pool: [] } });
      expect(wrapper.state()).toHaveProperty('winner', undefined);
      expect(wrapper.state()).toHaveProperty('isStarted', true);
    });

    it('should not set a winner if a card is still in deck', () => {
      const card: Card = {
        suit: CardSuits.Clubs,
        rank: 3,
      };

      wrapper.setState({ player1: { deck: [], pool: [card] } });
      expect(wrapper.state()).toHaveProperty('winner', undefined);
      expect(wrapper.state()).toHaveProperty('isStarted', true);
    });
  });

  describe('Start game', () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = mount(<App />);
      (wrapper.instance() as any).onStartResetClick();
    });

    it('should start game if not started', () => {
      expect(wrapper.state()).toHaveProperty('isStarted', true);
      expect(wrapper.state()).toHaveProperty('player1', {
        deck: expect.any(Array),
      });
      expect(wrapper.state()).toHaveProperty('player2', {
        deck: expect.any(Array),
      });
    });

    it('should reset game if already started', () => {
      (wrapper.instance() as any).onStartResetClick();

      expect(wrapper.state()).toEqual(initialState);
    });

    it('should reset game if there is winner started', () => {
      wrapper.setState({ winner: Players.Player1 });

      (wrapper.instance() as any).onStartResetClick();

      expect(wrapper.state()).toEqual(initialState);
    });
  });

  describe('Draw card', () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = mount(<App />);
      (wrapper.instance() as any).onStartResetClick();
    });

    it('should draw a card if it is players turn and then change turn', () => {
      const deck = (wrapper.state() as any).player1.deck;
      (wrapper.instance() as any).drawCard(Players.Player1);
      const pool = [deck.shift()];
      expect(wrapper.state()).toHaveProperty('player1', {
        deck,
        pool,
      });

      expect(wrapper.state()).toHaveProperty('turn', Players.Player2);
    });

    it('should not draw a card if it is not players turn and should change turn', () => {
      const deck = (wrapper.state() as any).player1.deck;
      (wrapper.instance() as any).changeTurn();
      (wrapper.instance() as any).drawCard(Players.Player1);

      expect(wrapper.state()).toHaveProperty('player1', {
        deck,
      });

      expect(wrapper.state()).toHaveProperty('turn', Players.Player2);
    });

    it('should not draw a card if players deck is empty and change turn', () => {
      wrapper.setState({ player1: {} });
      (wrapper.instance() as any).drawCard(Players.Player1);

      expect(wrapper.state()).toHaveProperty('player1', {});

      expect(wrapper.state()).toHaveProperty('turn', Players.Player2);
    });
  });

  describe.only('onSnapClick', () => {
    let wrapper: ReactWrapper;
    const mockState = { state: 'state' };

    beforeAll(() => {
      (doSnap as any).mockImplementation(() => mockState);
    });

    beforeEach(() => {
      wrapper = mount(<App />);
      (wrapper.instance() as any).onStartResetClick();
    });

    it('should not perform snap if any of the pools is empty', () => {
      (wrapper.instance() as any).onSnapClick(Players.Player1);
      expect(doSnap).toHaveBeenCalledTimes(0);
    });

    it('should set state to result of snap function', () => {
      (wrapper.instance() as any).drawCard(Players.Player1);
      (wrapper.instance() as any).drawCard(Players.Player2);
      (wrapper.instance() as any).onSnapClick(Players.Player1);

      expect(doSnap).toHaveBeenCalledTimes(1);
      expect(wrapper.state()).toHaveProperty('state', 'state');
    });
  });
});
