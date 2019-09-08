import {
  NAME_CHANGED,
  LASTNAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  SIGNUP_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  SIGNUP_USER_FAIL,
  LOGIN_USER,
  SIGNUP_USER
} from '../actions/types';

const INITIAL_STATE = {
  nombre: '',
  apellido: '',
  email: '',
  password: '',
  error: '',
  loading: false,
  isAdmim: false,
  user: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NAME_CHANGED:
      return { ...state, nombre: action.payload };
    case LASTNAME_CHANGED:
      return { ...state, apellido: action.payload };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case SIGNUP_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        user: action.payload
      };
    case SIGNUP_USER_FAIL:
      return {
        ...state,
        error: 'Verifique los datos ingresados',
        loading: false
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        user: action.payload
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: 'El correo no esta registrado, por favor registre nuevo usuario',
        loading: false
      };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case SIGNUP_USER:
      return { ...state, loading: true, error: '' };
    default:
      return state;
  }
};
