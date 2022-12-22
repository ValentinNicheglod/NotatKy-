import {
  IconButton, Modal, Snackbar, TextField
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import LoopOutlinedIcon from '@material-ui/icons/LoopOutlined';
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

  const handleSubmit = (e, rememberInfo) => {
    e.preventDefault();
    setOpenModal(false);
    setSnackbar({
      open: true,
      message: 'Cargando...'
    });
    if (data.email === '' || data.password === '') {
      setSnackbar({
        open: true,
        message: 'Completa todos los campos'
      });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) {
      setSnackbar({
        open: true,
        message: 'Ingrese un correo válido'
      });
    } else {
      if (data.email === process.env.REACT_APP_EMAIL_GUEST) {
        dispatch(chargeGuestUser());
      }
      dispatch(login(data, rememberInfo));
      setTimeout(() => {
        if (!token) {
          setSnackbar({
            open: true,
            message: 'Los datos ingresados no son correctos'
          });
        }
      }, 4000);
    }
  };

  const modal = (
    <div className={largeWidth ? 'modal-col w-50' : 'modal-col w-100 h-100'}>
      <>
        <h2 id="simple-modal-title" className="all-center display-6">
          {largeWidth ? '¿RECORDAR INFORMACIÓN DE SESIÓN?' : 'RECORDAR DATOS'}
        </h2>
        <hr />
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
          <b className="all-center">Para tu comodidad, no te solicitaremos los datos al ingresar nuevamente.</b>
        </div>
        <div className="my-3 d-flex justify-content-center w-100">
          <Button
            color="green"
            className={largeWidth ? 'textfield button my-2 w-25' : 'textfield button my-2 w-50'}
            id="login-submit"
            onClick={(e) => handleSubmit(e, true)}
            type="button"
          >
            SÍ
          </Button>
          <Button
            color="red"
            className={largeWidth ? 'textfield button my-2 w-25' : 'textfield button my-2 w-50'}
            id="login-submit"
            onClick={(e) => handleSubmit(e, false)}
            type="button"
          >
            NO
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
          {/* <p className="login-p">Ingresa con tu correo...</p> */}
          <div className="d-flex align-items-end justify-content-between mb-4">
            <AlternateEmailIcon />
            <TextField
              className="textfield"
              InputProps={{
                autoComplete: 'email'
              }}
              label="Correo electrónico"
              name="email"
              onChange={handleChange}
              autoComplete="email"
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
          <Button
            color="purple"
            disabled={data.email.length === 0 || data.password.length === 0}
            className="total-width button my-2"
            id="login-submit"
            type="button"
            onClick={() => setOpenModal(true)}
          >
            INICIAR SESIÓN
          </Button>
        </form>
        {/* <div className="total-width row m-1 login-bs">
                    <div className="col-md-5 p-0 mt-2">
                        <hr/>
                    </div>
                    <div className="col-md-2 d-flex justify-content-center">
                        <p className= "login-p mb-1">o</p>
                    </div>
                    <div className="col-md-5 p-0 mt-2">
                        <hr/>
                    </div>
                </div>
                <div className= "my-1 total-width row d-flex justify-content-between login-bs">
                    <p className= "login-p">Inicia sesión con...</p>
                    <Button className= "col-md-5 button google-btn my-2">
                        <Icon name= "google"/>
                        Google
                    </Button>
                    <Button
                        color= "facebook"
                        className= "col-md-5 button my-2"
                    >
                        <Icon name= "facebook"/>
                        Facebook
                    </Button>

                </div> */}

        <div className="login-sign-up mt-3 row bs-gutter">
          <div>
            <p className="login-p line-aside line-aside-bl">¿No tienes una cuenta?</p>
          </div>
          <Link
            to="/sign-up"
            className={midWidth ? 'sign-up-btn ui btn mt-3' : 'd-flex justify-content-center login-p mt-3'}
          >
            REGISTRATE
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
                <LoopOutlinedIcon className="loop-out" />
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
        className="d-flex w-100 justify-content-center align-items-center"
      >
        {modal}
      </Modal>
    </div>
  );
};

export default Login;
