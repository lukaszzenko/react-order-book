import React, { Component } from 'react';
import Websocket from 'react-websocket';
import OrderBook from './Components/OrderBook';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      instrument: "",
      ask_orders: [],
      bid_orders: []
    }
  }

  handleData(rawData) {
    let data = JSON.parse(rawData);
    if (!data['data']) {
      return;
    }

    let order_data = data['data'][0];
    console.log(order_data);
    let ask_orders = order_data['asks'].map(ask => ({
      price: ask[0],
      quantity: ask[1]
    }));
    let total_asks = ask_orders.reduce((total, ask_order, index) => {
      let new_total = total + ask_order['quantity'];
      ask_order['cumulative'] = new_total;
      ask_order['order'] = index;
      return new_total;
    }, 0);
    let bid_orders = order_data['bids'].map(bid => ({
      price: bid[0],
      quantity: bid[1]
    }));
    let total_bids = bid_orders.reduce((total, bid_order, index) => {
      let new_total = total + bid_order['quantity'];
      bid_order['cumulative'] = new_total;
      bid_order['order'] = index;
      return new_total;
    }, 0);

    this.setState({
      ask_orders: ask_orders,
      bid_orders: bid_orders
    });
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.instrument}</h1>
        <Websocket url='wss://www.bitmex.com/realtime?subscribe=orderBook10:XBTUSD'
          onMessage={this.handleData.bind(this)}/>
        <OrderBook askOrders={this.state.ask_orders} bidOrders={this.state.bid_orders} />
      </div>
    );
  }
}

export default App;
