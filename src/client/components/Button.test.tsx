import * as React from 'react';
import { shallow, configure } from 'enzyme';
import Button from './Button';

const Adapter = require('enzyme-adapter-react-16');
configure({ adapter: new Adapter() });

describe('Button', () => {
  it('should render', () => {
    shallow(<Button />);
  });
});
