import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Home from './Home';
import Cart from './Cart';
import Orders from './Orders';
import { getOrders, getProducts, resetAll, createLineItems } from './store';

class App extends Component {
  constructor() {
    super();
    this.resetAll = this.resetAll.bind(this);
  }

  async componentDidMount() {
    await this.props.getProducts();
    await this.props.getOrders();
    console.log(this.props);
  }

  resetAll() {
    this.props.resetAll();
  }

  render() {
    const completeOrders = this.props.orders.filter(o => o.status == 'ORDER');
    const totalQuantity = completeOrders.reduce((init, ord) => {
      const orderQuantity = ord.lineitems.reduce((init2, item) => {
        return init2 + item.quantity;
      }, 0);
      return init + orderQuantity;
    }, 0);

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
          <div className="container">
            <p className="alert alert-success">{totalQuantity} items sold!</p>
            <button onClick={this.resetAll} className="btn btn-warning">
              Reset
            </button>
          </div>
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
    lineItems: state.lineItems,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(getOrders()),
    getProducts: () => dispatch(getProducts()),
    resetAll: () => dispatch(resetAll()),
    createLineItems: (ords, prods) => dispatch(createLineItems(ords, prods)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
