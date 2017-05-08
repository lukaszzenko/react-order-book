import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AskOrder from './AskOrder';
import BidOrder from './BidOrder';

class OrderBook extends Component {

  render() {
    let askOrders, bidOrders;

    if(this.props.askOrders) {
      let sortedAskOrdersData = this.props.askOrders.slice().sort((a, b) => a.price < b.price);
      askOrders = sortedAskOrdersData.map((askOrder, index) => {
        return (
          <AskOrder orderData={askOrder} key={index} />
        );
      });
    }

    if(this.props.bidOrders) {
      bidOrders = this.props.bidOrders.map((bidOrder, index) => {
        return (
          <BidOrder orderData={bidOrder} key={index} />
        );
      });
    }

    return (
      <div className="OrderBook">
        <table>
          <thead>
            <tr>
              <th>Buy cumulative</th>
              <th>Buy quantity</th>
              <th></th>
              <th>Sell quantity</th>
              <th>Sell cumulative</th>
            </tr>
          </thead>
          <tbody>
            {askOrders}
            {bidOrders}
          </tbody>
        </table>
      </div>
    );
  }
}

OrderBook.propTypes = {
  askOrders: PropTypes.array,
  bidOrders: PropTypes.array
}

export default OrderBook;
