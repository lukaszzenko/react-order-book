import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AskOrder from './AskOrder';
import BidOrder from './BidOrder';


class OrderBook extends Component {

  render() {
    function sumQuantities(orders) {
      return orders.reduce((total, order) => total + order.quantity, 0);
    }

    let totalAsks = sumQuantities(this.props.askOrders);
    let totalBids = sumQuantities(this.props.bidOrders);
    let maxTotal = Math.max(totalAsks, totalBids);

    // Deep copy and sort orders
    let askOrders = this.props.askOrders.map(order => Object.assign({}, order)).sort((a, b) => a.price > b.price);
    let bidOrders = this.props.bidOrders.map(order => Object.assign({}, order)).sort((a, b) => a.price < b.price);


    function renderOrders(ComponentClass, orders) {
      let cumulative = 0;
      return orders.map((order, index) => {
        order.cumulative = (cumulative += order.quantity);
        order.maxTotal = maxTotal;
        return (<ComponentClass key={index} {...order} />);
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
            {renderOrders(AskOrder, askOrders).reverse()}
          </tbody>
          <tbody>
            {renderOrders(BidOrder, bidOrders)}
          </tbody>
        </table>
      </div>
    );
  }
}

OrderBook.propTypes = {
  askOrders: PropTypes.array,
  bidOrders: PropTypes.array
};

export default OrderBook;
