import * as React from 'react';
import { shallow, configure, mount } from 'enzyme';
import GameControls from './GameControls';
import Button from './Button';

const Adapter = require('enzyme-adapter-react-16');
configure({ adapter: new Adapter() });

const onStartResetClickMock = jest.fn();
const onNumberOfCardsChangeMock = jest.fn();

describe('GameControls', () => {
  const props = {
    onStartResetClick: onStartResetClickMock,
    isStarted: false,
    numberOfCards: 10,
    onNumberOfCardsChange: onNumberOfCardsChangeMock,
  };
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render', () => {
    shallow(<GameControls {...props} />);
  });

  it('should render components', () => {
    const wrapper = shallow(<GameControls {...props} />);

    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('should call functions', () => {
    const wrapper = mount(<GameControls {...props} />);
    wrapper.find(Button).simulate('click');
    wrapper.find('input').simulate('change');
    expect(onStartResetClickMock).toHaveBeenCalledTimes(1);
    expect(onNumberOfCardsChangeMock).toHaveBeenCalledTimes(1);
  });
});
