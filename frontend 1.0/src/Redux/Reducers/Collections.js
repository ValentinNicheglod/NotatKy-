/* eslint-disable import/prefer-default-export */
import {
  GET_ALL_COLLECTIONS,
  GET_ONE_COLLECTION,
  CREATE_COLLECTION,
  UPDATE_COLLECTION,
  DELETE_COLLECTION,
  LOGOUT,
} from '../Constants/Index';

const initialState = {
  collection: {},
  collections: [],
  message: '',
  response: ''
};

export const collectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ONE_COLLECTION:
      return {
        ...state,
        collection: action.collection,
      };
    case GET_ALL_COLLECTIONS:
      return {
        ...state,
        collections: action.collections,
      };
    case CREATE_COLLECTION:
      return {
        ...state,
        collection: action.collection,
        collections: action.collections,
        message: action.message,
        response: action.response,
      };
    case UPDATE_COLLECTION:
      return {
        ...state,
        collection: action.collection,
        collections: action.collections,
        message: action.message,
        response: action.response,
      };
    case DELETE_COLLECTION:
      return {
        ...state,
        collections: action.collections,
        message: action.message,
        response: action.response,
      };
    case LOGOUT:
      return {
        collection: {},
        collections: [],
        message: '',
        response: ''
      };
    default:
      return state;
  }
};
