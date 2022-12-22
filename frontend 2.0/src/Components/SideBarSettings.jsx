import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
} from '@material-ui/core';

import MoreOutlinedIcon from '@material-ui/icons/MoreOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import NightsStayOutlinedIcon from '@material-ui/icons/NightsStayOutlined';
import CollectionsBookmarkOutlinedIcon from '@material-ui/icons/CollectionsBookmarkOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';

import {
  setDarkMode as darkModeToggle,
  logout,
  updateUser,
} from '../Redux/Actions/Users';

import './css/Settings.css';

import Logo from './Logo';

const SideBarSettings = ({ setDrawerOpen }) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const path = location.pathname;
  const [openDialogLogout, setOpenDialogLogout] = useState(false);
  const [openDialogDeletePhoto, setOpenDialogDeletePhoto] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === true
      || localStorage.getItem('darkMode') === 'true',
  );
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    dispatch(darkModeToggle(darkMode));
  }, [darkMode, dispatch]);

  const largeWidth = window.screen.width > 600;

  const changeRoute = (url) => {
    history.push(url);
    if (!largeWidth) setDrawerOpen(false);
  };

  const handleDelete = () => {
    dispatch(
      updateUser({
        ...user,
        profile_photo: null,
      }),
    );
  };

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="row profile full-height m-0 d-flex">
      <div className="profile-sidebar full-height">
        <div
          className="inicio-logo"
          onClick={() => changeRoute('/home')}
          onKeyDown={() => changeRoute('/home')}
          role="button"
          tabIndex={0}
        >
          <Logo />
        </div>
        <div className="overflow-y" style={{ height: '90%' }}>
          <div id="home-side-bar">
            <List component="nav" className="white">
              <ListItem
                button
                className={path === '/edit profile' ? 'settings-select' : undefined}
                id="item-side-bar"
                onClick={() => {
                  changeRoute('/edit profile');
                }}
              >
                <ListItemIcon>
                  <PersonOutlineOutlinedIcon className={path === '/edit profile' ? 'violet' : 'white'} />
                </ListItemIcon>
                <ListItemText primary="Mi perfil" />
              </ListItem>
              {largeWidth ? (
                <ListItem
                  button
                  className={
                    path === '/collections tags/' && darkMode
                      ? 'settings-select-dark'
                      : path === '/collections tags'
                        ? 'settings-select'
                        : undefined
                  }
                  id="item-side-bar"
                  onClick={() => {
                    changeRoute('/collections tags');
                  }}
                >
                  <ListItemIcon>
                    <MoreOutlinedIcon className={path === '/collections tags' ? 'violet' : 'white'} />
                  </ListItemIcon>
                  <ListItemText primary="Colecciones y etiquetas" />
                </ListItem>
              ) : (
                <ListItem
                  button
                  className={
                    path === '/collections tags/col' && darkMode
                      ? 'settings-select-dark'
                      : path === '/collections tags/col'
                        ? 'settings-select'
                        : null
                  }
                  id="item-side-bar"
                  onClick={() => {
                    changeRoute('/collections tags/col');
                  }}
                >
                  <ListItemIcon>
                    <CollectionsBookmarkOutlinedIcon className={path === '/collections tags/col' ? 'violet' : 'white'} />
                  </ListItemIcon>
                  <ListItemText primary="Colecciones" />
                </ListItem>
              )}
              {!largeWidth && (
                <ListItem
                  button
                  className={
                    path === '/collections tags/tag' && darkMode
                      ? 'settings-select-dark'
                      : path === '/collections tags/tag'
                        ? 'settings-select'
                        : undefined
                  }
                  id="item-side-bar"
                  onClick={() => {
                    changeRoute('/collections tags/tag');
                  }}
                >
                  <ListItemIcon>
                    <LocalOfferOutlinedIcon className={path === '/collections tags/tag' ? 'violet' : 'white'} />
                  </ListItemIcon>
                  <ListItemText primary="Etiquetas" />
                </ListItem>
              )}
              <hr />
              <ListItem
                button
                className="item-side-bar"
                id="item-side-bar"
              >
                <ListItemIcon>
                  <NightsStayOutlinedIcon className="white" />
                </ListItemIcon>
                <ListItemText primary="Modo oscuro" />
                <Switch
                  edge="end"
                  onChange={handleToggle}
                  checked={darkMode}
                  color="primary"
                />
              </ListItem>
              <ListItem
                button
                className="item-side-bar"
                id="item-side-bar"
                onClick={() => setOpenDialogLogout(true)}
              >
                <ListItemIcon>
                  <ExitToAppOutlinedIcon className="white" />
                </ListItemIcon>
                <ListItemText primary="Cerrar sesión" />
              </ListItem>
            </List>
          </div>
        </div>
      </div>
      <Dialog
        open={openDialogLogout}
        onClose={() => setOpenDialogLogout(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">¿Desea cerrar sesión?</DialogTitle>
        <DialogActions>
          <Button className="btn" onClick={() => setOpenDialogLogout(false)} color="primary">
            No
          </Button>
          <Button className="btn" onClick={handleLogout} color="primary">
            Sí
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialogDeletePhoto}
        onClose={() => setOpenDialogDeletePhoto(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ¿Desea eliminar la foto de perfil?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tenga en cuenta que una vez que elimine la foto la misma no podrá
            ser recuperada.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialogDeletePhoto(false)}
            color="primary"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleDelete();
              setOpenDialogDeletePhoto(false);
            }}
            color="primary"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SideBarSettings;
