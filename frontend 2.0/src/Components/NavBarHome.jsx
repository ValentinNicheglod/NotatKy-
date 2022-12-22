import React from 'react';
import { useHistory } from 'react-router-dom';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import {
  Avatar, Chip, IconButton, Tooltip
} from '@material-ui/core';

const NavBarHome = ({
  closeNote,
  collection,
  greeting,
  handleChange,
  inputValue,
  largeWidth,
  loading,
  note,
  onEdition,
  openNote,
  setDrawerOpen,
  setOpenColModal,
  user,
}) => {
  const history = useHistory();

  return (
    <div className="nav-home d-flex align-items-center justify-content-between">
      {!largeWidth && (
        <div>
          {openNote ? (
            <IconButton onClick={closeNote} className="btn white">
              <ArrowBackIcon style={{ width: '35px', height: '40px' }} />
            </IconButton>
          ) : (
            <IconButton onClick={() => setDrawerOpen(true)} className="btn white">
              <MenuIcon style={{ width: '35px', height: '40px' }} />
            </IconButton>
          )}
        </div>
      )}
      <div className="ui transparent input input-search col-md-6">
        <input
          type="text"
          placeholder="Buscar..."
          onChange={handleChange}
          id="search-note"
          value={inputValue}
        />
        {largeWidth && (
        <IconButton
          id="btn-home"
          style={{ color: 'white', backgroundColor: '#645BCC', borderRadius: '12px 50px 50px 12px' }}
          className="btn white m-0"
          onClick={() => {}}
        >
          <SearchOutlinedIcon
            style={{ color: '#FFF' }}
          />
        </IconButton>
        )}
      </div>

      <div className={largeWidth ? 'col-md-4 actions-note' : 'actions-note'}>
        {largeWidth && (loading
          ? onEdition.id && <AutorenewIcon className="loop-out" />
          : onEdition.id && (
          <Tooltip title="Cambios guardados" placement="left">
            <IconButton
              id="btn-home"
              style={{ color: 'white' }}
              className="btn white m-0"
              onClick={() => {}}
            >
              <CloudUploadOutlinedIcon />
            </IconButton>
          </Tooltip>
          ))}
        {largeWidth && (
          <Tooltip title="Configuración" placement="left">
            <IconButton
              id="btn-home"
              className="btn white"
              onClick={() => history.push('/edit profile')}
            >
              <SettingsOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}
        {openNote && !largeWidth ? (
          <div className="all-center row m-1">
            {note.collectionId ? (
              <Chip
                clickable
                variant="outlined"
                label={collection.name}
                className="chip-out"
                onClick={() => setOpenColModal(true)}
                size="small"
              />
            ) : (
              <Chip
                clickable
                color="secondary"
                id="back-blue"
                label="Añadir colección"
                onClick={() => setOpenColModal(true)}
                size="small"
              />
            )}
          </div>
        ) : (
          <>
            {largeWidth && (
              <div className="mx-3">
                <p className="m-0 d-flex justify-content-end greeting white">
                  {`${greeting},`}
                </p>
                <b className="m-0 d-flex justify-content-end greeting-name white">
                  {`${user.name}!`}
                </b>
              </div>
            )}
            {user.profile_photo ? (
              <Avatar
                alt="profile_photo"
                className="pe"
                imgProps={{
                  draggable: false
                }}
                src={`data:${
                  user.profile_photo && user.profile_photo.contentType
                };base64, ${user.profile_photo && user.profile_photo.image}`}
              />
            ) : (
              <Avatar alt="profile_photo" className="blue">
                {user.name && user.name.slice(0, 1)}
                {' '}
                {user.lastname && user.lastname.slice(0, 1)}
              </Avatar>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NavBarHome;