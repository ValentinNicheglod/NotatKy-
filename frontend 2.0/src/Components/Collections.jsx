/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import CollectionsBookmarkOutlinedIcon from '@material-ui/icons/CollectionsBookmarkOutlined';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import Loading from './Loading';

const Collections = ({
  collections,
  editing,
  handleChange,
  handleCreate,
  handleDelete,
  largeWidth,
  open,
  openModal,
  setDrawerOpen,
  setEditing,
}) => {
  const [newCollection, setNewCollection] = useState({
    name: '',
    description: '',
  });
  const [editCollection, setEditCollection] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/collections tags/col' && location.search === '?open=true') {
      openModal('col', true);
    }
  }, []);

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  const newData = (e) => {
    setNewCollection({
      ...newCollection,
      [e.target.name]: e.target.value,
    });
  };

  const onChange = (e) => {
    setEditCollection({
      ...editCollection,
      [e.target.name]: e.target.value,
    });
  };

  collections.collections.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  const modal = (
    <div className="modal-col">
      <div>
        <h2 id="simple-modal-title" className="mb-4">{editCollection && !largeWidth ? 'Editar colección' : 'Crear una colección...'}</h2>
      </div>
      <div className="all-center">
        <img
          src="svg/collection.svg"
          width="90%"
          alt=""
          className="mb-2"
          draggable="false"
        />
      </div>
      <TextField
        autoComplete="off"
        autoFocus={!!largeWidth}
        className="w-100 my-3"
        id="outlined-basic"
        inputProps={{
          maxLength: 20,
          autoComplete: 'off'
        }}
        label="Nombre"
        value={newCollection.name}
        name="name"
        onChange={newData}
      />
      <TextField
        className="w-100 my-3"
        id="outlined-basic"
        label="Descripción"
        inputProps={{
          maxLength: 50,
          autoComplete: 'off'
        }}
        value={newCollection.description}
        name="description"
        onChange={newData}
      />
      <div className="modal-col-action d-flex justify-content-between my-3 w-100">
        {editCollection && !largeWidth
          && (
          <button
            type="submit"
            className="btn btn-outline-danger ml-3 btn-round cancel-btn-modal-edit"
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            Eliminar
          </button>
          )}
        <button
          className={editCollection && !largeWidth ? 'btn btn-round btn-outline-dark ml-3 cancel-btn-modal-edit' : 'btn btn-round btn-outline-danger ml-3 cancel-btn-modal'}
          onClick={() => {
            openModal('col', false);
            setEditCollection(null);
            setNewCollection({
              name: '',
              description: '',
            });
          }}
          type="button"
        >
          Cancelar
        </button>
        {editCollection && !largeWidth ? (
          <button
            className="btn btn-success btn-round"
            style={{ width: '30%', paddingLeft: 0, paddingRight: 0 }}
            disabled={newCollection.name.length === 0}
            onClick={() => {
              handleChange({
                ...newCollection,
                id: editCollection.id,
                userId: editCollection.userId
              });
              setTimeout(() => {
                setNewCollection({
                  name: '',
                  description: '',
                });
                setEditCollection(null);
              }, 1500);
              openModal('col', false);
            }}
            type="button"
          >
            Guardar
          </button>
        ) : (
          <button
            className="btn btn-success btn-round"
            style={{ width: '45%' }}
            disabled={newCollection.name.length === 0}
            onClick={() => {
              handleCreate(newCollection);
              setTimeout(() => {
                setNewCollection({
                  name: '',
                  description: '',
                });
              }, 1000);
            }}
            type="button"
          >
            Crear
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="user-profile user-tag p-5 row d-flex justify-content-center">
      <h1 className="settings-title violet">
        {!largeWidth && (
          <IconButton
            onClick={() => setDrawerOpen(true)}
            style={{ color: 'inherit', transform: 'scale(1.3)' }}
            className="btn mb-1 mx-2 p-0"
          >
            <MenuIcon className="menu-icon" />
          </IconButton>
        )}
        Colecciones
      </h1>
      <div className="row d-flex justify-content-center my-2 conf-2">
        {collections.collections.length > 0
          ? (
            <TableContainer component={Paper} id="tab-col-table">
              <Table aria-label="caption table" id="tab-col-table">
                <caption>
                  Usa las colecciones como si fueran libretas, puedes guardar todas
                  las notas relacionadas a un tema en especifico dentro de ellas.
                </caption>
                <TableHead id="thead">
                  <TableRow>
                    <TableCell id="table-cell-">
                      <b>Nombre</b>
                    </TableCell>
                    <TableCell>
                      <b>Descripción</b>
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody id="tbody">
                  {collections.collections.map((collection, index) => (
                    <TableRow key={collection.id} id="col-table">
                      <TableCell
                        component="th"
                        scope="row"
                        className="table-cell-col"
                      >
                        {editing.col === index ? (
                          <TextField
                            className="w-100"
                            id="outlined-basic"
                            inputProps={{
                              maxLength: 20
                            }}
                            placeholder="Nombre"
                            value={editCollection.name}
                            onChange={onChange}
                            name="name"
                          />
                        ) : (
                          <p>
                            <CollectionsBookmarkOutlinedIcon />
                            &nbsp;&nbsp;
                            {collection.name}
                          </p>
                        )}
                      </TableCell>
                      <TableCell className="table-cell-col">
                        {editing.col === index ? (
                          <TextField
                            className="w-100"
                            id="outlined-basic"
                            inputProps={{
                              maxLength: 50
                            }}
                            placeholder="Descripción"
                            value={editCollection.description}
                            onChange={onChange}
                            name="description"
                            multiline
                          />
                        ) : (
                          <p>{collection.description}</p>
                        )}
                      </TableCell>
                      {largeWidth
                        ? (
                          <TableCell align="right" className="p-0 actions-cont">
                            <>
                              <IconButton
                                className="p-2 btn"
                                onClick={
                                  editing.col === index
                                    ? () => {
                                      if (editCollection !== collection) {
                                        handleChange(editCollection);
                                      } else {
                                        setEditing({
                                          tag: undefined,
                                          col: undefined
                                        });
                                      }
                                    }
                                    : () => {
                                      setEditCollection(collections.collections[index]);
                                      setEditing({
                                        ...editing,
                                        tag: undefined,
                                        col: index,
                                      });
                                    }
                                }
                              >
                                {editing.col === index ? (
                                  <CheckSharpIcon
                                    style={{ color: '#198754' }}
                                  />
                                ) : (
                                  <EditSharpIcon style={{ color: '#6435c9' }} />
                                )}
                              </IconButton>
                              <IconButton
                                className="p-2 btn"
                                onClick={() => {
                                  setEditCollection(collections.collections[index]);
                                  setOpenDialog(true);
                                }}
                              >
                                {editing.col === index && (
                                <DeleteSharpIcon style={{ color: '#dc3545' }} />
                                )}
                              </IconButton>
                            </>
                          </TableCell>
                        ) : (
                          <IconButton
                            className="p-2 pr-0 btn action-btn"
                            onClick={() => {
                              setEditCollection(collections.collections[index]);
                              setNewCollection({
                                ...newCollection,
                                name: collections.collections[index].name,
                                description: collections.collections[index].description
                              });
                              openModal('col', true);
                            }}
                          >
                            <EditOutlinedIcon />
                          </IconButton>
                        )}
                    </TableRow>
                  ))}
                </TableBody>
                {largeWidth
                && (
                <TableFooter>
                  <button
                    onClick={() => openModal('col', true)}
                    type="button"
                    className="ui labeled icon button btn-round violet white mt-4 ml-1"
                  >
                    <i className="plus icon" />
                    {largeWidth
                      ? '  Crear nueva colección'
                      : '  Nueva colección'}
                  </button>
                </TableFooter>
                )}
              </Table>
            </TableContainer>
          )
          : (
            loading
              ? (
                <div style={largeWidth ? { height: '100%', width: '100%' } : { height: '80vh', width: '100vw' }}>
                  <Loading />
                </div>
              )
              : (
                <div className="no-data-cont all-center row">
                  <div>
                    <div className="d-flex justify-content-end w-100">
                      <img
                        draggable={false}
                        src="svg/empty.svg"
                        width="75%"
                        alt="not-found"
                        style={{ marginBottom: '10%' }}
                      />
                    </div>
                    <p className="all-center">
                      <b>No hay colecciones</b>
                    </p>
                    <div className="all-center">
                      <button
                        onClick={() => openModal('col', true)}
                        type="button"
                        className="ui labeled icon button btn-round violet white m-3 mb-0"
                      >
                        <i className="plus icon" />
                        Crea tu primera colección
                      </button>
                    </div>
                  </div>
                </div>
              )
          )}
        {!largeWidth && (
          <Fab aria-label="add" className="fab-add btn" onClick={() => openModal('col', true)}>
            <AddIcon className="add-icon" />
          </Fab>
        )}
        <Modal
          open={open.col}
          onClose={() => {
            openModal('col', false);
            setEditCollection(null);
            setNewCollection({
              name: '',
              description: '',
            });
          }}
          className="d-flex w-100 justify-content-center align-items-center modal"
        >
          {modal}
        </Modal>
        <Dialog
          open={openDialog}
          onClose={() => {
            setOpenDialog(false);
            setEditCollection(null);
            setNewCollection({
              name: '',
              description: '',
            });
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            ¿Desea eliminar la colección?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Tenga en cuenta que una vez que elimine la colección la misma no
              podrá ser recuperada.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              className="btn"
              onClick={() => setOpenDialog(false)}
              color="primary"
            >
              Cancelar
            </Button>
            <Button
              className="btn"
              onClick={() => {
                handleDelete(editCollection.id);
                setOpenDialog(false);
                if (!largeWidth) {
                  openModal('col', false);
                  setNewCollection({
                    name: '',
                    description: '',
                  });
                  setEditCollection(null);
                }
              }}
              color="primary"
            >
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Collections;
