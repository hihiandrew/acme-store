import React, { Component } from 'react';
import { connect } from 'react-redux';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      milk: 0,
      eggs: 0,
      bread: 0,
      coffee: 0,
    };
  }

  render() {
    const { orders, products, lineItems } = this.props;
    const totalItems = lineItems.reduce((init, curr) => {
      return init + curr.quantity;
    }, 0);
    return (
      <div>
        <p>{totalItems} items sold!</p>
        <button>Reset</button>
        <h3>Products</h3>
        {products.map(prod => {
          const { id, name } = prod;
          console.log(name);
          return (
            <div key={id}>
              <p>{name}</p>
              {this.state[name]} ordered
              <div>
                <button>+</button>
                <button>-</button>
              </div>
            </div>
          );
        })}
        <button>Create Order</button>
      </div>
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
