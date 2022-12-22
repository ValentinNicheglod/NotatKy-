/* eslint-disable no-unused-expressions */
import {
  IconButton, InputAdornment, Modal, Snackbar, TextField
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Confetti from 'confetti-react';
import { Button } from 'semantic-ui-react';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import FaceIcon from '@material-ui/icons/Face';
import './css/Login.css';
import { useHistory } from 'react-router';
import Logo from './Logo';
import { createUser, getAllMails } from '../Redux/Actions/Users';

const SignUp = () => {
  const largeWidth = window.screen.width > 600;
  const users = useSelector((state) => state.users);
  const history = useHistory();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [data, setData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    duplicatedEmail: ''
  });

  const invalidInputEntry = error.email || error.password
  || error.confirmPassword || error.duplicatedEmail;
  const allInputsCompleted = Object.values(data).every((inputValue) => inputValue.length > 0);
  const isEmailInvalid = error.email || error.duplicatedEmail !== '';
  const emailErrorMessage = error.email
    ? 'Ingrese un correo válido'
    : error.duplicatedEmail
      ? 'Este correo electrónico pertenece a otra cuenta'
      : 'Este correo electrónico se encuentra disponible';

  useEffect(() => {
    if (token !== null) {
      history.push('/home');
    }
  });

  useEffect(() => {
    dispatch(getAllMails());
  }, [dispatch]);

  useEffect(() => {
    if (data.name) {
      setOpenModal(true);
      setOpenSnackbar(false);
    }
  }, [users.user]);

  const handleChange = (e) => {
    const inputValue = e.target.value;

    setData({
      ...data,
      [e.target.name]: inputValue,
    });

    if (e.target.name === 'password') {
      setError({ ...error, password: inputValue.length < 6 });
    }
    if (e.target.name === 'confirmPassword' && !error.password) {
      setError({ ...error, confirmPassword: inputValue !== data.password });
    }
  };

  const handleFocusOut = () => {
    if (data.email.length > 0) {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email);
      setError({ ...error, email: !isValidEmail });
      if (isValidEmail) {
        setError({
          ...error,
          duplicatedEmail: users.users[0] && users.users.includes(data.email),
          email: false
        });
      } else {
        setError({ ...error, email: true });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (allInputsCompleted) {
      dispatch(createUser(data));
      setOpenSnackbar(2);
    } else {
      setOpenSnackbar(1);
    }
  };

  const modal = (
    <>
      {parseInt(users.response, 10) === 201 && <Confetti className="w-100 h-100" recycle={false} />}
      <div className={largeWidth ? 'modal-col w-50' : 'modal-col w-100 h-100'}>
        {
        parseInt(users.response, 10) === 201
          ? (
            <>
              <h2 id="simple-modal-title" className="all-center mb-4">¡FELICIDADES!</h2>
              <div className="all-center">
                <img
                  src="svg/celebration.svg"
                  width="60%"
                  alt=""
                  className="mb-2 "
                  draggable="false"
                />
              </div>
              <div className="w-100 mt-3 mb-2">
                <b className="all-center">Tu cuenta ha sido creada exitosamente</b>
              </div>
              <div className="w-100">
                <p className="all-center">Bienvenido a NotatKy</p>
              </div>
              <div className="my-3 all-center">
                <Button
                  color="violet"
                  className="textfield button my-2 w-50"
                  id="login-submit"
                  onClick={() => history.push('/login')}
                  type="button"
                >
                  Iniciar Sesión
                </Button>
              </div>
            </>
          )
          : (
            <>
              <h2 id="simple-modal-title" className="all-center">HA OCURRIDO UN ERROR</h2>
              <hr />
              <div className="all-center">
                <img
                  src="svg/error.svg"
                  width="60%"
                  alt=""
                  className="mb-2 "
                  draggable="false"
                />
              </div>
              <div className="w-100 my-3">
                <b className="all-center">Ocurrió un error al intentar crear tu cuenta</b>
              </div>
              <div className="w-100 my-3">
                <b className="all-center">Por favor, intentalo mas tarde</b>
              </div>
            </>
          )
      }

      </div>
    </>
  );

  return (
    <div className="login-bg full-height d-flex justify-content-center align-items-center row">
      {largeWidth && (
      <div className="logo-cont">
        <Logo />
      </div>
      )}
      <div className="card-round card d-flex justify-content-between sign-up">
        <form className="all-center row h-100">
          <h3 className="card-title d-flex justify-content-center">
            CREAR USUARIO
          </h3>
          <hr />
          <div className="all-center">
            <img
              src="https://valentinnicheglod.github.io/NotatKy/svg/sign-up.svg"
              width="90%"
              alt=""
              className="mb-2 img-card"
              draggable="false"
            />
          </div>
          <p className="login-p">Completa el formulario con tus datos...</p>
          <div className="d-flex align-items-end justify-content-between field">
            <FaceIcon />
            <TextField
              className="textfield name"
              InputProps={{
                autoComplete: 'given-name',
                spellCheck: false
              }}
              label="Nombre"
              name="name"
              onChange={handleChange}
              value={data.name}
            />
            <TextField
              className="textfield name"
              InputProps={{
                autoComplete: 'family-name',
                spellCheck: false
              }}
              label="Apellido"
              name="lastname"
              onChange={handleChange}
              value={data.lastname}
            />
          </div>
          <div className="d-flex align-items-end justify-content-between field">
            <AlternateEmailIcon />
            <TextField
              id={error.duplicatedEmail ? '' : 'green-input'}
              className="textfield"
              error={error.email || error.duplicatedEmail}
              helperText={
                isEmailInvalid ? emailErrorMessage : ''
              }
              label="Correo electrónico"
              name="email"
              onChange={handleChange}
              onBlur={handleFocusOut}
              value={data.email}
              FormHelperTextProps={{
                className: (!error.email && error.duplicatedEmail === false) && 'green-label'
              }}
              InputProps={{
                autoComplete: 'email',
                endAdornment: (
                  <InputAdornment aria-describedby="popr" id="input-ador" position="end">
                    {
                      (!error.email && error.duplicatedEmail !== '') && (
                        error.duplicatedEmail
                          ? <HighlightOffOutlinedIcon style={{ color: 'red' }} />
                          : <CheckCircleOutlineIcon style={{ color: 'green' }} />
                      )
                    }
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="d-flex align-items-end justify-content-between field">
            <VpnKeyIcon />
            <TextField
              className="textfield"
              error={error.password}
              helperText={error.password && 'La contraseña debe tener al menos seis caracteres'}
              InputProps={{
                autoComplete: 'new-password'
              }}
              label="Contraseña"
              name="password"
              onChange={handleChange}
              type="password"
              value={data.password.one}
            />
          </div>
          <div className="d-flex align-items-end justify-content-between mb-4 field">
            <VpnKeyIcon />
            <TextField
              className="textfield"
              error={error.confirmPassword}
              helperText={error.confirmPassword && 'Las contraseñas no coínciden'}
              InputProps={{
                autoComplete: 'new-password'
              }}
              type="password"
              label="Repite la contraseña"
              name="confirmPassword"
              onChange={handleChange}
              value={data.password.two}
            />
          </div>
        </form>
        <div className="all-center">
          <Button
            color="violet"
            className="textfield button my-2 w-75"
            disabled={invalidInputEntry || !allInputsCompleted}
            id="login-submit"
            onClick={handleSubmit}
            type="submit"
          >
            Registrarse
          </Button>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        message={openSnackbar === 1 ? 'Completa todos los campos' : 'Cargando...'}
        action={(
          openSnackbar === 2
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
                onClick={() => setOpenSnackbar(false)}
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

export default SignUp;
