/* eslint-disable import/prefer-default-export */
import {
  GET_ALL_TAGS,
  GET_ONE_TAG,
  CREATE_TAG,
  UPDATE_TAG,
  DELETE_TAG,
  LOGOUT,
} from '../Constants/Index';

const initialState = {
  tag: {},
  tags: [],
  message: '',
  response: ''
};

export const tagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ONE_TAG:
      return {
        ...state,
        tag: action.tag,
      };
    case GET_ALL_TAGS:
      return {
        ...state,
        tags: action.tags,
      };
    case CREATE_TAG:
      return {
        ...state,
        message: action.message,
        response: action.response,
        tag: action.tag,
        tags: action.tags,
      };
    case UPDATE_TAG:
      return {
        ...state,
        message: action.message,
        response: action.response,
        tag: action.tag,
        tags: action.tags,
      };
    case DELETE_TAG:
      return {
        ...state,
        message: action.message,
        response: action.response,
        tags: action.tags,
      };
    case LOGOUT:
      return {
        tag: {},
        tags: [],
        message: '',
        response: '',
      };

    default:
      return state;
  }
};
