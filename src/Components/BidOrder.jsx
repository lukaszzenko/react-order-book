import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BidOrder extends Component {

  render() {
    return (
      <tr className="bid">
        <td>{this.props.orderData.cumulative}</td>
        <td>{this.props.orderData.quantity}</td>
        <td>{this.props.orderData.price}</td>
        <td></td>
        <td></td>
      </tr>
    );
  }
}

BidOrder.propTypes = {
  orderData: PropTypes.object
}

export default BidOrder;
