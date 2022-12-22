import React from 'react';
import moment from 'moment';
import {
  Badge, Chip, IconButton, Modal, Tooltip,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import RestoreFromTrashOutlinedIcon from '@material-ui/icons/RestoreFromTrashOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import CloseIcon from '@material-ui/icons/Close';
import CollectionsBookmarkOutlinedIcon from '@material-ui/icons/CollectionsBookmarkOutlined';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';

const EditNote = ({
  addTag,
  changeRoute,
  collection,
  collections,
  deleteTag,
  duplicate,
  editCollection,
  handleChange,
  handleStateChange,
  largeWidth,
  mainDashboardNotes,
  openColModal,
  openTagModal,
  newNote,
  note,
  notes,
  onEdition,
  pathname,
  saveNote,
  setOpenColModal,
  setOpenDialog,
  setOpenTagModal,
  tags,
}) => {
  const colModal = (
    <div className="modal-col">
      <div>
        <h1 id="simple-modal-title" className="mb-4">
          {note.collectionId ? 'Editar colección' : 'Añadir colección'}
        </h1>
      </div>
      <div className="tag-cont">
        {collections.length > 0 ? (
          collections
          && collections.map((col) => (
            <div key={col.id}>
              <div
                className="d-flex justify-content-between align-items-center px-2"
              >
                <p className="d-flex m-0">
                  <CollectionsBookmarkOutlinedIcon style={{ color: '#2185D0' }} />
                  &nbsp;&nbsp;&nbsp;
                  {col.name}
                </p>
                {col.id === note.collectionId ? (
                  <Chip
                    deleteIcon={
                      <HighlightOffOutlinedIcon style={{ color: '#2185D0' }} />
                    }
                    label="Seleccionada"
                    onDelete={() => {
                      editCollection(null);
                      setOpenColModal(false);
                    }}
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                ) : (
                  <IconButton
                    className="btn"
                    onClick={() => {
                      editCollection(col.id);
                      setOpenColModal(false);
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                )}
              </div>
              <hr />
            </div>
          ))
        ) : (
          <div className="all-center row w-100 m-0">
            <div className="all-center">
              <img
                src="svg/empty.svg"
                width="80%"
                draggable={false}
                className="scale-sm"
                alt=""
              />
            </div>

            <p className="all-center mt-4">
              <b>Aun no tienes colecciones</b>
            </p>
          </div>
        )}
      </div>
      <>
        {collections.length > 0 ? (
          <div className="w-100 my-3">
            <button
              className="btn btn-outline-primary btn-round btn-sm px-3"
              onClick={() => changeRoute('/collections tags/col?open=true')}
              type="button"
            >
              <p>
                <AddIcon />
                &nbsp;&nbsp;Nueva colección
              </p>
            </button>
          </div>
        ) : (
          <div className="w-100 my-3 all-center">
            <button
              className="btn btn-success"
              onClick={() => changeRoute('/collections tags/col?open=true')}
              type="button"
            >
              <p>
                <AddIcon />
                &nbsp;&nbsp;Crear nueva colección
              </p>
            </button>
          </div>
        )}
      </>
    </div>
  );

  const tagModal = (
    <div className="modal-col">
      <div>
        <h1 id="simple-modal-title" className="mb-4">
          {largeWidth ? 'Añadir etiquetas' : 'Editar etiquetas'}
        </h1>
      </div>
      <div className="tag-cont">
        {tags.length > 0 ? (
          tags
          && tags.map((tag) => (
            <div key={tag.id}>
              <div className="d-flex justify-content-between align-items-center px-2">
                <p className="d-inline m-0">
                  <LocalOfferIcon style={{ color: tag.color }} />
                  &nbsp;&nbsp;&nbsp;
                  {tag.name}
                </p>
                {note.tags
                && note.tags.map((tag) => tag.name).includes(tag.name) ? (
                    largeWidth ? (
                      <CheckSharpIcon key={tag.name} style={{ margin: 12, color: '#198754' }} />
                    ) : (
                      <IconButton
                        key={tag.name}
                        className="btn"
                        onClick={() => deleteTag(onEdition.id, tag.id)}
                      >
                        <CloseIcon style={{ color: '#dc3545' }} />
                      </IconButton>
                    )
                  ) : (
                    <IconButton
                      key={tag.name}
                      className="btn"
                      onClick={() => addTag(onEdition.id, tag.id)}
                    >
                      <AddIcon className="green" />
                    </IconButton>
                  )}
              </div>
              <hr />
            </div>
          ))
        ) : (
          <div className="all-center row w-100 m-0">
            <div className="all-center">
              <img
                src="svg/empty.svg"
                width="80%"
                draggable={false}
                className="scale-sm"
                alt=""
              />
            </div>
            <p className="all-center mt-4">
              <b>Aun no tienes etiquetas</b>
            </p>
          </div>
        )}
      </div>
      {tags.length > 0 ? (
        <div className="w-100 d-flex justify-content-between align-items-center my-3">
          <button
            className="btn btn-outline-primary btn-round btn-sm px-3"
            onClick={() => changeRoute('/collections tags/tag?open=true')}
            type="button"
          >
            <p>
              <AddIcon />
              &nbsp;&nbsp;Nueva etiqueta
            </p>
          </button>
          <button
            className="btn btn-success btn-round w-25"
            onClick={() => setOpenTagModal(false)}
            type="button"
          >
            Listo
          </button>
        </div>
      ) : (
        <div className="w-100 all-center my-3">
          <button
            className="btn btn-success"
            onClick={() => changeRoute('/collections tags/tag?open=true')}
            type="button"
          >
            <p>
              <AddIcon />
              &nbsp;&nbsp;Crear nueva etiqueta
            </p>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="full-height">
      {onEdition.id ? (
        <>
          <div className="row w-100" style={{ height: '93%' }}>
            <div className="ui transparent input input-title mx-3 w-100">
              <Modal
                open={openColModal}
                onClose={() => setOpenColModal(false)}
                className="d-flex w-100 justify-content-center align-items-center modal"
              >
                {colModal}
              </Modal>
              <Modal
                open={openTagModal}
                onClose={() => setOpenTagModal(false)}
                className="d-flex w-100 justify-content-center align-items-center modal"
              >
                {tagModal}
              </Modal>
              <input
                className={largeWidth ? 'w-50' : 'w-100'}
                autoComplete="off"
                type="text"
                placeholder="Título..."
                value={onEdition.title || ''}
                name="title"
                onChange={handleChange}
                id="note-title"
              />
              {largeWidth && (
                <div className="all-center row">
                  {note.collectionId ? (
                    <Chip
                      clickable
                      variant="outlined"
                      color="primary"
                      icon={<CollectionsBookmarkOutlinedIcon />}
                      label={collection.name}
                      onClick={() => setOpenColModal(true)}
                    />
                  ) : (
                    <Chip
                      clickable
                      color="primary"
                      id="back-blue"
                      icon={<AddIcon />}
                      label="Añadir colección"
                      onClick={() => setOpenColModal(true)}
                    />
                  )}
                </div>
              )}
            </div>
            <div className="ui transparent textarea w-100 h-90">
              <textarea
                placeholder="Deja fluír tus ideas..."
                className="note-content w-100"
                value={onEdition.content || ''}
                name="content"
                onChange={handleChange}
                onKeyUp={saveNote}
                onPaste={saveNote}
              />
            </div>
          </div>

          <div className="actions-notes p-0 m-0 pl-3 row w-100">
            {largeWidth && (
              <div className="col-md-9 m-0 d-flex align-items-center">
                {note.tags
                  && note.tags.map(
                    (tag, index) => index < 5 && (
                    <div
                      key={tag.id}
                      className="tab-indicator mx-1 px-2"
                      style={{ backgroundColor: tag.color }}
                    >
                      <div className="col d-flex align-items-center justify-content-between h-100 w-100">
                        <p className="overflow-hidden">{tag.name}</p>
                        <Tooltip title="Quitar etiqueta de la nota" placement="right">
                          <IconButton
                            className="p-0 btn"
                            id="delete-tag"
                            onClick={() => deleteTag(onEdition.id, tag.id)}
                          >
                            <HighlightOffOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                    ),
                  )}
                {note.tags && note.tags.length > 5 && (
                  <Badge
                    className="mx-2"
                    badgeContent={`+${note.tags.length - 5}`}
                    color="primary"
                  >
                    <LocalOfferIcon />
                  </Badge>
                )}
                <Tooltip title="Añadir etiqueta" placement="right">
                  <IconButton
                    className="btn"
                    onClick={() => setOpenTagModal(true)}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </div>
            )}

            <div
              className={
                largeWidth
                  ? 'col-md-3 m-0 d-flex justify-content-end align-items-center'
                  : 'm-0 d-flex justify-content-between align-items-center'
              }
            >
              {!largeWidth && (
                <div className="d-flex align-items-center tag-cont-show">
                  {note.tags
                    && note.tags.map(
                      (tag, index) => index < 2 && (
                      <div
                        key={tag.id}
                        className="tab-indicator mx-1 px-1"
                        style={{ backgroundColor: tag.color }}
                      >
                        <div className="col d-flex align-items-center justify-content-center h-100">
                          <p>{tag.name}</p>
                        </div>
                      </div>
                      ),
                    )}
                  {note.tags && note.tags.length > 2 ? (
                    <Badge
                      className="mx-2"
                      badgeContent={
                        note.tags
                        && note.tags.length > 2
                        && `+${note.tags.length - 2}`
                      }
                      color="primary"
                    >
                      <IconButton
                        className="btn p-0"
                        title="Añadir etiqueta"
                        onClick={() => setOpenTagModal(true)}
                      >
                        <LocalOfferIcon />
                      </IconButton>
                    </Badge>
                  ) : (
                    <IconButton
                      className="btn"
                      title="Añadir etiqueta"
                      onClick={() => setOpenTagModal(true)}
                    >
                      <LocalOfferIcon />
                    </IconButton>
                  )}
                </div>
              )}
              <div>
                {pathname === '/home' && (
                  <>
                    <Tooltip title="Duplicar" placement="top">
                      <IconButton
                        className="btn"
                        onClick={duplicate}
                      >
                        <FileCopyOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
                {pathname === '/archive' ? (
                  <Tooltip title="Desarchivar" placement="top">
                    <IconButton
                      className="btn"
                      onClick={() => handleStateChange('main-dashboard', 'Nota desarchivada')}
                    >
                      <UnarchiveOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Archivar" placement="top">
                    <IconButton
                      className="btn"
                      onClick={() => handleStateChange('archive', 'Nota archivada')}
                    >
                      <ArchiveOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                )}
                {pathname === '/trash' ? (
                  <>
                    <Tooltip title="Eliminar nota" placement="top">
                      <IconButton
                        className="btn"
                        onClick={() => setOpenDialog(true)}
                      >
                        <DeleteForeverOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Restaurar" placement="top">
                      <IconButton
                        className="btn"
                        onClick={() => handleStateChange('main-dashboard', 'Nota restaurada')}
                      >
                        <RestoreFromTrashOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                ) : (
                  <Tooltip title="Eliminar nota" placement="top">
                    <IconButton
                      className="btn"
                      onClick={() => handleStateChange('trash', 'Nota movida a papelera')}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                )}
                {largeWidth && (
                  <Tooltip title="Fecha de creación" placement="top">
                    <b className="pl-2" style={{ cursor: 'default' }}>
                      <small>
                        {note.createdAt
                          && moment(
                            note.createdAt.slice(0, 10),
                            'YYYY-MM-DD',
                          ).format('DD/MM/YY')}
                      </small>
                    </b>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="all-center full-height row">
          {mainDashboardNotes && mainDashboardNotes.length === 0 ? (
            <>
              <img
                src="svg/add-note.svg"
                alt=""
                style={{ height: '75%' }}
                className="scale-sm"
                draggable={false}
              />
              <div className="all-center row">
                <b className="all-center">Al parecer aún no tienes notas</b>
                <button
                  className="btn btn-round my-3 btn-sm btn-primary w-25 all-center"
                  onClick={newNote}
                  type="button"
                >
                  <AddIcon />
                  &nbsp;&nbsp;Crea tu primera nota
                </button>
              </div>
            </>
          ) : notes && notes.length === 0 ? (
            <>
              <img
                src="svg/not-found.svg"
                alt=""
                style={{ height: '80%' }}
                className="scale-sm"
                draggable={false}
              />
              <b className="all-center">No hemos encontrado resultados</b>
            </>
          ) : (
            <>
              <img
                src="svg/select.svg"
                alt=""
                style={{ height: '80%' }}
                className="scale-sm"
                draggable={false}
              />
              <b className="select-text">
                Selecciona una nota para ver su contenido o editarla
              </b>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EditNote;
