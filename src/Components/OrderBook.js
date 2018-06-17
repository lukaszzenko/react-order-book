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
    let maxCumulative = Math.max(totalAsks, totalBids);

    let deepCopyArrayOfObj = (arr => arr.map(order => Object.assign({}, order)));

    // Deep copy and sort orders
    let askOrders = deepCopyArrayOfObj(this.props.askOrders).sort((a, b) => a.price - b.price); // ascending order
    let bidOrders = deepCopyArrayOfObj(this.props.bidOrders).sort((a, b) => b.price - a.price); // descending order


    function renderOrders(ComponentClass, orders) {
      let cumulative = 0;
      return orders.map((order, index) => {
        order.cumulative = (cumulative += order.quantity);
        order.maxCumulative = maxCumulative;
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
