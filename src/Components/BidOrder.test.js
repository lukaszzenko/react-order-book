import React from 'react';
import {shallow} from 'enzyme';
import BidOrder from './BidOrder';

describe('BidOrder', () => {
  it('renders row for bid order', () => {
    const props = {quantity: 10, price: 0.051, maxCumulative: 100, cumulative: 100};
    const orderWrapper = shallow(<BidOrder {...props} />);
    expect(orderWrapper.find('tr').length).toBe(1);
    expect(orderWrapper.find('td').length).toBe(5);
    expect(orderWrapper.find('td').map(node => node.text())).toEqual(["100", "10", "0.051", "", ""]);
    const firstCell = orderWrapper.find('td').first();
    expect(firstCell.prop("style")).toEqual({backgroundSize: "100% 100%"});
    expect(firstCell.hasClass('fill-bid')).toBeTruthy();
  });

  it('renders correct percentage for zero cumulative quantity', () => {
    const props = {quantity: 0, price: 0, maxCumulative: 10, cumulative: 0};
    const orderWrapper = shallow(<BidOrder {...props} />);
    expect(orderWrapper.find('td').first().prop("style")).toEqual({backgroundSize: "0% 100%"});
  });

  it('doesn\'t render negative percentage', () => {
    const props = {quantity: 0, price: 1, maxCumulative: 1, cumulative: -50};
    const orderWrapper = shallow(<BidOrder {...props} />);
    expect(orderWrapper.find('td').first().prop("style")).toEqual({backgroundSize: "0% 100%"});
  });

  it('doesn\'t render percentage greater than 100%', () => {
    const props = {quantity: 1, price: 0, maxCumulative: 10, cumulative: 20};
    const orderWrapper = shallow(<BidOrder {...props} />);
    expect(orderWrapper.find('td').first().prop("style")).toEqual({backgroundSize: "100% 100%"});
  });
});
