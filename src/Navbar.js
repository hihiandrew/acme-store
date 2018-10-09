import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends Component {
  render() {
    const { lineItems, orders } = this.props;
    const totalItems = lineItems.reduce((init, curr) => {
      return init + curr.quantity;
    }, 0);
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart">Cart ({totalItems})</Link>
          </li>
          <li>
            <Link to="/cart">Orders ({orders.length})</Link>
          </li>
        </ul>
        <hr />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lineItems: state.lineItems,
    orders: state.orders,
  };
};

export default connect(
  mapStateToProps,
  null
)(Navbar);
