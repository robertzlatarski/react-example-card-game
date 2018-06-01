import * as React from 'react';
import { shallow, configure } from 'enzyme';
import Card from './Card';
import { CardSuits } from '../models/snap';

const Adapter = require('enzyme-adapter-react-16');
configure({ adapter: new Adapter() });

describe('Card', () => {
  it('should render', () => {
    shallow(<Card rank={3} suit={CardSuits.Clubs} />);
  });
});
