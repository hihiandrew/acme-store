import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

const initialState = {
  products: [
    {
      id: 1,
      name: 'milk',
      createdAt: '2018-10-09T22:06:23.286Z',
      updatedAt: '2018-10-09T22:06:23.286Z',
    },
    {
      id: 2,
      name: 'bread',
      createdAt: '2018-10-09T22:06:23.287Z',
      updatedAt: '2018-10-09T22:06:23.287Z',
    },
    {
      id: 3,
      name: 'eggs',
      createdAt: '2018-10-09T22:06:23.287Z',
      updatedAt: '2018-10-09T22:06:23.287Z',
    },
    {
      id: 4,
      name: 'coffee',
      createdAt: '2018-10-09T22:06:23.287Z',
      updatedAt: '2018-10-09T22:06:23.287Z',
    },
  ],
  orders: [
    {
      id: 'ab6af545-4af4-408f-a517-64a05fe507e3',
      status: 'CART',
      createdAt: '2018-10-09T22:06:23.288Z',
      updatedAt: '2018-10-09T22:06:23.288Z',
      lineitems: [
        {
          id: 1,
          quantity: 1,
          createdAt: '2018-10-09T22:06:23.316Z',
          updatedAt: '2018-10-09T22:06:23.316Z',
          orderId: 'ab6af545-4af4-408f-a517-64a05fe507e3',
          productId: 1,
        },
      ],
    },
    {
      id: '7beba641-d348-4925-a735-8d639ef456f1',
      status: 'CART',
      createdAt: '2018-10-09T22:06:23.288Z',
      updatedAt: '2018-10-09T22:06:23.288Z',
      lineitems: [
        {
          id: 2,
          quantity: 1,
          createdAt: '2018-10-09T22:06:23.317Z',
          updatedAt: '2018-10-09T22:06:23.317Z',
          orderId: '7beba641-d348-4925-a735-8d639ef456f1',
          productId: 3,
        },
        {
          id: 3,
          quantity: 1,
          createdAt: '2018-10-09T22:06:23.317Z',
          updatedAt: '2018-10-09T22:06:23.317Z',
          orderId: '7beba641-d348-4925-a735-8d639ef456f1',
          productId: 4,
        },
        {
          id: 4,
          quantity: 1,
          createdAt: '2018-10-09T22:06:23.316Z',
          updatedAt: '2018-10-09T22:06:23.316Z',
          orderId: '7beba641-d348-4925-a735-8d639ef456f1',
          productId: 2,
        },
      ],
    },
  ],
  lineItems: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const store = createStore(
  reducer,
  applyMiddleware(loggerMiddleware, thunkMiddleware)
);
