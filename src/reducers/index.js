import { combineReducers } from 'redux';
import AuthReducers from './AuthReducers';
import ReservationReducer from './ReservationReducer';

export default combineReducers({
  auth: AuthReducers,
  reservationForm: ReservationReducer
});
