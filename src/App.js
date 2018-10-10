import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Home from './Home';
import Cart from './Cart';
import { getOrders, getProducts } from './store';

class App extends Component {
  componentDidMount() {
    this.props.getOrders();
    this.props.getProducts();
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Route path="/" component={Navbar} />
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart} />
        </div>
      </HashRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(getOrders()),
    getProducts: () => dispatch(getProducts()),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
