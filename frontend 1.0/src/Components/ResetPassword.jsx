/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  IconButton,
  Snackbar,
  Step,
  StepLabel,
  Stepper,
  TextField
} from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import LoopOutlinedIcon from '@material-ui/icons/LoopOutlined';

import './css/Login.css';
import Logo from './Logo';
import { resetPassword, updateUserPassword } from '../Redux/Actions/Users';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const length = 6;
  const [snackbar, setSnackbar] = useState({
    open: null,
    message: null
  });
  const [password, setPassword] = useState({
    new1: '',
    new2: ''
  });
  const [error, setError] = useState({
    new1: false,
    new2: false
  });
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [code, setCode] = useState([...Array(length)].map(() => ''));
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);
  const largeWidth = window.screen.width > 600;
  const superSmallWidth = window.screen.width < 350;

  const users = useSelector((state) => state.users);

  useEffect(() => {
    if (users.code === 'verified') {
      setSnackbar({ message: null, open: false });
      setStep(3);
    } else if (users.code && users.code !== null && users.code.length === 6) {
      setSnackbar({ message: null, open: false });
      setStep(2);
    }
  }, [users.code]);

  const processInput = (e, slot) => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return;
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);
    if (slot !== length - 1) {
      inputs.current[slot + 1].focus();
    }
    if (newCode.every((num) => num !== '')) {
      setLoading(true);
      setTimeout(() => setLoading(false), 5000);
    }
  };

  const onKeyUp = (e, slot) => {
    if (e.keyCode === 8 && !code[slot] && slot !== 0) {
      const newCode = [...code];
      newCode[slot - 1] = '';
      setCode(newCode);
      inputs.current[slot - 1].focus();
    }
  };

  const steps = ['Ingresa tu correo', 'Ingresa el código de verificación', 'Cambia tu contraseña'];
  const stepsMobile = ['Correo', 'Verificación', 'Contraseña'];

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const sendMail = (e) => {
    e.preventDefault();
    setSnackbar({
      message: 'Cargando...',
      open: true
    });
    if (email === process.env.REACT_APP_EMAIL_GUEST) {
      setSnackbar({
        message: 'No se puede cambiar la contraseña de esta cuenta',
        open: true
      });
    } else if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      dispatch(resetPassword(email));
    } else {
      setSnackbar({
        message: 'Ingrese un correo válido',
        open: true
      });
    }
  };

  const verifyCode = (e) => {
    e.preventDefault();
    if (code.length === 0) {
      setSnackbar({
        message: 'Ingrese el código de verificación',
        open: true
      });
    } else if (code.join('') === users.code) {
      setSnackbar({
        message: 'Código de verificación correcto',
        open: true
      });
      setTimeout(() => {
        setStep(step + 1);
      }, 1000);
    } else {
      setSnackbar({
        message: 'Código de verificación incorrecto',
        open: true
      });
    }
  };

  const changePassword = (e) => {
    e.preventDefault();
    if (!password.new1 || !password.new2) {
      setSnackbar({
        open: true,
        message: 'Complete los campos requeridos',
      });
    } else {
      dispatch(
        updateUserPassword({
          ...users.user,
          password: password.new1,
        })
      );
      setSnackbar({
        open: true,
        message: 'Contraseña actualizada',
      });
      setPassword({ new1: '', new2: '' });
    }
  };

  const handleFocusOut = (type) => {
    if (type === 1) {
      if (password.new1.length < 6) {
        setError({
          ...error,
          new1: true
        });
      } else {
        setError({
          ...error,
          new1: false
        });
      }
    }
    if (type === 2) {
      if (password.new1 !== password.new2) {
        setError({
          ...error,
          new2: true
        });
      } else {
        setError({
          ...error,
          new2: false
        });
      }
    }
  };

  return (
    <div className="login-bg full-height d-flex justify-content-center align-items-center row">
      {largeWidth && (
      <div className="logo-cont">
        <Logo />
      </div>
      )}
      <div className="d-flex full-height justify-content-center align-items-end row p-0">
        <div className="reset-pw card card-round d-flex justify-content-between">
          <form>
            <h3 className="card-title d-flex justify-content-center">
              RESTABLECER CONTRASEÑA
            </h3>
            <hr />
            {
              step === 1
                && (
                <>
                  <div className="all-center">
                    <img
                      src="svg/forgot_password.svg"
                      width="90%"
                      alt=""
                      className="mb-3"
                      draggable="false"
                    />
                  </div>
                  <b className="all-center mb-3">¿No recuerdas tu contraseña?</b>
                  <p className="login-p">
                    Te enviaremos un correo electrónico para que puedas reestablecerla...
                  </p>
                  <div className="d-flex align-items-end justify-content-between my-3">
                    <AlternateEmailIcon />
                    <TextField
                      className="textfield"
                      label="Correo electrónico"
                      onChange={handleChange}
                    />
                  </div>
                  <Button
                    color="purple"
                    className="total-width button mt-3"
                    id="login-submit"
                    onClick={sendMail}
                  >
                    ENVIAR
                  </Button>
                </>
                )
            }
            {
              step === 2
                && (
                <>
                  <div className="all-center">
                    <img
                      src="svg/mail-sent.svg"
                      width="80%"
                      alt=""
                      className="mb-3"
                      draggable="false"
                    />
                  </div>
                  <b className="all-center mb-3">¡Revisa tu correo!</b>
                  <p className="login-p">
                    Introduce el código de verificación que hemos enviado a tu correo electrónico...
                  </p>
                  <div className="code-inputs">
                    {code.map((num, idx) => {
                      return (
                        <input
                          key={idx}
                          type="text"
                          autoComplete="new-password"
                          inputMode="numeric"
                          maxLength={1}
                          value={num}
                          autoFocus={!code[0].length && idx === 0}
                          readOnly={loading}
                          onChange={(e) => processInput(e, idx)}
                          onKeyUp={(e) => onKeyUp(e, idx)}
                          ref={(ref) => inputs.current.push(ref)}
                        />
                      );
                    })}
                  </div>
                  <Button
                    color="purple"
                    className="total-width button mt-3"
                    id="login-submit"
                    onClick={verifyCode}
                    value={email}
                  >
                    VERIFICAR
                  </Button>
                </>
                )
            }
            {
              step === 3
                && (
                <>
                  <div className="all-center">
                    <img
                      src="svg/password.svg"
                      width="100%"
                      alt=""
                      className="mb-3"
                      draggable="false"
                    />
                  </div>
                  <p className="login-p">
                    Introduce una nueva contraseña...
                  </p>
                  <div className="d-flex align-items-end justify-content-between my-3">
                    <VpnKeyIcon />
                    <TextField
                      className="textfield"
                      error={error.new1}
                      helperText={error.new1 && 'La contraseña debe tener al menos seis caracteres'}
                      label="Contraseña nueva"
                      onBlur={() => handleFocusOut(1)}
                      onChange={(e) => setPassword({ ...password, new1: e.target.value })}
                      type="password"
                      value={password.new1}
                    />
                  </div>
                  <div className="d-flex align-items-end justify-content-between my-3">
                    <VpnKeyIcon />
                    <TextField
                      className="textfield"
                      error={error.new2}
                      helperText={error.new2 && 'Las contraseñas no coinciden'}
                      label="Repetir contraseña"
                      onBlur={() => handleFocusOut(2)}
                      onChange={(e) => setPassword({ ...password, new2: e.target.value })}
                      type="password"
                      value={password.new2}
                    />
                  </div>
                  <Button
                    color="purple"
                    className="total-width button mt-3"
                    disabled={error.new1 || error.new2}
                    id="login-submit"
                    onClick={changePassword}
                  >
                    ACTUALIZAR
                  </Button>
                </>
                )
            }
          </form>
          {!largeWidth && !superSmallWidth
        && (
        <div className="d-flex all-center w-100">
          <Stepper activeStep={step - 1} alternativeLabel className="w-100">
            {stepsMobile.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        )}
        </div>
        {largeWidth
        && (
        <div className="d-flex all-center stepper-pw">
          <Stepper activeStep={step - 1} alternativeLabel className="w-50">
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        )}
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbar.open}
        autoHideDuration={snackbar.message === 'Cargando...' ? 10000 : 5000}
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
    </div>
  );
};

export default ResetPassword;
