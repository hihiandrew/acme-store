import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

const initialState = {
  products: [],
  orders: [],
  orderId: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case GET_ORDERS:
      const exists = action.orders.find(ord => ord.status == 'CART');
      const orderId = exists
        ? action.orders.find(ord => ord.status == 'CART').id
        : '';
      return {
        ...state,
        orders: action.orders,
        orderId,
      };
    case GET_PRODUCTS:
      return { ...state, products: action.products };
    case CREATE_UPDATE_LINE:
      const newOrders = state.orders.map(o => {
        if (o.status == 'CART') {
          //if lineItem doesnt exist-> add lineItem
          if (!o.lineitems.find(i => i.id == action.lineItem.id)) {
            o.lineitems = [...o.lineitems, action.lineItem];
          } else if (action.lineItem.quantity == 0) {
            //exists -> quantity==0, delete.
            o.lineitems = o.lineitems.filter(i => i.id != action.lineItem.id);
          } else {
            //exists -> update that lineItem.
            o.lineitems.map(i => {
              if (i.id == action.lineItem.id) {
                //replace lineItem
                i = action.lineItem;
              }
            });
          }
        }
        return o;
      });
      return { ...state, orders: newOrders };
    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(o => o.id != action.orderId),
      };
  }
};

//action name
const GET_ORDERS = 'GET_ORDERS';
const GET_PRODUCTS = 'GET_PRODUCTS';
const CREATE_UPDATE_LINE = 'CREATE_UPDATE_LINE';
const DELETE_ORDER = 'DELETE_ORDER';

//action creator
const _getOrders = orders => {
  return {
    type: GET_ORDERS,
    orders,
  };
};

const _getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};

const _createUpdateLine = lineItem => {
  return {
    type: CREATE_UPDATE_LINE,
    lineItem,
  };
};

const _deleteOrder = orderId => {
  return {
    type: DELETE_ORDER,
    orderId,
  };
};

//thunks
export const createUpdateLineItem = (id, change, orders) => {
  return dispatch => {
    const cart = orders.find(o => o.status == 'CART');
    const orderId = cart.id;
    const lineItem = cart.lineitems.find(i => i.productId == id);

    if (lineItem) {
      lineItem.quantity += change;
      //delete lineitem
      if (lineItem.quantity == 0) {
        return axios
          .delete(`/api/orders/${orderId}/lineItems/${lineItem.id}`)
          .then(() => dispatch(_createUpdateLine(lineItem)))
          .catch(e => console.log(e));
      }
      //update lineitem quantity
      return axios
        .put(`/api/orders/${orderId}/lineItems/${lineItem.id}`, lineItem)
        .then(resp => dispatch(_createUpdateLine(resp.data)))
        .catch(console.error.bind(console));
    } else {
      //create new lineitem
      return axios
        .post(`/api/orders/${orderId}/lineItems/`, {
          orderId,
          productId: id,
        })
        .then(resp => dispatch(_createUpdateLine(resp.data)))
        .catch(console.error.bind(console));
    }
  };
};

export const getOrders = () => {
  return dispatch => {
    return axios
      .get('/api/orders')
      .then(resp => {
        dispatch(_getOrders(resp.data));
        return resp.data;
      })
      .catch(console.error.bind(console));
  };
};

export const getProducts = () => {
  return dispatch => {
    return axios
      .get('/api/products')
      .then(resp => {
        dispatch(_getProducts(resp.data));
        return resp.data;
      })
      .catch(console.error.bind(console));
  };
};

export const createOrder = orders => {
  return dispatch => {
    const order = { ...orders.find(o => o.status == 'CART') };
    order.status = 'ORDER';
    axios
      .put(`/api/orders/${order.id}`, order)
      .then(() => dispatch(getOrders()))
      .catch(console.error.bind(console));
  };
};

export const deleteOrder = orderId => {
  return dispatch => {
    axios
      .delete(`/api/orders/${orderId}`)
      .then(() => {
        dispatch(_deleteOrder(orderId));
      })
      .catch(console.error.bind(console));
  };
};

export const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
