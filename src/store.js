import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

const initialState = {
  products: [],
  orders: [],
  lineItems: {},
  orderId: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case GET_ORDERS:
      const orderId = action.orders.find(ord => ord.status == 'CART').id || '';
      return {
        ...state,
        orders: action.orders,
        orderId,
      };
    case GET_PRODUCTS:
      const lineItems = {};
      action.products.map(prod => (lineItems[prod.id] = 0));
      return { ...state, products: action.products, lineItems };
    case RESET_ALL:
      return { ...state, orders: [], lineItems: {} };

    case UPDATE_LINE_ITEM:
      const newLineItems = { ...state.lineItems };
      newLineItems[action.id] += action.change;
      return { ...state, lineItems: newLineItems };
  }
};

//action name
const GET_ORDERS = 'GET_ORDERS';
const GET_PRODUCTS = 'GET_PRODUCTS';
const RESET_ALL = 'RESET_ALL';
const UPDATE_LINE_ITEM = 'UPDATE_LINE_ITEM';

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

export const updateLineItem = (id, change) => {
  return {
    type: UPDATE_LINE_ITEM,
    id,
    change,
  };
};

//thunks
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

export const resetAll = () => {
  return dispatch => {
    axios
      .delete('/api/orders/reset')
      .then(() => {
        return Promise.all([
          dispatch(_resetAll()),
          dispatch(getOrders()),
          dispatch(getProducts()),
        ]);
      })
      .catch(console.error.bind(console));
  };
};

export const createOrder = (lineItems, orderId) => {
  return async dispatch => {
    //create each lineItem, log success
    Object.keys(lineItems).map(productId => {
      if (lineItems[productId]) {
        axios
          .post(`/api/orders/${orderId}/lineItems/`, {
            quantity: lineItems[productId],
            productId,
          })
          .then(respItem => {
            // const { id, productId, quantity } = respItem.data;
            // console.log(
            //   `item #${id} created, prod: ${productId}, quantity:${quantity}`
            // );
          })
          .catch(console.error.bind(console));
      }
    });

    //update order status, getOrder/getProducts to update redux state
    axios
      .get('/api/orders')
      .then(resp => {
        const cart = resp.data.find(o => o.status == 'CART');
        cart.status = 'ORDER';
        axios.put(`/api/orders/${orderId}`, cart);
      })
      .then(() => {
        dispatch(getOrders());
        dispatch(getProducts());
      })
      .catch(console.error.bind(console));
  };
};

//export const store = createStore(reducer, applyMiddleware(loggerMiddleware, thunkMiddleware));
export const store = createStore(reducer, applyMiddleware(thunkMiddleware));
