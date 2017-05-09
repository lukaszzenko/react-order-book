import React from 'react';
import {shallow} from 'enzyme';
import OrderBook from './OrderBook';
import AskOrder from './AskOrder';
import BidOrder from './BidOrder';

describe('OrderBook', () => {

  it('renders empty table without crashing', () => {
    const props = {askOrders: [], bidOrders: []};
    const orderBookWrapper = shallow(<OrderBook {...props} />);
    expect(orderBookWrapper.find('table').length).toBe(1);
    expect(orderBookWrapper.find('tr').length).toBe(1); // header row

  });

  it('renders table with 4 rows', () => {
    const props = {
      askOrders: [
        {price: 711.34, quantity: 72},
        {price: 711.32, quantity: 10}
      ],
      bidOrders: [
        {price: 711.14, quantity: 10},
        {price: 711, quantity: 2000}
      ]
    };
    const orderBookWrapper = shallow(<OrderBook {...props} />);

    expect(orderBookWrapper.find(AskOrder).length).toBe(2);
    expect(orderBookWrapper.find(AskOrder).first().props()).toEqual({
      price: 711.34,
      quantity: 72,
      maxCumulative: 2010,
      cumulative: 82
    });
    expect(orderBookWrapper.find(AskOrder).at(1).props()).toEqual({
      price: 711.32,
      quantity: 10,
      maxCumulative: 2010,
      cumulative: 10
    });

    expect(orderBookWrapper.find(BidOrder).length).toBe(2);
    expect(orderBookWrapper.find(BidOrder).first().props()).toEqual({
      price: 711.14,
      quantity: 10,
      maxCumulative: 2010,
      cumulative: 10
    });
    expect(orderBookWrapper.find(BidOrder).at(1).props()).toEqual({
      price: 711,
      quantity: 2000,
      maxCumulative: 2010,
      cumulative: 2010
    });
  });

});
