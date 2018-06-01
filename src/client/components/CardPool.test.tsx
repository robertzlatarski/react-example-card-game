import * as React from 'react';
import { shallow, configure } from 'enzyme';
import { CardSuits, Deck } from '../models/snap';
import CardPool from './CardPool';
import Card from './Card';

const Adapter = require('enzyme-adapter-react-16');
configure({ adapter: new Adapter() });

describe('CardPool', () => {
  it('should render', () => {
    shallow(<CardPool />);
  });

  it('should render cards', () => {
    const cards: Deck = [
      { suit: CardSuits.Clubs, rank: 2 },
      { suit: CardSuits.Clubs, rank: 3 },
    ];
    const wrapper = shallow(<CardPool cards={cards} />);

    expect(wrapper.find(Card)).toHaveLength(2);
  });
});
