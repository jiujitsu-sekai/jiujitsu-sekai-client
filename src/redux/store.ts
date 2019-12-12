import { createStore } from 'redux';
import { reducer } from './reducer';

export const store = createStore(
  reducer,
  (<any>window).__REDUX_DEVTOOLS_EXTENSION__ && (<any>window).__REDUX_DEVTOOLS_EXTENSION__()
);