/* eslint-disable no-console */
import axios from 'axios';

import {
  GET_ALL_COLLECTIONS,
  GET_ONE_COLLECTION,
  CREATE_COLLECTION,
  UPDATE_COLLECTION,
  DELETE_COLLECTION,
} from '../Constants/Index';

export const getOneCollection = (id) => (dispatch) => {
  try {
    axios.get(`/collection/${id}`).then((response) => dispatch({
      type: GET_ONE_COLLECTION,
      collection: response.data,
    }));
  } catch (err) {
    console.log(err);
  }
};

export const getAllCollections = (userId) => (dispatch) => {
  try {
    axios.get(`/collection/all/${userId}`).then((response) => dispatch({
      type: GET_ALL_COLLECTIONS,
      collections: response.data,
    }));
  } catch (err) {
    console.log(err);
  }
};

export const createCollection = (data, userId) => (dispatch) => {
  try {
    axios.post(`/collection/${userId}`, { data }).then((response) => dispatch({
      collection: response.data.collection,
      collections: response.data.collections,
      message: response.data.message,
      response: response.status,
      type: CREATE_COLLECTION,
    }));
  } catch (err) {
    console.log(err);
  }
};

export const updateCollection = (data) => (dispatch) => {
  console.log(data);
  try {
    axios.put(`/collection/${data.id}`, { data }).then((response) => dispatch({
      collection: response.data.collection,
      collections: response.data.collections,
      message: response.data.message,
      response: response.status,
      type: UPDATE_COLLECTION,
    }));
  } catch (err) {
    console.log(err);
  }
};

export const deleteCollection = (id) => (dispatch) => {
  try {
    axios.delete(`/collection/${id}`).then((response) => dispatch({
      collections: response.data.collections,
      message: response.data.message,
      response: response.status,
      type: DELETE_COLLECTION,
    }));
  } catch (err) {
    console.log(err);
  }
};
