import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends Component {
  render() {
    const { lineItems, orders, id, history } = this.props;
    const totalItems = Object.keys(lineItems).reduce((init, curr) => {
      return init + lineItems[curr];
    }, 0);
    const totalOrders = orders.filter(o => o.status == 'ORDER').length;
    console.log(`id:${id}`);
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/">
              <p className="navbar-brand">Acme Store</p>
            </Link>
          </div>

          <ul className="nav navbar-nav">
            <li className={id == '/' ? 'active' : ''}>
              <Link to="/">Home</Link>
            </li>
            <li className={id == 'cart' ? 'active' : ''}>
              <Link to="/cart">Cart ({totalItems})</Link>
            </li>
            <li className={id == 'orders' ? 'active' : ''}>
              <Link to="/orders">Orders ({totalOrders})</Link>
            </li>
          </ul>
        </div>
      </nav>
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
