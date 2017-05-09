import React from 'react';
import {shallow} from 'enzyme';
import AskOrder from './AskOrder';

describe('AskOrder', () => {
  it('renders row for ask order', () => {
    const props = {quantity: 40, price: 2200.15, maxCumulative: 400, cumulative: 80};
    const orderWrapper = shallow(<AskOrder {...props} />);
    expect(orderWrapper.find('tr').length).toBe(1);
    expect(orderWrapper.find('td').length).toBe(5);
    expect(orderWrapper.find('td').map(node => node.text())).toEqual(["", "", "2200.15", "40", "80"]);
    const lastCell = orderWrapper.find('td').last();
    expect(lastCell.prop("style")).toEqual({backgroundSize: "20% 100%"});
    expect(lastCell.hasClass('fill-ask')).toBeTruthy();
  });

  it('renders correct percentage for zero maximum cumulative quantity', () => {
    const props = {quantity: 50, price: 15, maxCumulative: 0, cumulative: 50};
    const orderWrapper = shallow(<AskOrder {...props} />);
    expect(orderWrapper.find('td').last().prop("style")).toEqual({backgroundSize: "0% 100%"});
  });

  it('doesn\'t render negative percentage', () => {
    const props = {quantity: 50, price: 15, maxCumulative: -5, cumulative: 50};
    const orderWrapper = shallow(<AskOrder {...props} />);
    expect(orderWrapper.find('td').last().prop("style")).toEqual({backgroundSize: "0% 100%"});
  });

  it('doesn\'t render percentage greater than 100%', () => {
    const props = {quantity: 50, price: 15, maxCumulative: 1, cumulative: 50};
    const orderWrapper = shallow(<AskOrder {...props} />);
    expect(orderWrapper.find('td').last().prop("style")).toEqual({backgroundSize: "100% 100%"});
  });
});
