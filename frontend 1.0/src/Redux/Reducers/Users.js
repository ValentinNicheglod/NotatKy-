/* eslint-disable import/prefer-default-export */
import {
  DARK_MODE,
  GET_ALL_MAILS,
  GET_ALL_USERS,
  GET_ONE_USER,
  CREATE_USER,
  GUEST_USER,
  RESET_PASSWORD,
  UPDATE_USER,
  LOGOUT,
  LOGIN,
} from '../Constants/Index';

const initialState = {
  code: null,
  darkMode: '',
  message: '',
  response: '',
  token: '',
  user: {},
  users: []
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case DARK_MODE:
      return {
        ...state,
        darkMode: action.darkMode,
      };
    case GET_ONE_USER:
      return {
        ...state,
        user: action.user,
        token: action.token
      };
    case GUEST_USER:
      return {
        ...state,
        message: action.message,
        response: action.response
      };
    case GET_ALL_MAILS:
      return {
        ...state,
        users: action.users,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.users,
      };
    case CREATE_USER:
      return {
        ...state,
        user: action.user,
        response: action.response
      };
    case RESET_PASSWORD:
      return {
        ...state,
        code: action.code,
        message: action.message,
        response: action.response,
        user: action.user
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.user,
        response: action.response
      };
    case LOGOUT:
      return {
        user: {},
        users: [],
        response: '',
        token: ''
      };
    case LOGIN:
      return {
        ...state,
        token: action.token
      };
    default:
      return state;
  }
};
