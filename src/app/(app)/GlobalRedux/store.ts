import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from './Features/Counter/counterSlice';
 
const rootReducer = combineReducers({
    counter: counterReducer,
  });
  
export const store = configureStore({
  reducer: {
    counter: counterReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
