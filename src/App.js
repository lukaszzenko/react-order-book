import React, { Component } from 'react';
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

  getOrders() {
    let order_data = {
      "symbol": "XBTUSD",
      "bids": [
        [711.14,10],
        [711,2000],
        [710.5,8382],
        [710.38,3500],
        [709.98,1500],
        [709.8,2100]
      ],
      "asks": [
        [711.32,10],
        [711.34,72],
        [711.42,3500],
        [711.44,1500],
        [711.45,17500]
      ]
    };
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
      instrument: order_data['symbol'],
      ask_orders: ask_orders,
      bid_orders: bid_orders
    }, function () { console.log(this.state)});
  }

  componentWillMount() {
    this.getOrders();
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.instrument}</h1>
        <OrderBook askOrders={this.state.ask_orders} bidOrders={this.state.bid_orders} />
      </div>
    );
  }
}

export default App;
