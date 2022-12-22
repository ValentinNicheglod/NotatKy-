/* eslint-disable import/no-named-as-default-member */
import React, { useEffect, useState } from 'react';
import bcrypt from 'bcryptjs';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer } from '@material-ui/core';
import { useHistory } from 'react-router';
import SideBarSettings from '../Components/SideBarSettings';
import UserCard from '../Components/UserCard';
import Profile from '../Components/Profile';
import { getOneUser, updateUser, updateUserPassword } from '../Redux/Actions/Users';
import Loading from '../Components/Loading';

const SettingsProfile = () => {
  const [visiblePassword, setVisiblePassword] = useState({
    newPassword: false,
    password: false,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
  });
  const [password, setPassword] = useState({
    current: '',
    new1: '',
    new2: '',
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [information, setInformation] = useState();
  const [editing, setEditing] = useState('');
  const [error, setError] = useState({
    password: false
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector((state) => state.users);
  const userId = sessionStorage.getItem('id') || localStorage.getItem('id');
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');
  const { darkMode } = users;
  const isGuest = users.user.id === 1;

  useEffect(() => {
    dispatch(getOneUser(userId));
  }, [dispatch]);

  useEffect(() => {
    setInformation(users.user);
  }, [users]);

  useEffect(() => {
    if (users.user.name) {
      setLoading(false);
    }
  }, [users.user]);

  useEffect(() => {
    if (token === null) {
      history.push('/login');
    }
  }, [history]);

  const largeWidth = window.screen.width > 600;

  const closeSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const editionMode = (section) => {
    setEditing(section);
  };

  const handleChange = (e) => {
    setInformation({
      ...information,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeletePhoto = () => {
    dispatch(
      updateUser({
        ...information,
        profile_photo: null,
      }),
    );
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleErrors = () => {
    if (password.new1.length < 6 && password.new1.length > 0) {
      setError({
        ...error,
        password: true
      });
    } else {
      setError({
        ...error,
        password: false
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!largeWidth) setEditing('');
    if (!information.name) {
      setSnackbar({
        open: true,
        message: 'Debe ingresar un nombre',
      });
    } else if (!information.lastname) {
      setSnackbar({
        open: true,
        message: 'Debe ingresar un apellido',
      });
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(information.email)) {
      if (information.email.length === 0) {
        setSnackbar({
          open: true,
          message: 'Debe ingresar un correo',
        });
      } else {
        setSnackbar({
          open: true,
          message: 'Ingrese un correo válido',
        });
      }
    } else if (users.user.id === 1) {
      dispatch(updateUser({
        ...information,
        email: process.env.REACT_APP_EMAIL_GUEST,
        password: process.env.REACT_APP_PASSWORD_GUEST
      }));
      setEditing('');
      setSnackbar({
        open: true,
        message: 'Datos actualizados',
      });
    } else {
      dispatch(updateUser(information));
      setEditing('');
      setSnackbar({
        open: true,
        message: 'Datos actualizados',
      });
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    bcrypt.compare(password.current, information.password)
      .then((res) => {
        if (!res) {
          setSnackbar({
            open: true,
            message: 'Contraseña actual incorrecta',
          });
        } else if (password.new1 !== password.new2) {
          setSnackbar({
            open: true,
            message: 'Las contraseñas no coincíden',
          });
        } else if (!password.current || !password.new1 || !password.new2) {
          setSnackbar({
            open: true,
            message: 'Complete los campos requeridos',
          });
        } else {
          dispatch(
            updateUserPassword({
              ...information,
              password: password.new1,
            }),
          );
          setEditing('');
          setSnackbar({
            open: true,
            message: 'Contraseña actualizada',
          });
          setPassword({
            current: '',
            new1: '',
            new2: ''
          });
        }
      });
  };

  const mouseEnter = (e) => {
    if (largeWidth) {
      const children = e.target.children[0];
      if (children) {
        children.className = 'btn btn-round mx-3 btn-sm btn-outline-primary profile-edit-active';
      }
    }
  };

  const mouseLeave = (e) => {
    if (largeWidth) {
      const children = e.target.children[0];
      if (children) {
        children.className = 'btn btn-round mx-3 btn-sm btn-outline-primary profile-edit';
      }
    }
  };

  const visibilityPassword = (type) => {
    setVisiblePassword({
      ...visiblePassword,
      [type]: !visiblePassword[type],
    });
  };

  return (
    <div
      className={largeWidth ? 'row full-height' : 'row full-height bs-gutter'}
    >
      {loading
        ? <Loading />
        : (
          <>
            {largeWidth ? (
              <div className="col-md-2 login-bg p-0">
                <SideBarSettings />
              </div>
            ) : (
              <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} id="hidden-overflow">
                <div className="col-md-2 login-bg p-0 full-height">
                  <SideBarSettings setDrawerOpen={setDrawerOpen} />
                </div>
              </Drawer>
            )}
            {largeWidth && (
              <div className="col-md-3 blue-aside" id={darkMode && 'dark-border'}>
                <UserCard
                  darkMode={darkMode}
                  handleDelete={handleDeletePhoto}
                  isGuest={isGuest}
                  user={users.user}
                />
              </div>
            )}
            <div
              className={largeWidth ? 'col-md-7 h-100' : 'bs-gutter'}
              id={darkMode && 'dark'}
            >
              <Profile
                closeSnackbar={closeSnackbar}
                darkMode={darkMode}
                editing={editing}
                editionMode={editionMode}
                error={error}
                handleChange={handleChange}
                handleErrors={handleErrors}
                handlePasswordChange={handlePasswordChange}
                handlePasswordSubmit={handlePasswordSubmit}
                handleSubmit={handleSubmit}
                information={information}
                largeWidth={largeWidth}
                mouseEnter={mouseEnter}
                mouseLeave={mouseLeave}
                password={password}
                setDrawerOpen={setDrawerOpen}
                snackbar={snackbar}
                visibilityPassword={visibilityPassword}
                visiblePassword={visiblePassword}
                user={users.user}
              />
            </div>
          </>
        )}
    </div>
  );
};

export default SettingsProfile;
