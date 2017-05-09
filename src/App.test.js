import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import App from './App';
import OrderBook from './Components/OrderBook';

describe('App', () => {
  beforeEach(() => {
    global.WebSocket = jest.fn();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('creates WebSocket', () => {
    const webSocketMock = global.WebSocket;
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    expect(webSocketMock.mock.calls.length).toBe(1);
  });

  it('correctly handles data received through web socket', () => {
    const appWrapper = mount(<App />);
    const app = appWrapper.instance();
    app.handleData('{"table":"orderBook10","action":"update","data":[{"symbol":"XBTUSD","bids":[[711.14,10],[711,2000]],"asks":[[711.32,10],[711.34,72]],"timestamp":"2016-11-15T11:44:07.027Z"}]}');
    expect(app.state.bidOrders).toEqual([
      {price: 711.14, quantity: 10},
      {price: 711, quantity: 2000}
    ]);
    expect(app.state.askOrders).toEqual([
      {price: 711.32, quantity: 10},
      {price: 711.34, quantity: 72}
    ]);
  });

  it('handles empty data returned through web socket', () => {
    const appWrapper = mount(<App />);
    expect(() => {appWrapper.instance().handleData('{}');}).not.toThrow();
  });

  it('renders OrderBook with appropriate props', () => {
    const appWrapper = mount(<App />);
    expect(appWrapper.find(OrderBook).length).toBe(1);
    const app = appWrapper.instance();
    app.handleData('{"table":"orderBook10","action":"update","data":[{"symbol":"XBTUSD","bids":[[711.14,10],[711,2000]],"asks":[[711.32,10],[711.34,72]],"timestamp":"2016-11-15T11:44:07.027Z"}]}');
    expect(appWrapper.find(OrderBook).props()).toEqual({
      askOrders: app.state.askOrders,
      bidOrders: app.state.bidOrders
    });
  });

  it('renders h1 with title', () => {
    const appWrapper = mount(<App />);
    expect(appWrapper.find('h1').length).toBe(1);
    expect(appWrapper.find('h1').text()).toBe("XBTUSD");
    expect(appWrapper.instance().state.instrument).toBe("XBTUSD");
  });

});
