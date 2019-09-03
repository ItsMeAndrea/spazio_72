import {
  NAME_CHANGED,
  LASTNAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  SIGNUP_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  SIGNUP_USER_FAIL,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  SIGNUP_USER
} from './types';
import app from '../firebase/firebaseConfig';

export const nameChanged = text => {
  return {
    type: NAME_CHANGED,
    payload: text
  };
};

export const apellidoChanged = text => {
  return {
    type: LASTNAME_CHANGED,
    payload: text
  };
};

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const signUpUser = ({ email, password, nombre, apellido, isAdmin }) => {
  return dispatch => {
    dispatch({ type: SIGNUP_USER });
    app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        dispatch({ type: SIGNUP_USER_SUCCESS, payload: user });
      })
      .catch(() => dispatch({ type: SIGNUP_USER_FAIL }));

    /*     app
      .database()
      .ref(`/usuarios/${currentUser.uid}`)
      .push({ email, nombre, apellido, isAdmin }); */
  };
};

export const loginUser = ({ email, password }) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER });
    app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: user
        });
      })
      .catch(() => dispatch({ type: LOGIN_USER_FAIL }));
  };
};
