import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import AutorenewIcon from '@material-ui/icons/Autorenew';
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
    img: 'https://raw.githubusercontent.com/ValentinNicheglod/NotatKy-/2065c0c992d85d5e6516c3921bfb7d189f6a6eef/frontend/public/svg/card-img-1.svg',
  },
  {
    title: 'Aumenta tu productividad',
    description:
      'NotatKy te permite tomar notas de una forma muy sencilla, por lo tanto, confiamos en que tu productividad en el día a día aumentará.',
    img: 'https://raw.githubusercontent.com/ValentinNicheglod/NotatKy-/2065c0c992d85d5e6516c3921bfb7d189f6a6eef/frontend/public/svg/card-img-2.svg',
  },
  {
    title: 'Sincroniza todos tus dispositivos',
    description:
      'Ya sea que estes en la sala de tu casa o en la computadora de tu oficina, tus notas se sincronizarán en todos tus dispositivos.',
    img: 'https://raw.githubusercontent.com/ValentinNicheglod/NotatKy-/2065c0c992d85d5e6516c3921bfb7d189f6a6eef/frontend/public/svg/card-img-3.svg',
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
    <div className={largeWidth ? 'modal-col w-50 guest-mode' : 'modal-col w-100 h-100'}>
      <>
        <h1 id="simple-modal-title" className="all-center">
          Modo Invitado
        </h1>
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
              src="https://raw.githubusercontent.com/ValentinNicheglod/NotatKy-/2065c0c992d85d5e6516c3921bfb7d189f6a6eef/frontend/public/svg/terms.svg"
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
                Iniciar Sesión
              </Link>
              <p className="inicio-link2">|</p>
              <Link to="/sign-up" className="inicio-link">
                Registrarse
              </Link>
            </div>
            <div className="d-inline">
              <Button
                color="violet"
                className={largeWidth ? 'textfield button my-2 w-100' : 'textfield button my-2 w-50'}
                id="login-submit"
                onClick={() => setOpenModal(true)}
                type="button"
              >
                Ingresar Como Invitado
              </Button>
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
            ? 'd-flex row d-flex align-items-center h-75 justify-content-between m-0'
            : 'd-flex row d-flex justify-content-center w-100 m-0'
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
              image={card.img}
              title={card.title}
              description={card.description}
              largeWidth={largeWidth}
            />
          </div>
        ))}
      </div>
      <a
        href="https://valentinnicheglod.github.io/Portfolio"
        className="personal-logo"
        target="_blank"
        rel="noreferrer noopener"
      >
        <img src="https://raw.githubusercontent.com/ValentinNicheglod/Portfolio/V2.0/src/images/logos/Small.svg" alt="logo" />
      </a>
      {
        !largeWidth && (
        <div className="d-flex row d-flex justify-content-center w-100 m-0 overflow-y">
          <div className="all-center mb-2 mt-4 w-100 row">
            <h2 className="violet">{midWidth ? 'Modo Invitado' : 'Ingresar como invitado'}</h2>
            <div className="w-100 list-restrictions my-2">
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
              <small className="m-0">Si estas de acuerdo con esto puedes</small>
              <Button
                color="violet"
                className="textfield button my-2 w-100"
                id="login-submit"
                onClick={handleSubmit}
                type="button"
              >
                Ingresar como invitado
              </Button>
              <small className="all-center m-0 line-aside">o</small>
              <Button
                color="violet"
                className="textfield button my-2 w-100"
                id="login-submit"
                onClick={() => history.push('/sign-up')}
                type="button"
                basic
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
            <AutorenewIcon className="loop-out" />
          </IconButton>
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

export default Inicio;
