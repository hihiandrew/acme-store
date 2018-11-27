import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Home from './Home';
import Cart from './Cart';
import Orders from './Orders';
import { getOrders, getProducts } from '../store';

class App extends Component {
  constructor() {
    super();
    this.resetAll = this.resetAll.bind(this);
  }

  async componentDidMount() {
    await this.props.getProducts();
    await this.props.getOrders();
  }

  resetAll() {
    this.props.resetAll();
  }

  render() {
    const renderNavbar = ({ location }) => {
      const path = location.pathname.split('/').pop();
      return <Navbar path={path} />;
    };
    const renderCart = ({ history }) => {
      return <Cart history={history} />;
    };

    return (
      <HashRouter>
        <div>
          <Route path="/" render={renderNavbar} />
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" render={renderCart} />
          <Route exact path="/orders" component={Orders} />
        </div>
      </HashRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
    products: state.products,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(getOrders()),
    getProducts: () => dispatch(getProducts()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
//
