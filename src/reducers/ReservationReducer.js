import { RESERVATION_UPDATE } from '../actions/types';

const INITIAL_STATE = { mes: '', dia: '', slot: '' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESERVATION_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
};
