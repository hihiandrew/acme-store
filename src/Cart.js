import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUpdateLineItem, createOrder } from './store';

class Cart extends Component {
  render() {
    const {
      products,
      orderId,
      orders,
      createUpdateLineItem,
      createOrder,
      history,
    } = this.props;
    let totalOrders, orderInCart, itemsInCart;
    if (orders.length) {
      totalOrders = orders.filter(o => o.status == 'ORDER').length;
      orderInCart = orders.find(o => o.status == 'CART');
      itemsInCart = orderInCart.lineitems.reduce(
        (init, curr) => init + curr.quantity,
        0
      );
    }
    return (
      <div className="container">
        <h3>Products</h3>
        <div className="row">
          {products.map(prod => {
            const { id, name } = prod;
            return (
              <div className="col-sm-3 border rounded p-3" key={id}>
                <p>{name}</p>
                <p>{lineItems[id]} ordered</p>
                <button
                  id={id}
                  onClick={() => createUpdateLineItem(id, 1, orders)}
                  className="btn btn-primary"
                >
                  +
                </button>{' '}
                <button
                  id={id}
                  onClick={() => createUpdateLineItem(id, -1, orders)}
                  disabled={!lineItems[id]}
                  className="btn btn-primary"
                >
                  -
                </button>
              </div>
            );
          })}
        </div>
        <br />
        <button
          className="btn btn-primary"
          disabled={!totalItems}
          onClick={() => {
            createOrder(orders);
            history.push('/orders');
          }}
        >
          Create Order
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
    products: state.products,
    orderId: state.orderId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createUpdateLineItem: (id, change, orders) =>
      dispatch(createUpdateLineItem(id, change, orders)),
    createOrder: (lineItems, orderId) =>
      dispatch(createOrder(lineItems, orderId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
