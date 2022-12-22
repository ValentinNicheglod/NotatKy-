/* eslint-disable import/prefer-default-export */
import {
  ADD_NOTE_TAG,
  CHANGE_NOTE_STATE,
  DELETE_NOTE_TAG,
  GET_ALL_NOTES,
  GET_ONE_NOTE,
  CREATE_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  LOGOUT,
} from '../Constants/Index';

const initialState = {
  note: {},
  notes: [],
  message: '',
  response: '',
};

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_NOTE_STATE:
      return {
        ...state,
        notes: action.notes,
        response: action.response,
      };
    case CREATE_NOTE:
      return {
        ...state,
        message: action.message,
        note: action.note,
        notes: action.notes,
        response: action.response,
      };
    case GET_ALL_NOTES:
      return {
        ...state,
        notes: action.notes,
        response: action.response,
      };
    case GET_ONE_NOTE:
      return {
        ...state,
        note: action.note,
        response: action.response,
      };
    case UPDATE_NOTE:
      return {
        ...state,
        message: action.message,
        note: action.note,
        notes: action.notes,
        response: action.response,
      };
    case DELETE_NOTE:
      return {
        ...state,
        message: action.message,
        notes: action.notes,
        response: action.response,
      };
    case DELETE_NOTE_TAG:
      return {
        ...state,
        note: action.note,
        response: action.response,
      };
    case ADD_NOTE_TAG:
      return {
        ...state,
        note: action.note,
        response: action.response,
      };
    case LOGOUT:
      return {
        note: {},
        notes: [],
        message: '',
        response: ''
      };
    default:
      return state;
  }
};
