import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  IconButton,
  Snackbar,
} from '@material-ui/core';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

import SideBarHome from '../Components/SideBarHome';
import NavBarHome from '../Components/NavBarHome';
import Notes from '../Components/Notes';

import { getAllCollections } from '../Redux/Actions/Collections';
import {
  addNoteTag,
  deleteNoteTag,
  getAllNotes,
  getOneNote,
  createNote,
  updateNoteState,
  deleteNote,
  updateNote,
} from '../Redux/Actions/Notes';
import { getAllTags } from '../Redux/Actions/Tags';
import { chargeGuestUser, getOneUser, setDarkMode } from '../Redux/Actions/Users';

import '../Components/css/Notes.css';
import EditNote from '../Components/EditNote';
import Loading from '../Components/Loading';

const SettingsCollections = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const notes = useSelector((state) => state.notes);
  const tags = useSelector((state) => state.tags);
  const collections = useSelector((state) => state.collections);
  const users = useSelector((state) => state.users);

  const [onEdition, setOnEdition] = useState({
    content: '',
    title: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    undo: true,
  });
  const [selectedFilter, setSelectedFilter] = useState({
    type: '',
    name: '',
  });
  const [loadingSave, setLoadingSave] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(false);
  const [counter, setCounter] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [openTagModal, setOpenTagModal] = useState(false);
  const [openColModal, setOpenColModal] = useState(false);

  const userId = sessionStorage.getItem('id') || localStorage.getItem('id');
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');
  const { pathname } = history.location;
  const isGuest = users.user.id === 1;

  useEffect(() => {
    if (token === null) {
      history.push('/login');
    }
  }, [history]);

  useEffect(() => {
    if (userId) {
      dispatch(getOneUser(userId));
      dispatch(getAllCollections(userId));
      dispatch(getAllTags(userId));
      dispatch(getAllNotes(userId));
      dispatch(
        setDarkMode(
          localStorage.getItem('darkMode') === true
            || localStorage.getItem('darkMode') === 'true',
        ),
      );
    }
    return () => {
      if (onEdition.id) {
        dispatch(updateNote({
          ...notes.note,
          title: onEdition.title,
          content: onEdition.content
        }));
      }
      if (users.user.id === 1) {
        dispatch(chargeGuestUser());
      }
    };
  }, []);

  useEffect(() => {
    if (users.user.id && users.user.name) {
      setLoading(false);
      if (token !== users.token) {
        history.push('/login');
      }
    }
  }, [users.user.id]);

  if (notes.notes) {
    notes.notes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      }
      if (a.updatedAt < b.updatedAt) {
        return 1;
      }
      return 0;
    });
  }

  const mainDashboardNotes = notes.notes && notes.notes.filter((note) => note.state === 'main-dashboard');
  const archivedNotes = notes.notes && notes.notes.filter((note) => note.state === 'archive');
  const trashNotes = notes.notes && notes.notes.filter((note) => note.state === 'trash');

  const largeWidth = window.screen.width > 600;

  const hour = moment().hour();
  let greeting = '';

  if (hour > 4 && hour < 12) {
    greeting = 'Buen día';
  } else if (hour >= 12 && hour < 19) {
    greeting = 'Buenas tardes';
  } else {
    greeting = 'Buenas noches';
  }

  let noNotesMessage = '';

  if (inputValue.length > 2) {
    noNotesMessage = 'No hay coincidencias';
  } else if (pathname === '/trash') {
    noNotesMessage = 'No hay notas en la papelera';
  } else if (pathname === '/archive') {
    noNotesMessage = 'No hay notas archivadas';
  } else {
    noNotesMessage = 'No hay notas';
  }

  const showSnackBar = (message, status, undo) => {
    if (status === 201) {
      setSnackbar({
        open: true,
        message,
        undo,
      });
    } else {
      setSnackbar({
        open: true,
        message: 'Ha ocurrido un error',
        undo: false,
      });
    }
  };

  const saveNote = () => {
    if (onEdition.title !== notes.note.title || onEdition.content !== notes.note.content) {
      setLoadingSave(true);
      dispatch(updateNote(onEdition));
      setTimeout(() => {
        setLoadingSave(false);
      }, 500);
    }
  };

  const addTag = (noteId, tagId) => {
    dispatch(addNoteTag(noteId, tagId));
    setTimeout(() => {
      dispatch(getAllNotes(userId));
    }, 500);
  };

  const automaticSave = () => {
    setCounter(counter + 1);
    if (counter >= 10) {
      setLoadingSave(true);
      setCounter(0);
      dispatch(updateNote(onEdition));
      setTimeout(() => {
        setLoadingSave(false);
      }, 2000);
    }
  };

  const changeRoute = (url) => {
    history.push(url);
    setFilter(false);
    setOnEdition({
      title: '',
      content: '',
    });
    setDrawerOpen(false);
    setSelectedFilter({
      name: '',
      type: ''
    });
  };

  const closeNote = () => {
    saveNote();
    setOpenNote(false);
    setTimeout(() => {
      setOnEdition({
        title: '',
        content: '',
      });
    }, 1000);
  };

  const closeSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const deleteTag = (noteId, tagId) => {
    dispatch(deleteNoteTag(noteId, tagId));
  };

  const newNote = () => {
    dispatch(
      createNote(
        {
          title: '',
          content: '',
        },
        userId,
      ),
    );
  };

  const duplicateNote = () => {
    if (onEdition.id) {
      dispatch(
        createNote(
          {
            ...notes.note,
            title: onEdition.title,
            content: onEdition.content,
          },
          userId,
        )
      );
    }
    showSnackBar('Nota duplicada', notes.response, false);
  };

  const editNoteCollection = (id) => {
    dispatch(
      updateNote({
        ...notes.note,
        collectionId: id,
      }),
    );
  };

  const editNote = (id) => {
    const noteById = notes.notes.filter((note) => note.id === id);
    if (onEdition.id) saveNote();
    setTimeout(() => {
      setOnEdition(noteById[0]);
      dispatch(getOneNote(id));
      if (!largeWidth) setOpenNote(true);
    }, 500);
  };

  const filterCollections = (id) => {
    setDrawerOpen(false);
    setSelectedFilter({
      type: 'Colección',
      name: collections.collections.filter((col) => col.id === id)[0].name,
    });
    if (pathname === '/trash') {
      setFilter(trashNotes.filter((note) => note.collectionId === id));
    } else if (pathname === '/archive') {
      setFilter(archivedNotes.filter((note) => note.collectionId === id));
    } else {
      setFilter(mainDashboardNotes.filter((note) => note.collectionId === id));
    }
  };

  const filterTags = (id) => {
    setDrawerOpen(false);
    setSelectedFilter({
      type: 'Etiqueta',
      name: tags.tags.filter((tag) => tag.id === id)[0].name,
    });
    if (pathname === '/trash') {
      setFilter(
        trashNotes.filter((note) => note.tags.some((tag) => tag.id === id)),
      );
    } else if (pathname === '/archive') {
      setFilter(
        archivedNotes.filter((note) => note.tags.some((tag) => tag.id === id)),
      );
    } else {
      setFilter(
        mainDashboardNotes.filter((note) => note.tags.some((tag) => tag.id === id)),
      );
    }
  };

  const handleChange = (e) => {
    setOnEdition({
      ...onEdition,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = (noteId, userId) => {
    if (isGuest) {
      showSnackBar('Acción no permitida en modo invitado', 201, false);
    } else {
      dispatch(deleteNote(noteId, userId));
      setOnEdition({
        title: '',
        content: '',
      });
      setOpenNote(false);
      showSnackBar('Nota eliminada', notes.response, false);
    }
  };

  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleStateChange = (type, message) => {
    dispatch(
      updateNoteState({
        ...notes.note,
        state: type,
      }),
    );
    setOnEdition({
      title: '',
      content: '',
    });
    setOpenNote(false);
    showSnackBar(message, notes.response, true);
  };

  const restartFilter = () => {
    setSelectedFilter({
      type: '',
      name: '',
    });
    changeRoute('/home');
  };

  const filteredMainNotes = mainDashboardNotes.filter(
    (note) => note.title.includes(inputValue) || note.content.includes(inputValue),
  );
  const filteredTrashNotes = trashNotes.filter(
    (note) => note.title.includes(inputValue) || note.content.includes(inputValue),
  );
  const filteredArchiveNotes = archivedNotes.filter(
    (note) => note.title.includes(inputValue) || note.content.includes(inputValue),
  );
  const filteredFilter = filter
    && filter.filter(
      (note) => note.title.includes(inputValue) || note.content.includes(inputValue),
    );

  return (
    <div
      className={
        largeWidth
          ? 'row full-height overflow-hidden'
          : 'row full-height overflow-hidden bs-gutter'
      }
    >
      {loading
        ? <Loading />
        : (
          <>
            {largeWidth ? (
              <div className="col-md-2 login-bg full-height p-0">
                <SideBarHome
                  changeRoute={changeRoute}
                  filterTags={filterTags}
                  filterCollections={filterCollections}
                  largeWidth={largeWidth}
                  tags={tags.tags}
                  collections={collections.collections}
                  pathname={pathname}
                />
              </div>
            ) : (
              <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <div className="col-md-2 login-bg full-height">
                  <SideBarHome
                    changeRoute={changeRoute}
                    filterTags={filterTags}
                    filterCollections={filterCollections}
                    largeWidth={largeWidth}
                    tags={tags.tags}
                    collections={collections.collections}
                    pathname={pathname}
                  />
                </div>
              </Drawer>
            )}
            <div className="col-md-10 row full-height mr-0" id="notes-cont-4">
              <NavBarHome
                closeNote={closeNote}
                collection={
                  collections.collections.filter(
                    (e) => e.id === notes.note.collectionId,
                  )[0]
                }
                greeting={greeting}
                handleChange={handleSearchChange}
                inputValue={inputValue}
                largeWidth={largeWidth}
                loading={loadingSave}
                note={notes.note}
                onEdition={onEdition}
                openNote={openNote}
                saveNote={saveNote}
                setDrawerOpen={setDrawerOpen}
                setOpenColModal={setOpenColModal}
                user={users.user}
              />
              <div className="row h-95 note-cont-4">
                <div className="col-md-3 bs-gutter full-height">
                  {openNote && !largeWidth && onEdition.id ? (
                    <EditNote
                      addTag={addTag}
                      automaticSave={automaticSave}
                      changeRoute={changeRoute}
                      collection={notes.note.collectionId && collections.collections.filter(
                        (e) => (e.id === notes.note.collectionId),
                      )[0]}
                      collections={collections.collections}
                      deleteTag={deleteTag}
                      duplicate={duplicateNote}
                      editCollection={editNoteCollection}
                      handleChange={handleChange}
                      handleStateChange={handleStateChange}
                      largeWidth={largeWidth}
                      note={notes.note}
                      mainDashboardNotes={mainDashboardNotes}
                      notes={
                  filter !== false
                    ? inputValue.length >= 3
                      ? filteredFilter
                      : filter
                    : pathname === '/archive'
                      ? inputValue.length >= 3
                        ? filteredArchiveNotes
                        : archivedNotes
                      : pathname === '/trash'
                        ? inputValue.length >= 3
                          ? filteredTrashNotes
                          : trashNotes
                        : inputValue.length >= 3
                          ? filteredMainNotes
                          : mainDashboardNotes
                }
                      onEdition={onEdition}
                      openColModal={openColModal}
                      openTagModal={openTagModal}
                      pathname={pathname}
                      saveNote={saveNote}
                      setOpenColModal={setOpenColModal}
                      setOpenDialog={setOpenDialog}
                      setOpenTagModal={setOpenTagModal}
                      tags={tags.tags}
                    />
                  ) : (
                    <Notes
                      collections={collections.collections}
                      darkMode={users.darkMode}
                      editNote={editNote}
                      greeting={greeting}
                      largeWidth={largeWidth}
                      message={noNotesMessage}
                      newNote={newNote}
                      notes={
                  filter !== false
                    ? inputValue.length >= 3
                      ? filteredFilter
                      : filter
                    : pathname === '/archive'
                      ? inputValue.length >= 3
                        ? filteredArchiveNotes
                        : archivedNotes
                      : pathname === '/trash'
                        ? inputValue.length >= 3
                          ? filteredTrashNotes
                          : trashNotes
                        : inputValue.length >= 3
                          ? filteredMainNotes
                          : mainDashboardNotes
                }
                      onEdition={onEdition}
                      pathname={pathname}
                      restartFilter={restartFilter}
                      selectedFilter={selectedFilter}
                      user={users.user}
                    />
                  )}
                </div>
                {largeWidth && (
                <div className="col-md-9 bs-gutter full-height">
                  <EditNote
                    addTag={addTag}
                    allNotes={notes.notes}
                    automaticSave={automaticSave}
                    changeRoute={changeRoute}
                    collection={notes.note.collectionId && collections.collections.filter(
                      (e) => e.id === notes.note.collectionId,
                    )[0]}
                    collections={collections.collections}
                    deleteTag={deleteTag}
                    duplicate={duplicateNote}
                    editCollection={editNoteCollection}
                    handleChange={handleChange}
                    handleStateChange={handleStateChange}
                    largeWidth={largeWidth}
                    mainDashboardNotes={mainDashboardNotes}
                    newNote={newNote}
                    note={notes.note}
                    notes={
                  filter !== false
                    ? inputValue.length >= 3
                      ? filteredFilter
                      : filter
                    : pathname === '/archive'
                      ? inputValue.length >= 3
                        ? filteredArchiveNotes
                        : archivedNotes
                      : pathname === '/trash'
                        ? inputValue.length >= 3
                          ? filteredTrashNotes
                          : trashNotes
                        : inputValue.length >= 3
                          ? filteredMainNotes
                          : mainDashboardNotes
                }
                    onEdition={onEdition}
                    openColModal={openColModal}
                    openTagModal={openTagModal}
                    pathname={pathname}
                    saveNote={saveNote}
                    setOpenColModal={setOpenColModal}
                    setOpenDialog={setOpenDialog}
                    setOpenTagModal={setOpenTagModal}
                    tags={tags.tags}
                  />
                </div>
                )}
              </div>
            </div>
            <Dialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                ¿Desea eliminar la nota?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Tenga en cuenta que una vez que elimine la nota la misma no podrá
                  ser recuperada.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  className="btn"
                  color="primary"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancelar
                </Button>
                <Button
                  className="btn"
                  color="primary"
                  onClick={() => {
                    handleDelete(onEdition.id, onEdition.userId);
                    setOpenDialog(false);
                  }}
                >
                  Eliminar
                </Button>
              </DialogActions>
            </Dialog>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={snackbar.open}
              autoHideDuration={5000}
              onClose={closeSnackbar}
              message={snackbar.message}
              action={(
                <>
                  {snackbar.undo && snackbar.message !== 'Acción desecha' ? (
                    <Button
                      className="btn"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        handleStateChange(
                          pathname === '/home' ? 'main-dashboard' : pathname.slice(1),
                          'Acción desecha',
                        );
                      }}
                    >
                      Deshacer
                    </Button>
                  ) : null}
                  <IconButton className="btn" size="small" color="inherit" onClick={closeSnackbar}>
                    <HighlightOffOutlinedIcon fontSize="small" />
                  </IconButton>
                </>
        )}
            />
          </>
        )}
    </div>
  );
};

export default SettingsCollections;
