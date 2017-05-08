import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AskOrder extends Component {

  render() {
    return (
      <tr className="ask">
        <td></td>
        <td></td>
        <td>{this.props.orderData.price}</td>
        <td>{this.props.orderData.quantity}</td>
        <td>{this.props.orderData.cumulative}</td>
      </tr>
    );
  }
}

AskOrder.propTypes = {
  orderData: PropTypes.object
}

export default AskOrder;
