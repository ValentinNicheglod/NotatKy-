import {
  IconButton, Modal, Snackbar, TextField
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import './css/Login.css';
import Logo from './Logo';
import { chargeGuestUser, login } from '../Redux/Actions/Users';

const Login = () => {
  const history = useHistory();
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');
  const largeWidth = window.screen.width > 600;
  const midWidth = window.screen.width > 350;
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: ''
  });

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({
    email: false,
  });

  useEffect(() => {
    if (token) {
      history.push('/home');
    }
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocusOut = () => {
    if (data.email.length > 0) {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email);
      setError({ ...error, email: !isValidEmail });
    }
  };

  const handleSubmit = () => {
    if (data.email === '' || data.password === '') {
      setSnackbar({
        open: true,
        message: 'Completa todos los campos'
      });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) {
      setSnackbar({
        open: true,
        message: 'Ingrese un correo válido'
      });
    } else {
      if (data.email === process.env.REACT_APP_EMAIL_GUEST) {
        dispatch(chargeGuestUser());
      }
      setOpenModal(true);
    }
  };

  const finishLogin = (rememberInfo) => {
    setOpenModal(false);
    setSnackbar({
      open: true,
      message: 'Cargando...'
    });
    dispatch(login(data, rememberInfo));
    setTimeout(() => {
      if (!token) {
        setSnackbar({ snackbar, open: false });
        setSnackbar({
          open: true,
          message: 'Los datos ingresados no son correctos'
        });
      }
    }, 4000);
  };

  const modal = (
    <div className={largeWidth ? 'modal-col w-50' : 'modal-col w-100 h-100'}>
      <>
        <h2 id="simple-modal-title" className="all-center mb-4">
          {largeWidth ? '¿Recordar Datos de Ingreso?' : 'Recordar Datos'}
        </h2>
        <div className="all-center">
          <img
            src="svg/save-data.svg"
            width={largeWidth ? '60%' : '100%'}
            alt=""
            className="mb-2"
            draggable="false"
          />
        </div>
        <div className="w-100 my-3">
          <p className="all-center">Para tu comodidad, no te solicitaremos los datos al ingresar nuevamente.</p>
        </div>
        <div className="my-3 d-flex justify-content-center w-100">
          <Button
            color="red"
            className={largeWidth ? 'textfield button my-2 w-25 mx-3' : 'textfield button my-2 w-50'}
            id="login-submit"
            onClick={() => finishLogin(false)}
            type="button"
            basic
          >
            No recordar
          </Button>
          <Button
            color="green"
            className={largeWidth ? 'textfield button my-2 w-50' : 'textfield button my-2 w-50'}
            id="login-submit"
            onClick={() => finishLogin(true)}
            type="button"
          >
            Recordar Datos
          </Button>
        </div>
      </>
    </div>
  );

  return (
    <div className="login-bg full-height d-flex justify-content-center align-items-center row">
      {largeWidth && (
      <div className="logo-cont">
        <Logo />
      </div>
      )}
      <div className="card-round card d-flex justify-content-between">
        <form className="all-center row">
          <h3 className="card-title d-flex justify-content-center">
            INICIO DE SESIÓN
          </h3>
          <hr className="bs-gutter" />
          <div className="all-center">
            <img
              src="svg/login.svg"
              width="90%"
              alt=""
              className="mb-2 img-card pe"
              draggable="false"
            />
          </div>
          <div className="d-flex align-items-end justify-content-between mb-4">
            <AlternateEmailIcon />
            <TextField
              className="textfield"
              error={error.email}
              helperText={
                  error.email
                    ? 'Ingrese un correo válido'
                    : ''
              }
              InputProps={{
                autoComplete: 'email'
              }}
              label="Correo electrónico"
              name="email"
              onChange={handleChange}
              onBlur={handleFocusOut}
              value={data.email}
            />
          </div>
          <div className="d-flex align-items-end justify-content-between mb-4">
            <VpnKeyIcon />
            <TextField
              className="textfield"
              InputProps={{
                autoComplete: 'current-password'
              }}
              label="Contraseña"
              name="password"
              value={data.password}
              onChange={handleChange}
              type="password"
            />
          </div>
        </form>
        <div className="all-center">
          <Button
            color="violet"
            disabled={data.email.length === 0 || data.password.length === 0 || error.email}
            onClick={() => handleSubmit()}
            className="w-75 button my-2"
            id="login-submit"
            type="button"
          >
            Iniciar Sesión
          </Button>
        </div>
        <div className="login-sign-up mt-3 row bs-gutter all-center">
          <div>
            <p className="login-p line-aside line-aside-bl">¿No tienes una cuenta?</p>
          </div>
          <Link
            to="/sign-up"
            className={midWidth ? 'sign-up-btn w-75 ui btn mt-3' : 'd-flex justify-content-center login-p mt-3'}
          >
            Registrate
          </Link>
          <hr className="mt-4 mb-3 hr-pad" />
          <Link
            to="/reset-password"
            className="d-flex justify-content-center login-p"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar(false)}
        message={snackbar.message}
        action={(
          snackbar.message === 'Cargando...'
            ? (
              <IconButton
                className="btn"
                size="small"
                color="inherit"
              >
                <AutorenewIcon className="loop-out" />
              </IconButton>
            )
            : (
              <IconButton
                className="btn"
                size="small"
                color="inherit"
                onClick={() => setSnackbar(false)}
              >
                <HighlightOffOutlinedIcon fontSize="small" />
              </IconButton>
            )
        )}
      />
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        className="d-flex w-100 justify-content-center align-items-center modal"
      >
        {modal}
      </Modal>
    </div>
  );
};

export default Login;
