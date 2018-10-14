import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrderRows from './OrderRows';

class OrderTables extends Component {
  render() {
    const orders = this.props.orders.filter(o => o.status == 'ORDER');
    return (
      <div>
        {orders.map(ord => {
          return (
            <table className="table" key={ord.id}>
              <thead>
                <tr>
                  <th>#{ord.id}</th>
                </tr>
              </thead>
              <tbody>
                {ord.lineitems.map(item => {
                  return <OrderRows item={item} key={item.id} />;
                })}
              </tbody>
            </table>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
  };
};

export default connect(
  mapStateToProps,
  null
)(OrderTables);
