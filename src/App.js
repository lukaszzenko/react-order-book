import React, { Component } from 'react';
import Websocket from 'react-websocket';
import OrderBook from './Components/OrderBook';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      instrument: "XBTUSD",
      askOrders: [],
      bidOrders: []
    };
  }

  handleData(rawData) {
    let data = JSON.parse(rawData);
    if (!data.data) {
      return;
    }
    let orderData = data.data[0];

    let askOrders = orderData.asks.map(ask => ({
      price: ask[0],
      quantity: ask[1]
    }));

    let bidOrders = orderData.bids.map(bid => ({
      price: bid[0],
      quantity: bid[1]
    }));

    this.setState({
      askOrders: askOrders,
      bidOrders: bidOrders
    });
  }

  render() {
    return (
      <div className="App">
        <h1 className="instrument">{this.state.instrument}</h1>
        <Websocket
          url='wss://www.bitmex.com/realtime?subscribe=orderBook10:XBTUSD'
          onMessage={this.handleData.bind(this)}
          />
        <OrderBook askOrders={this.state.askOrders} bidOrders={this.state.bidOrders} />
      </div>
    );
  }
}

export default App;
