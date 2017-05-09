import { Component } from 'react';
import PropTypes from 'prop-types';

class AbstractOrder extends Component {

  getPercentage() {
    let fillPercentage = (this.props.maxTotal ? this.props.cumulative / this.props.maxTotal : 0) * 100;
    fillPercentage = Math.min(fillPercentage, 100); // Percentage can't be greater than 100%
    fillPercentage = Math.max(fillPercentage, 0); // Percentage can't be smaller than 0%
    return fillPercentage;
  }
}

AbstractOrder.propTypes = {
  quantity: PropTypes.number,
  price: PropTypes.number,
  maxTotal: PropTypes.number,
  cumulative: PropTypes.number
};

export default AbstractOrder;
