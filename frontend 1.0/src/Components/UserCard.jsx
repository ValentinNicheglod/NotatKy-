import React, { useState } from 'react';
import moment from 'moment';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

const UserCard = ({
  darkMode, handleDelete, isGuest, user
}) => {
  const [editing, setEditing] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(false);

  const creationDate = user.createdAt
    && moment(user.createdAt.slice(0, 10), 'YYYY-MM-DD').format('DD/MM/YYYY');

  return (
    <div className="card card-edit p-3" id={darkMode && 'dark-blue'}>
      {user.profile_photo ? (
        <Avatar
          alt="profile_photo"
          className="my-3 profile-userpic"
          imgProps={{
            draggable: false
          }}
          sizes={180}
          src={`data:${
            user.profile_photo && user.profile_photo.contentType
          };base64, ${user.profile_photo && user.profile_photo.image}`}
        />
      ) : (
        <Avatar alt="profile_photo" className="my-3 profile-userpic blue">
          {user.name && user.name.slice(0, 1)}
          {' '}
          {user.lastname && user.lastname.slice(0, 1)}
        </Avatar>
      )}
      {editing === 'profilePicture' ? (
        <>
          <form
            action={`https://notatky.herokuapp.com/user/uploadphoto/${user.id}`}
            encType="multipart/form-data"
            id="profile-input"
            method="POST"
            onChange={(e) => {
              setSelectedFile(true);
              if (e.target.files.length === 0) {
                setSelectedFile(false);
              } else {
                setSelectedFile(true);
              }
            }}
          >
            <input
              className="form-control form-control-sm mb-3"
              id="formFileSm"
              name="picture"
              type="file"
              accept="image/*"
            />
            <div className="d-flex justify-content-around w-100">
              <button
                className="btn btn-sm btn-round my-2 btn-outline-success"
                type="submit"
                disabled={!selectedFile}
              >
                Guardar
              </button>
              {user.profile_photo && (
                <button
                  className="btn btn-sm btn-round my-2 btn-outline-danger"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenDialog(true);
                  }}
                  type="button"
                >
                  Eliminar
                </button>
              )}

              {darkMode ? (
                <button
                  className="btn btn-sm btn-round my-2 btn-outline-light"
                  onClick={() => {
                    setSelectedFile(false);
                    setEditing('');
                  }}
                  type="button"
                >
                  Cancelar
                </button>
              ) : (
                <button
                  className="btn btn-sm btn-round my-2 btn-outline-dark"
                  onClick={() => {
                    setSelectedFile(false);
                    setEditing('');
                  }}
                  type="button"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </>
      ) : (isGuest
        ? (<small>Sesión iniciada en modo invitado</small>)
        : (
          <button
            className="btn btn-round my-1 btn-sm btn-outline-primary"
            onClick={() => setEditing('profilePicture')}
            type="button"
          >
            {`${user.profile_photo ? 'Editar' : 'Agregar'} foto de perfil`}
          </button>
        )
      )}
      <h1 className="display-6 mb-0">{user.name}</h1>
      <h1 className="display-6 mt-0">{user.lastname}</h1>
      <div className="user-data-card w-100 my-4">
        {user.ocupation && (
          <div className="my-2">
            <b className="d-inline px-2">Ocupación:&nbsp;&nbsp;</b>
            <p className="d-inline">{user.ocupation}</p>
          </div>
        )}
        <hr />
        <div className="my-2">
          <b className="d-inline px-2">Miembro desde:</b>
          <p className="d-inline">{creationDate}</p>
        </div>
      </div>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
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
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleDelete();
              setOpenDialog(false);
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

export default UserCard;
