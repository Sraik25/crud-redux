import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import productReducer from './productsReducer';

export default combineReducers({
  products: productReducer,
  alertMessage: alertReducer,
});
