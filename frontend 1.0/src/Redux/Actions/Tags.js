/* eslint-disable no-console */
import axios from 'axios';

import {
  GET_ALL_TAGS,
  GET_ONE_TAG,
  CREATE_TAG,
  UPDATE_TAG,
  DELETE_TAG,
} from '../Constants/Index';

export const getOneTag = (id) => (dispatch) => {
  try {
    axios.get(`/tag/${id}`).then((response) => dispatch({
      type: GET_ONE_TAG,
      tag: response.data,
    }));
  } catch (err) {
    console.log(err);
  }
};

export const getAllTags = (userId) => (dispatch) => {
  try {
    axios.get(`/tag/all/${userId}`).then((response) => {
      dispatch({
        type: GET_ALL_TAGS,
        tags: response.data,
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export const createTag = (data, id) => (dispatch) => {
  try {
    axios.post(`/tag/${id}`, { data }).then((response) => dispatch({
      message: response.data.message,
      response: response.status,
      tag: response.data.tag,
      tags: response.data.tags,
      type: CREATE_TAG,
    }));
  } catch (err) {
    console.log(err);
  }
};

export const updateTag = (data) => (dispatch) => {
  try {
    axios.put(`/tag/${data.id}`, { data }).then((response) => dispatch({
      message: response.data.message,
      response: response.status,
      tag: response.data.tag,
      tags: response.data.tags,
      type: UPDATE_TAG,
    }));
  } catch (err) {
    console.log(err);
  }
};

export const deleteTag = (id) => (dispatch) => {
  try {
    axios.delete(`/tag/${id}`).then((response) => dispatch({
      message: response.data.message,
      response: response.status,
      tags: response.data.tags,
      type: DELETE_TAG,
    }));
  } catch (err) {
    console.log(err);
  }
};
