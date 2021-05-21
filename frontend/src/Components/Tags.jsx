import React, { useState } from 'react';
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
  TextField
} from '@material-ui/core';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import Loading from './Loading';

const colors = [
  '#79ADDC',
  '#FFC09F',
  '#FFEE93',
  '#ADF7B6',
  '#FBADFF',
  '#DCB6D5',
  '#F2F7F2',
];

const Tags = ({
  tags,
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
  const [newTag, setNewTag] = useState({
    color: '',
    name: '',
  });
  const [editTag, setEditTag] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  const newData = (e) => {
    setNewTag({
      ...newTag,
      [e.target.name]: e.target.value,
    });
  };

  const newColor = (color, type) => {
    if (type === 'create') {
      setNewTag({
        ...newTag,
        color,
      });
    } else {
      setEditTag({
        ...editTag,
        color,
      });
    }
  };

  const onChange = (e) => {
    setEditTag({
      ...editTag,
      [e.target.name]: e.target.value,
    });
  };

  tags.tags.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  const superSmallWidth = window.screen.width < 350;

  const modal = (
    <div className="modal-col">
      <div>
        <h2 id="simple-modal-title" className="display-6">
          {editTag && !largeWidth ? 'Editar etiqueta' : 'Crear una etiqueta...'}
        </h2>
        <hr />
      </div>
      <div className="all-center">
        <img
          src="svg/tag.svg"
          width="90%"
          alt=""
          className="mb-2"
          draggable="false"
        />
      </div>
      <div>
        <TextField
          autoFocus={!!largeWidth}
          className="w-100 my-3"
          id="outlined-basic"
          inputProps={{
            maxLength: 20,
            autoComplete: 'off'
          }}
          label="Nombre"
          value={newTag.name}
          name="name"
          onChange={newData}
        />
      </div>
      <div className="row my-3">
        {!superSmallWidth && <p className="MuiFormLabel-root" style={{ fontSize: '1rem' }}>Color</p>}
        <div className="d-flex justify-content-between w-100">
          {colors.map((dot) => (
            <IconButton
              className={largeWidth ? 'p-2' : 'p-0'}
              id={newTag.color === dot ? 'selectedColor' : null}
              onClick={() => newColor(dot, 'create')}
              key={dot}
              style={{ borderColor: dot }}
            >
              <FiberManualRecordIcon
                style={{ color: dot, fontSize: superSmallWidth ? 25 : 35 }}
              />
            </IconButton>
          ))}
        </div>
      </div>
      <div className="modal-col-action d-flex justify-content-between my-3 w-100">
        {editTag && !largeWidth ? (
          <button
            className="btn btn-success btn-round"
            style={{ width: '30%', paddingLeft: 0, paddingRight: 0 }}
            disabled={newTag.name.length === 0}
            onClick={() => {
              handleChange({
                ...newTag,
                id: editTag.id,
                userId: editTag.userId
              });
              setTimeout(() => {
                setNewTag({
                  name: '',
                  color: '',
                });
                setEditTag(null);
              }, 1500);
              openModal('tag', false);
            }}
            type="submit"
          >
            Guardar
          </button>
        ) : (
          <button
            className="btn btn-success btn-round"
            style={{ width: '45%' }}
            disabled={newTag.name.length === 0}
            onClick={() => {
              handleCreate(newTag);
              setTimeout(() => {
                setNewTag({
                  name: '',
                  color: '',
                });
              }, 1500);
            }}
            type="submit"
          >
            Crear
          </button>
        )}
        {editTag && !largeWidth
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
          type="submit"
          className={editTag ? 'btn btn-outline-dark ml-3 btn-round cancel-btn-modal-edit' : 'btn btn-outline-danger ml-3 btn-round cancel-btn-modal'}
          onClick={() => {
            openModal('tag', false);
            setEditTag(null);
            setNewTag({
              name: '',
              color: '',
            });
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );

  return (
    <div className="user-profile user-tag p-5 row d-flex justify-content-center">
      <h1 className="display-1 settings-title">
        {!largeWidth && (
          <IconButton
            onClick={() => setDrawerOpen(true)}
            style={{ color: 'inherit' }}
            className="btn mb-1 p-0"
          >
            <MenuIcon className="menu-icon" />
          </IconButton>
        )}
        Etiquetas
      </h1>
      <div className="row d-flex justify-content-center my-2 conf-2">
        {tags.tags.length > 0
          ? (
            <TableContainer component={Paper} id="tab-col-table">
              <Table aria-label="caption table">
                <caption>
                  Usa las etiquetas para ordenar tus notas por categoría, de esta
                  forma podrás encontrar la nota que buscas rapidamente.
                </caption>
                <TableHead id="thead">
                  <TableRow>
                    <TableCell>
                      <b>Nombre</b>
                    </TableCell>
                    <TableCell>
                      <b>Color</b>
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody id="tbody">
                  {tags.tags.map((tag, index) => (
                    <TableRow key={tag.name}>
                      <TableCell
                        component="th"
                        scope="row"
                        className="table-cell-col"
                      >
                        {editing.tag === index ? (
                          <TextField
                            className="w-100"
                            placeholder="Nombre"
                            value={editTag.name}
                            onChange={onChange}
                            name="name"
                            inputProps={{
                              maxLength: 20
                            }}
                          />
                        ) : (
                          <p>
                            <LocalOfferOutlinedIcon />
                        &nbsp;&nbsp;
                            {tag.name}
                          </p>
                        )}
                      </TableCell>
                      <TableCell className="table-cell-col">
                        {editing.tag === index ? (
                          colors.map((dot) => (
                            <IconButton
                              className="color-dot"
                              id={editTag.color === dot ? 'selectedColor' : null}
                              onClick={() => newColor(dot, 'update')}
                              style={{ borderColor: dot }}
                            >
                              <FiberManualRecordIcon style={{ color: dot }} />
                            </IconButton>
                          ))
                        ) : (
                          <>
                            <FiberManualRecordIcon style={{ color: tag.color }} />
                          </>
                        )}
                      </TableCell>
                      <TableCell align="right" className="p-0">
                        {largeWidth
                          ? (
                            <>
                              <IconButton
                                className="p-2 btn"
                                onClick={
                        editing.tag === index
                          ? () => handleChange(editTag)
                          : () => {
                            setEditTag(tags.tags[index]);
                            setNewTag(tags.tags[index]);
                            setEditing({
                              ...editing,
                              tag: index,
                              col: undefined,
                            });
                          }
                      }
                              >
                                {editing.tag === index ? (
                                  <CheckSharpIcon style={{ color: '#198754' }} />
                                ) : (
                                  <EditSharpIcon style={{ color: '#2185D0' }} />
                                )}
                              </IconButton>
                              <IconButton
                                className="p-2 btn"
                                onClick={() => {
                                  setEditTag(tags.tags[index]);
                                  setOpenDialog(true);
                                }}
                              >
                                {editing.tag === index && (
                                <DeleteSharpIcon style={{ color: '#dc3545' }} />
                                )}
                              </IconButton>
                            </>
                          )
                          : (
                            <IconButton
                              className="p-2 btn"
                              onClick={() => {
                                setEditTag(tags.tags[index]);
                                setNewTag({
                                  ...newTag,
                                  name: tags.tags[index].name,
                                  color: tags.tags[index].color
                                });
                                openModal('tag', true);
                              }}
                            >
                              <EditOutlinedIcon />
                            </IconButton>
                          )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                {largeWidth
                && (
                <TableFooter>
                  <button
                    onClick={() => {
                      setEditTag(null);
                      setNewTag({
                        name: '',
                        color: '',
                      });
                      openModal('tag', true);
                    }}
                    type="button"
                    className="ui labeled icon button btn-round blue white m-3 mb-0"
                  >
                    <i className="plus icon" />
                    {largeWidth
                      ? '  Crear nueva etiqueta'
                      : '  Nueva etiqueta'}
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
                    <img
                      draggable={false}
                      src="svg/empty.svg"
                      width="75%"
                      alt="not-found"
                      style={{ marginBottom: '10%', transform: 'rotateY(180deg)' }}
                    />
                    <p className="all-center">
                      <b>No hay etiquetas</b>
                    </p>
                    <div className="all-center">
                      <button
                        onClick={() => {
                          openModal('tag', true);
                        }}
                        type="button"
                        className="ui labeled icon button btn-round blue white m-3 mb-0"
                      >
                        <i className="plus icon" />
                        Crea tu primera etiqueta
                      </button>
                    </div>
                  </div>
                </div>
              )
          )}
        <Modal
          open={open.tag}
          onClose={() => {
            openModal('tag', false);
            setEditTag(null);
            setNewTag({
              name: '',
              color: '',
            });
          }}
          className="d-flex w-100 justify-content-center align-items-center"
        >
          {modal}
        </Modal>
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            ¿Desea eliminar la etiqueta?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Tenga en cuenta que una vez que elimine la etiqueta la misma no
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
                handleDelete(editTag.id);
                setOpenDialog(false);
                if (!largeWidth) {
                  openModal('tag', false);
                  setNewTag({
                    name: '',
                    color: '',
                  });
                  setEditTag(null);
                }
              }}
              color="primary"
            >
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>

      </div>
      {!largeWidth && (
      <Fab aria-label="add" className="fab-add btn" onClick={() => openModal('tag', true)}>
        <AddIcon className="add-icon" />
      </Fab>
      )}
    </div>
  );
};

export default Tags;
