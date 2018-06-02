import * as React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Button from './Button';
import PlayerDeck from './PlayerDeck';
import Card from './Card';
import { Players } from '../models/snap';

const Adapter = require('enzyme-adapter-react-16');
configure({ adapter: new Adapter() });

const onSnapClickMock = jest.fn();
const onDeckClickMock = jest.fn();

describe('PlayerDeck', () => {
  const props = {
    onSnapClick: onSnapClickMock,
    onDeckClick: onDeckClickMock,
    player: Players.Player1,
    onTurn: true,
    numberOfCards: 11,
  };
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render', () => {
    shallow(<PlayerDeck {...props} />);
  });

  it('should render components and text', () => {
    const wrapper = mount(<PlayerDeck {...props} />);

    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Card)).toHaveLength(1);
    expect(wrapper.text().includes(props.numberOfCards.toString())).toBe(true);
    expect(wrapper.text().includes('Your turn!')).toBe(true);
    expect(wrapper.text().includes(Players.Player1)).toBe(true);
  });

  it('should not render text', () => {
    const modifiedProps = {
      ...props,
      onTurn: false,
      numberOfCards: undefined,
    };
    const wrapper = mount(<PlayerDeck {...modifiedProps} />);

    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Card)).toHaveLength(1);
    expect(wrapper.text().includes(props.numberOfCards.toString())).toBe(false);
    expect(wrapper.text().includes('Your turn!')).toBe(false);
  });

  it('should call functions', () => {
    const wrapper = mount(<PlayerDeck {...props} />);
    wrapper.find(Card).simulate('click');
    wrapper.find(Button).simulate('click');
    expect(onSnapClickMock).toHaveBeenCalledTimes(1);
    expect(onDeckClickMock).toHaveBeenCalledTimes(1);
  });
});
