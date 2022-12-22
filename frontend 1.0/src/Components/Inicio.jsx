import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import LoopOutlinedIcon from '@material-ui/icons/LoopOutlined';
import { IconButton, Modal, Snackbar } from '@material-ui/core';
import { chargeGuestUser, login } from '../Redux/Actions/Users';

import CardInfo from './CardInfo';
import Logo from './Logo';
import './css/Inicio.css';

const cards = [
  {
    title: 'Lo importante en un solo lugar',
    description:
      'Sabemos que puedes necesitar tus notas o tareas en cualquier momento o lugar, con NotatKy tendrás acceso a ellas desde donde quieras.',
    color: '#e76f51',
    img: 1,
  },
  {
    title: 'Aumenta tu productividad',
    description:
      'NotatKy te permite tomar notas de una forma muy sencilla, por lo tanto, confiamos en que tu productividad en el día a día aumentará.',
    color: '#e9c46a',
    img: 2,
  },
  {
    title: 'Sincroniza todos tus dispositivos',
    description:
      'Ya sea que estes en la sala de tu casa o en la computadora de tu oficina, tus notas se sincronizarán en todos tus dispositivos.',
    color: '#2a9d8f',
    img: 3,
  },
];

const Inicio = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (token) {
      history.push('/home');
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
  });

  useEffect(() => {
    return () => {
      setOpenSnackbar(false);
    };
  }, []);

  const largeWidth = window.screen.width > 600;
  const midWidth = window.screen.width < 350;

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenSnackbar(true);
    dispatch(chargeGuestUser());
    setTimeout(() => {
      dispatch(login({
        email: process.env.REACT_APP_EMAIL_GUEST,
        password: process.env.REACT_APP_PASSWORD_GUEST
      }, false));
    }, 2000);
  };

  const modal = (
    <div className={largeWidth ? 'modal-col w-50' : 'modal-col w-100 h-100'}>
      <>
        <h2 id="simple-modal-title" className="all-center display-6">
          MODO INVITADO
        </h2>
        <hr />
        <div className="row w-100">
          <div className="w-50">
            <div className="w-100 my-3">
              <b>Al ingresar en modo invitado tendrás ciertas restricciones...</b>
            </div>
            <div className="px-2">
              <ul>
                <li>
                  Debido a que el modo invitado es meramente presentacional,
                  al recargar la ventana o salir de la página los cambios realizados
                  durante la sesión se eliminarán.
                </li>
                <li>
                  Podrás crear y editar colecciones, etiquetas y notas pero no podrás eliminarlas.
                </li>
                <li>
                  No será posible editar el correo electrónico ni la contraseña del usuario.
                </li>
                <li>
                  No será posible cambiar la foto de perfil.
                </li>
              </ul>
            </div>
            <div className="w-100 my-2">
              <p>
                Puedes optar por continuar o&nbsp;
                <a href="https://valentinnicheglod.github.io/NotatKy/#/sign-up" style={{ texDecoration: 'underline' }}>crearte una cuenta</a>
                &nbsp;para disfrutar de todas las funcionalidades...
              </p>
            </div>
            <div className="my-3 d-flex justify-content-center w-100">
              <Button
                color="violet"
                className={largeWidth ? 'textfield button my-2 w-100' : 'textfield button my-2 w-50'}
                id="login-submit"
                onClick={handleSubmit}
                type="button"
              >
                Continuar como invitado
              </Button>
            </div>
          </div>
          <div className="w-50 all-center">
            <img
              src="svg/terms.svg"
              width="100%"
              alt=""
              className="mb-2"
              draggable="false"
            />
          </div>
        </div>
      </>
    </div>
  );

  return (
    <div className={largeWidth ? 'login-bg full-height row' : 'login-bg row overflow-hidden'}>
      {largeWidth ? (
        <div className="inicio-nav row d-flex align-items-center">
          <div className="col-md-4 logo-cont pl-2">
            <Logo />
          </div>
          <div className="col-md-3" />
          <div className="col-md-5 inicio-options">
            <div className="d-inline">
              <Link to="/login" className="inicio-link">
                INICIAR SESIÓN
              </Link>
              <p className="inicio-link2">|</p>
              <Link to="/sign-up" className="inicio-link">
                REGISTRARSE
              </Link>
            </div>
            <div className="d-inline">
              <button
                className="btn btn-outline-warning btn-round inicio-app px-4"
                onClick={() => setOpenModal(true)}
                type="submit"
              >
                INGRESAR COMO INVITADO
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 my-3 d-flex justify-content-between align-items-center">
          <img
            src="logos/logo-wo-bg.png"
            alt="logo"
            width="60"
            height="60"
            className="logo-nav"
          />
          <div className="d-inline">
            <Link to="/login" className="inicio-link">
              INICIAR
            </Link>
            <p className="inicio-link2">|</p>
            <Link to="/sign-up" className="inicio-link">
              REGISTRARSE
            </Link>
          </div>
        </div>
      )}
      <div
        className={
          largeWidth
            ? 'd-flex row d-flex align-items-center h-90'
            : 'd-flex row d-flex justify-content-center w-100 m-0 overflow-y'
        }
      >
        {cards.map((card) => (
          <div
            className={
              largeWidth
                ? 'col-md-4 d-flex justify-content-center align-items-center h-100'
                : 'w-100 my-2 d-flex justify-content-center'
            }
          >
            <CardInfo
              image={`svg/card-img-${card.img}.svg`}
              title={card.title}
              description={card.description}
              color={card.color}
              largeWidth={largeWidth}
            />
          </div>
        ))}
      </div>
      {
        !largeWidth && (
        <div className="d-flex row d-flex justify-content-center w-100 m-0 overflow-y">
          <h6 className="display-6 all-center my-2 white">{midWidth ? 'MODO INVITADO' : 'INGRESAR COMO INVITADO'}</h6>
          <hr />
          <div className="all-center mb-2 w-100 row">
            <div className="w-100 my-3 list-restrictions">
              <b>Al ingresar en modo invitado tendrás ciertas restricciones...</b>
            </div>
            <div className="list-restrictions">
              <ul>
                <li>
                  Debido a que el modo invitado es meramente presentacional,
                  al recargar la ventana o salir de la página los cambios realizados
                  durante la sesión se eliminarán.
                </li>
                <li>
                  Podrás crear y editar colecciones, etiquetas y notas pero no podrás eliminarlas.
                </li>
                <li>
                  No será posible editar el correo electrónico ni la contraseña del usuario.
                </li>
                <li>
                  No será posible cambiar la foto de perfil.
                </li>
              </ul>
            </div>
            <div className="my-3 d-flex justify-content-center w-100 row">
              <small className="m-0 white">Si estas de acuerdo con esto puedes</small>
              <Button
                color="yellow"
                className="textfield button my-2 w-100"
                id="login-submit"
                onClick={handleSubmit}
                type="button"
              >
                Ingresar como invitado
              </Button>
              <small className="all-center m-0 line-aside">o</small>
              <Button
                color="orange"
                className="textfield button my-2 w-100"
                id="login-submit"
                onClick={() => history.push('/sign-up')}
                type="button"
              >
                Crear una cuenta
              </Button>
            </div>
          </div>
        </div>
        )
      }
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        message="Cargando..."
        action={(
          <IconButton
            className="btn"
            size="small"
            color="inherit"
          >
            <LoopOutlinedIcon className="loop-out" />
          </IconButton>
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

export default Inicio;
