import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AskOrder from './AskOrder';
import BidOrder from './BidOrder';

class OrderBook extends Component {

  render() {
    function sumQuantities(orders) {
      return orders.reduce((total, order) => total + order.quantity, 0);
    }

    function renderOrders(ComponentClass, orders) {
      let cumulative = 0;
      return orders.map((order, index) => {
        cumulative += order.quantity;
        return (<ComponentClass orderData={order} key={index} cumulative={cumulative} maxTotal={maxTotal}/>);
      });
    }

    let totalAsks = sumQuantities(this.props.askOrders);
    let totalBids = sumQuantities(this.props.bidOrders);
    let maxTotal = Math.max(totalAsks, totalBids);

    let askOrders = renderOrders(AskOrder, this.props.askOrders);
    let bidOrders = renderOrders(BidOrder, this.props.bidOrders);

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
            {askOrders.reverse()}
          </tbody>
          <tbody>
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
};

export default OrderBook;
