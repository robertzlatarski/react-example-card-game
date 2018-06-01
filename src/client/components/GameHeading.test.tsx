import * as React from 'react';
import { shallow, configure } from 'enzyme';
import GameHeading from './GameHeading';

const Adapter = require('enzyme-adapter-react-16');
configure({ adapter: new Adapter() });

describe('GameHeading', () => {
  it('should render', () => {
    shallow(<GameHeading />);
  });
});
