import { RESERVATION_UPDATE } from './types';

export const reservationUpdate = ({ prop, value }) => {
  return {
    type: RESERVATION_UPDATE,
    payload: { prop, value }
  };
};
