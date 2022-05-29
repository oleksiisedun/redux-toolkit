import React from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch, Provider } from 'react-redux';

const initialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    decrementByAmount: (state, action) => {
      state.value -= action.payload;
    },
  },
});

const App = () => {
  const dispatch = useDispatch();
  const cash = useSelector((state) => state.value);
  const increment = counterSlice.actions.incrementByAmount;
  const decrement = counterSlice.actions.decrementByAmount;
  const incrementAsync = (amount) => (dispatch) => {
    setTimeout(() => dispatch(increment(amount)), 1000);
  };
  return (
    <div>
      <div>Cash: {cash}</div>
      <button onClick={() => dispatch(increment(5))}>Add Cash</button>
      <button onClick={() => dispatch(incrementAsync(5))}>Add Cash Async</button>
      <button onClick={() => dispatch(decrement(5))}>Get Cash</button>
    </div>
  );
};

export const AppWrapper = () => {
  const store = configureStore({
    reducer: counterSlice.reducer,
  });
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
