import * as React from 'react';
import { shallow, configure } from 'enzyme';
import GameWrapper from './GameWrapper';

const Adapter = require('enzyme-adapter-react-16');
configure({ adapter: new Adapter() });

describe('GameWrapper', () => {
  it('should render', () => {
    shallow(<GameWrapper />);
  });
});
