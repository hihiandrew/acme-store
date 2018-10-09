import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

const initialState = {};

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
