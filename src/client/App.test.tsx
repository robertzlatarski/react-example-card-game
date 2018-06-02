import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
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
import { Card, CardSuits, Players } from './models/snap';

const Adapter = require('enzyme-adapter-react-16');
configure({ adapter: new Adapter() });

describe('App', () => {
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
});
