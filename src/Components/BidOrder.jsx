import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BidOrder extends Component {

  render() {
    let fillPercentage = (this.props.maxTotal ? this.props.cumulative / this.props.maxTotal : 0) * 100;
    return (
      <tr className="bid">
        <td className="fill-bid" style={{backgroundSize: fillPercentage + "% 100%"}}>
          {this.props.cumulative}
        </td>
        <td>{this.props.orderData.quantity}</td>
        <td>{this.props.orderData.price}</td>
        <td></td>
        <td></td>
      </tr>
    );
  }
}

BidOrder.propTypes = {
  orderData: PropTypes.object,
  maxTotal: PropTypes.number,
  cumulative: PropTypes.number
};

export default BidOrder;
