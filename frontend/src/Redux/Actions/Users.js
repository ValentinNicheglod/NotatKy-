/* eslint-disable no-console */
import axios from 'axios';
import history from '../../history';

import {
  DARK_MODE,
  GET_ALL_MAILS,
  GET_ALL_USERS,
  GET_ONE_USER,
  CREATE_USER,
  GUEST_USER,
  LOGIN,
  LOGOUT,
  RESET_PASSWORD,
  UPDATE_USER,
} from '../Constants/Index';

export const chargeGuestUser = () => async (dispatch) => {
  try {
    await axios.delete('/guest/deleteAditionalData');
    axios.put('/guest/chargeData').then((response) => {
      dispatch({
        type: GUEST_USER,
        message: response.data,
        response: response.status
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export const getOneUser = (id) => (dispatch) => {
  try {
    axios.get(`/user/${id}`).then((response) => dispatch({
      type: GET_ONE_USER,
      user: response.data,
      token: sessionStorage.getItem('token') || localStorage.getItem('token')
    }));
  } catch (err) {
    console.log(err);
  }
};
export const getAllUsers = () => (dispatch) => {
  try {
    axios.get('/user/').then((response) => dispatch({
      type: GET_ALL_USERS,
      users: response.data,
    }));
  } catch (err) {
    console.log(err);
  }
};

export const getAllMails = () => (dispatch) => {
  try {
    axios.get('/user/mails').then((response) => {
      const emails = response.data.map((user) => user.email);
      dispatch({
        type: GET_ALL_MAILS,
        users: emails
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export const createUser = (data) => (dispatch) => {
  try {
    axios.post('/auth/register', { data }).then((response) => dispatch({
      type: CREATE_USER,
      user: response.data,
      response: response.status
    }));
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = (data) => (dispatch) => {
  try {
    axios.put(`/user/${data.id}`, { data }).then((response) => {
      dispatch({
        type: UPDATE_USER,
        user: response.data,
        response: response.status
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateUserPassword = (data) => (dispatch) => {
  try {
    axios.put(`/user/password/${data.id}`, { data }).then((response) => {
      dispatch({
        type: UPDATE_USER,
        user: response.data,
        response: response.status
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export const login = (user, rememberInfo) => (dispatch) => {
  try {
    axios.post('/auth/login', user, /* { headers: { 'Access-Control-Allow-Origin': '*', } } */)
      .then((response) => {
        dispatch({
          type: LOGIN,
          token: response.data.token,
        });
        if (rememberInfo) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('id', response.data.user.id);
        } else {
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('id', response.data.user.id);
        }
        history.push('/NotatKy/#/home');
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      });
  } catch (err) {
    console.log(err);
  }
};

export const resetPassword = (email) => (dispatch) => {
  try {
    axios.post(`/user/reset-password/${email}`)
      .then((response) => {
        dispatch({
          type: RESET_PASSWORD,
          code: response.data.code || null,
          message: response.data.message,
          response: response.status,
          user: response.data.user || {},
        });
      });
  } catch (err) {
    console.log(err);
  }
};

export const verificated = () => (dispatch) => {
  dispatch({
    type: RESET_PASSWORD,
    code: 'verified'
  });
};

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT
    });
    sessionStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  };
};

// User preferences

export const setDarkMode = (data) => (dispatch) => {
  try {
    localStorage.setItem('darkMode', data);
    dispatch({
      type: DARK_MODE,
      darkMode: data,
    });
  } catch (err) {
    console.log(err);
  }
};
