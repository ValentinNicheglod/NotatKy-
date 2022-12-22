/* eslint-disable no-console */
import axios from 'axios';

import {
  ADD_NOTE_TAG,
  CHANGE_NOTE_STATE,
  DELETE_NOTE_TAG,
  GET_ALL_NOTES,
  GET_ONE_NOTE,
  CREATE_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
} from '../Constants/Index';

export const getOneNote = (id) => (dispatch) => {
  try {
    axios.get(`/note/${id}`).then((response) => dispatch({
      type: GET_ONE_NOTE,
      note: response.data,
      response: response.status,
    }));
  } catch (err) {
    console.log(err);
  }
};

export const getAllNotes = (userId) => (dispatch) => {
  try {
    axios.get(`/note/all/${userId}`).then((response) => {
      dispatch({
        type: GET_ALL_NOTES,
        notes: response.data,
        response: response.status,
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export const createNote = (data, userId) => (dispatch) => {
  try {
    axios.post(`/note/${userId}`, { data }).then((response) => dispatch({
      message: response.data.message,
      note: response.data.note,
      notes: response.data.notes,
      response: response.status,
      type: CREATE_NOTE
    }));
  } catch (err) {
    console.log(err);
  }
};

export const updateNote = (data) => (dispatch) => {
  try {
    axios.put(`/note/${data.id}`, { data }).then((response) => {
      dispatch({
        message: response.data.message,
        note: response.data.note,
        notes: response.data.notes,
        response: response.status,
        type: UPDATE_NOTE
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateNoteState = (data) => (dispatch) => {
  try {
    axios.put(`/note/state/${data.id}`, { data }).then((response) => dispatch({
      notes: response.data,
      response: response.status,
      type: CHANGE_NOTE_STATE
    }));
  } catch (err) {
    console.log(err);
  }
};

export const deleteNote = (noteId, userId) => (dispatch) => {
  try {
    axios.delete(`/note/${noteId}/${userId}`).then((response) => dispatch({
      message: response.data.message,
      notes: response.data.notes,
      response: response.status,
      type: DELETE_NOTE,
    }));
  } catch (err) {
    console.log(err);
  }
};

export const addNoteTag = (noteId, tagId) => (dispatch) => {
  try {
    // noteId && tagId
    /* ? */ axios.post(`/tag/${noteId}/${tagId}`).then((response) => dispatch({
      type: ADD_NOTE_TAG,
      note: response.data,
      response: response.status,
    }));
    // : console.log('No se ha proporcionado la información necesaria');
  } catch (err) {
    console.log(err);
  }
};

export const deleteNoteTag = (noteId, tagId) => (dispatch) => {
  try {
    /* noteId && tagId
      ? */ axios
      .delete(`/tag/${noteId}/${tagId}`)
      .then((response) => dispatch({
        type: DELETE_NOTE_TAG,
        note: response.data,
        response: response.status,
      }));
    // : console.log('No se ha proporcionado la información necesaria');
  } catch (err) {
    console.log(err);
  }
};
