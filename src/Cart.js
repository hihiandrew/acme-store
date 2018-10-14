import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLineItem, createOrder } from './store';

class Cart extends Component {
  render() {
    const {
      products,
      lineItems,
      orderId,
      updateLineItem,
      createOrder,
      history,
    } = this.props;

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
                  onClick={() => updateLineItem(id, 1)}
                  className="btn btn-primary"
                >
                  +
                </button>{' '}
                <button
                  id={id}
                  onClick={() => updateLineItem(id, -1)}
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
          onClick={() => {
            createOrder(lineItems, orderId);
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
    lineItems: state.lineItems,
    orderId: state.orderId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateLineItem: (id, change) => dispatch(updateLineItem(id, change)),
    createOrder: (lineItems, orderId) =>
      dispatch(createOrder(lineItems, orderId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
