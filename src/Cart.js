import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetAll } from './store';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      milk: 0,
      eggs: 0,
      bread: 0,
      coffee: 0,
    };
    this.addQ = this.addQ.bind(this);
    this.minusQ = this.minusQ.bind(this);
    this.resetLocalState = this.resetLocalState.bind(this);
    this.resetAll = this.resetAll.bind(this);
  }

  addQ(e) {
    this.setState({ [e.target.name]: this.state[e.target.name] + 1 });
  }

  minusQ(e) {
    this.setState({ [e.target.name]: this.state[e.target.name] - 1 });
  }

  resetAll() {
    this.props.resetAll();
    this.resetLocalState();
  }

  resetLocalState() {
    Object.keys(this.state).map(key => {
      this.setState({ [key]: 0 });
    });
  }

  render() {
    const { orders, products, lineItems } = this.props;
    const totalItems = lineItems.reduce((init, curr) => {
      return init + curr.quantity;
    }, 0);
    return (
      <div>
        <p>{totalItems} items sold!</p>
        <button onClick={this.resetAll}>Reset</button>
        <h3>Products</h3>
        {products.map(prod => {
          const { id, name } = prod;
          return (
            <div key={id}>
              <p>{name}</p>
              {this.state[name]} ordered
              <div>
                <button name={name} onClick={this.addQ}>
                  +
                </button>
                <button
                  name={name}
                  onClick={this.minusQ}
                  disabled={!this.state[name]}
                >
                  -
                </button>
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
  return {
    resetAll: () => dispatch(resetAll()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
