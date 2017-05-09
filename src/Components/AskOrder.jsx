import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AskOrder extends Component {

  render() {
    let fillPercentage = (this.props.maxTotal ? this.props.cumulative / this.props.maxTotal : 0) * 100;
    return (
      <tr className="ask">
        <td></td>
        <td></td>
        <td>{this.props.orderData.price}</td>
        <td>{this.props.orderData.quantity}</td>
        <td className="fill-ask" style={{backgroundSize: fillPercentage + "% 100%"}}>
          {this.props.cumulative}
        </td>
      </tr>
    );
  }
}

AskOrder.propTypes = {
  orderData: PropTypes.object,
  maxTotal: PropTypes.number,
  cumulative: PropTypes.number
};

export default AskOrder;
