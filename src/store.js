import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

const initialState = {
  products: [],
  orders: [],
  lineItems: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case GET_ORDERS:
      return { ...state, orders: action.orders };
    case GET_PRODUCTS:
      return { ...state, products: action.products };
    case RESET_ALL:
      return { ...state, orders: [], lineItems: [] };
    case CREATE_ORDER:
      return { ...state, orders: [...state.orders, action.order] };
  }
};

//action name
const GET_ORDERS = 'GET_ORDERS';
const GET_PRODUCTS = 'GET_PRODUCTS';
const RESET_ALL = 'RESET_ALL';
const CREATE_ORDER = 'CREATE_ORDER';

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

const _resetAll = () => {
  return {
    type: RESET_ALL,
  };
};

const _createOrder = order => {
  return {
    type: CREATE_ORDER,
    order,
  };
};

//thunks
export const getOrders = () => {
  return dispatch => {
    return axios
      .get('/api/orders')
      .then(resp => {
        dispatch(_getOrders(resp.data));
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
      })
      .catch(console.error.bind(console));
  };
};

export const resetAll = () => {
  return dispatch => {
    dispatch(_resetAll());
  };
};

export const createOrder = order => {
  return async dispatch => {
    const prods = Object.keys(order);
    const _order = [];
    return prods
      .map(prod => {
        axios
          .post(`/api/orders/${orderId}/lineItems/`, {
            orderId: 0,
            quantity: order[prod],
            productId: 1,
          })
          .then(resp => {
            _order.push(resp.data);
          })
          .catch(console.error.bind(console));
      })
      .then(() => {
        dispatch(_createOrder(_order));
      });
  };
};

export const store = createStore(
  reducer,
  applyMiddleware(loggerMiddleware, thunkMiddleware)
);
