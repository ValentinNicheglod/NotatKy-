import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Drawer, IconButton, Snackbar } from '@material-ui/core';
import { HighlightOffOutlined } from '@material-ui/icons';
import SideBarSettings from '../Components/SideBarSettings';
import Collections from '../Components/Collections';
import Tags from '../Components/Tags';
import {
  createTag,
  deleteTag,
  getAllTags,
  updateTag,
} from '../Redux/Actions/Tags';
import {
  createCollection,
  deleteCollection,
  getAllCollections,
  updateCollection,
} from '../Redux/Actions/Collections';
import { getOneUser } from '../Redux/Actions/Users';

const SettingsCollections = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const darkMode = useSelector((state) => state.users.darkMode);

  const users = useSelector((state) => state.users);
  const collections = useSelector((state) => state.collections);
  const tags = useSelector((state) => state.tags);

  const [editing, setEditing] = useState({
    tag: '',
    col: '',
  });
  const [open, setOpen] = useState({
    tag: false,
    col: false,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const largeWidth = window.screen.width > 600;
  const isGuest = users.user.id === 1;
  const userId = sessionStorage.getItem('id') || localStorage.getItem('id');
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');

  useEffect(() => {
    dispatch(getOneUser(userId));
    dispatch(getAllCollections(userId));
    dispatch(getAllTags(userId));
  }, [dispatch]);

  useEffect(() => {
    if (token === null) {
      history.push('/login');
    }
  }, [history]);

  const updateInformation = () => {
    setTimeout(() => {
      dispatch(getAllCollections(userId));
      dispatch(getAllTags(userId));
    }, 500);
  };

  const handleChangeCollection = (data) => {
    dispatch(updateCollection(data));
    setEditing({
      ...editing,
      col: undefined,
    });
    setSnackbar({
      open: true,
      message: 'Colección actualizada',
    });
  };

  const handleCreateCollection = (data) => {
    dispatch(createCollection(data, userId));
    setOpen({
      ...open,
      col: false,
    });
    setSnackbar({
      open: true,
      message: 'Colección creada',
    });
  };

  const handleDeleteCollection = (id) => {
    if (isGuest && id < 5) {
      setSnackbar({
        open: true,
        message: 'Acción no permitida en modo invitado'
      });
      setEditing({
        ...editing,
        tag: undefined,
        col: undefined,
      });
    } else {
      dispatch(deleteCollection(id));
      updateInformation();
      setEditing({
        ...editing,
        col: undefined,
      });
      setSnackbar({
        open: true,
        message: 'Colección eliminada',
      });
    }
  };

  const handleChangeTag = (data) => {
    dispatch(updateTag(data));
    updateInformation();
    setEditing({
      ...editing,
      tag: undefined,
    });
    setSnackbar({
      open: true,
      message: 'Etiqueta actualizada',
    });
  };

  const handleCreateTag = (data) => {
    dispatch(
      createTag(data, userId)
    );
    setOpen({
      ...open,
      tag: false,
    });
    setSnackbar({
      open: true,
      message: 'Etiqueta creada',
    });
  };

  const handleDeleteTag = (id) => {
    if (isGuest && id < 8) {
      setSnackbar({
        open: true,
        message: 'Acción no permitida en modo invitado'
      });
      setEditing({
        ...editing,
        tag: undefined,
        col: undefined,
      });
    } else {
      dispatch(deleteTag(id));
      updateInformation();
      setEditing({
        ...editing,
        tag: undefined,
        col: undefined,
      });
      setSnackbar({
        open: true,
        message: 'Etiqueta eliminada',
      });
    }
  };

  const openModal = (type, state) => {
    setEditing({
      ...editing,
      tag: undefined,
      col: undefined,
    });
    setOpen({
      ...open,
      [type]: state,
    });
  };

  return (
    <div
      className={largeWidth ? 'row full-height user-select' : 'row full-height bs-gutter'}
    >
      {largeWidth ? (
        <div className="col-md-2 purple-bg p-0">
          <SideBarSettings users={users} />
        </div>
      ) : (
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <div className="col-md-2 purple-bg p-0 full-height">
            <SideBarSettings users={users} setDrawerOpen={setDrawerOpen} />
          </div>
        </Drawer>
      )}
      {!largeWidth ? ( // If is mobile
        match.params.type === 'col' ? (
          <div className="col-md-5">
            <Collections
              collections={collections}
              darkMode={darkMode}
              editing={editing}
              largeWidth={largeWidth}
              open={open}
              openModal={openModal}
              setEditing={setEditing}
              handleChange={handleChangeCollection}
              handleCreate={handleCreateCollection}
              handleDelete={handleDeleteCollection}
              setDrawerOpen={setDrawerOpen}
            />
          </div>
        ) : (
          <div className="col-md-5">
            <Tags
              darkMode={darkMode}
              editing={editing}
              open={open}
              openModal={openModal}
              setEditing={setEditing}
              handleChange={handleChangeTag}
              handleCreate={handleCreateTag}
              handleDelete={handleDeleteTag}
              largeWidth={largeWidth}
              setDrawerOpen={setDrawerOpen}
              tags={tags}
            />
          </div>
        )
      ) : (
        <>
          <div className="col-md-5 full-height">
            <Collections
              collections={collections}
              darkMode={darkMode}
              editing={editing}
              largeWidth={largeWidth}
              open={open}
              openModal={openModal}
              setEditing={setEditing}
              handleChange={handleChangeCollection}
              handleCreate={handleCreateCollection}
              handleDelete={handleDeleteCollection}
              setDrawerOpen={setDrawerOpen}
            />
          </div>

          <div className="col-md-5 full-height">
            <Tags
              darkMode={darkMode}
              editing={editing}
              open={open}
              openModal={openModal}
              setEditing={setEditing}
              handleChange={handleChangeTag}
              handleCreate={handleCreateTag}
              handleDelete={handleDeleteTag}
              largeWidth={largeWidth}
              setDrawerOpen={setDrawerOpen}
              tags={tags}
            />
          </div>
        </>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(false)}
        message={snackbar.message}
        action={(
          <>
            <IconButton
              className="btn"
              size="small"
              color="inherit"
              onClick={() => setSnackbar(false)}
            >
              <HighlightOffOutlined fontSize="small" />
            </IconButton>
          </>
        )}
      />
    </div>
  );
};

export default SettingsCollections;
