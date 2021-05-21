import React from 'react';
import clsx from 'clsx';
import {
  Avatar,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  ExpandLess,
  Visibility,
  HighlightOffOutlined,
  VisibilityOff,
  Menu,
  EditSharp
} from '@material-ui/icons';

import './css/Settings.css';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
      'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#2185D0',
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
}));

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

const Profile = ({
  closeSnackbar,
  darkMode,
  editing,
  editionMode,
  error,
  handleChange,
  handleErrors,
  handlePasswordChange,
  handlePasswordSubmit,
  handleSubmit,
  information,
  largeWidth,
  mouseEnter,
  mouseLeave,
  password,
  setDrawerOpen,
  snackbar,
  user,
  visibilityPassword,
  visiblePassword,
}) => {
  const classes = useStyles();
  const superSmallWidth = window.screen.width < 350;
  const creationDate = user.createdAt
    && moment(user.createdAt.slice(0, 10), 'YYYY-MM-DD').format('DD/MM/YY');

  return (
    <div className="user-profile pro m-4 row">
      <h1 className="display-1 settings-title">
        {!largeWidth && (
          <IconButton
            onClick={() => setDrawerOpen(true)}
            style={{ color: 'inherit' }}
            className="btn mb-1 p-0"
            iconStyle={{ width: '35px', height: '40px', marginRight: '5px' }}
          >
            <Menu className="menu-icon" />
          </IconButton>
        )}
        &nbsp;Editar perfil
      </h1>
      {!largeWidth && (
        <div className="mobile-user-card-cont pt-4">
          <div className="mobile-user-card login-bg row">
            <div className="mobile-user-card-1 all-center">
              {user.profile_photo ? (
                <Avatar
                  alt="profile_photo"
                  className="mobile-user-card-avatar pe"
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
            </div>
            <div className="mobile-user-card-2">
              <p className="mb-0">{user.name}</p>
              <p className="mb-0">{user.lastname}</p>
            </div>
            <div className="mobile-user-card-3 py-2 h-100">
              <div className="row mobile-user-card-ocupation">
                {user.ocupation ? (
                  <>
                    <small>Ocupación...</small>
                    <p className="mb-0">{user.ocupation}</p>
                  </>
                ) : (
                  <>
                    <small>Correo electrónico...</small>
                    <p className="mb-0">{user.email}</p>
                  </>
                )}
              </div>
              <div className="row mobile-user-card-date">
                <small>Miembro desde...</small>
                <p className="mb-0">{creationDate}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className="pt-4 info-cont-settings"
        style={
          darkMode && largeWidth ? { overflowY: 'auto', height: 550 } : null
        }
      >
        <div>
          <h1
            className="display-6 profile-section"
            onMouseEnter={(e) => mouseEnter(e)}
            onMouseLeave={(e) => mouseLeave(e)}
          >
            {superSmallWidth ? 'Datos personales' : 'Información personal'}
            {largeWidth ? (
              !(editing === 'PersonalInformation') && (
                <button
                  className="btn btn-round mx-3 btn-sm btn-outline-primary profile-edit"
                  onClick={() => editionMode('PersonalInformation')}
                  type="button"
                >
                  Editar
                </button>
              )
            ) : !(editing === 'PersonalInformation') ? (
              <IconButton
                className="btn mx-1"
                onClick={() => editionMode('PersonalInformation')}
                type="button"
              >
                <EditSharp style={{ color: '#2185D0' }} />
              </IconButton>
            ) : (
              <IconButton
                className="btn mx-1"
                onClick={() => editionMode('')}
                type="button"
              >
                <ExpandLess style={{ color: '#2185D0' }} />
              </IconButton>
            )}
          </h1>
          <hr />
          {editing === 'PersonalInformation' ? (
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                className="input-profile"
                label="Nombre"
                value={information.name}
                name="name"
                onChange={handleChange}
              />
              <TextField
                className="input-profile"
                id="outlined-basic"
                label="Apellido"
                value={information.lastname}
                name="lastname"
                onChange={handleChange}
              />
              <TextField
                className="input-profile"
                id="ocupation-textfield"
                label="Ocupación"
                value={information.ocupation}
                name="ocupation"
                onChange={handleChange}
              />
              <br />
              <FormControl component="fieldset" className="my-3">
                <FormLabel component="legend" className="MuiFormLabel-root">Género</FormLabel>
                <RadioGroup
                  defaultValue={user.gender}
                  aria-label="gender"
                  name="gender"
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="female"
                    control={<StyledRadio />}
                    label="Femenino"
                  />
                  <FormControlLabel
                    value="male"
                    control={<StyledRadio />}
                    label="Masculino"
                  />
                  <FormControlLabel
                    value="other"
                    control={<StyledRadio />}
                    label="Otro"
                  />
                </RadioGroup>
              </FormControl>
              <br />
              {largeWidth ? (
                <button
                  className="btn w-25 btn-success btn-round btn-update"
                  onClick={handleSubmit}
                  type="submit"
                >
                  Actualizar datos
                </button>
              )
                : (
                  <div className="w-100 all-center p-0 m-0">
                    <button
                      className="btn w-100 btn-success btn-update"
                      onClick={handleSubmit}
                      type="submit"
                    >
                      Actualizar
                    </button>
                  </div>
                )}
              {largeWidth && (
                <button
                  className="btn btn-outline-danger btn-round w-12"
                  onClick={() => editionMode('')}
                  type="button"
                >
                  Cancelar
                </button>
              )}
            </form>
          ) : (
            <>
              <div className="d-flex flex-row">
                <h4 className="d-inline mr-3">
                  Nombre y apellido:&nbsp;&nbsp;&nbsp;
                </h4>
                <p>{`${user.name} ${user.lastname}`}</p>
              </div>
              <div className="d-flex flex-row align-items-center mb-3">
                <h4 className="d-inline mr-3 mb-0">
                  Ocupación:&nbsp;&nbsp;&nbsp;
                </h4>
                <p>
                  {!user.ocupation ? (
                    <button
                      className="btn btn-round my-1 btn-sm btn-outline-primary"
                      onClick={() => {
                        editionMode('PersonalInformation');
                        setTimeout(() => {
                          document
                            .getElementById('ocupation-textfield')
                            .focus();
                        }, 1000);
                      }}
                      type="button"
                    >
                      Agrega una ocupación
                    </button>
                  ) : (
                    user.ocupation
                  )}
                </p>
              </div>
              {user.gender && (
                <div className="d-flex flex-row">
                  <h4 className="d-inline mr-3">Género:&nbsp;&nbsp;&nbsp;</h4>
                  <p>
                    {user.gender === 'male'
                      ? 'Masculino'
                      : user.gender === 'female'
                        ? 'Femenino'
                        : 'Otro'}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        <div className="mt-3">
          <h1
            className="display-6 profile-section"
            onMouseEnter={(e) => mouseEnter(e)}
            onMouseLeave={(e) => mouseLeave(e)}
          >
            {largeWidth ? 'Información de contacto' : 'Contacto'}
            {largeWidth ? (
              !(editing === 'ContactInformation') && (
                <button
                  className="btn btn-round mx-3 btn-sm btn-outline-primary profile-edit"
                  onClick={() => editionMode('ContactInformation')}
                  type="button"
                >
                  Editar
                </button>
              )
            ) : !(editing === 'ContactInformation') ? (
              <IconButton
                className="btn mx-1"
                onClick={() => editionMode('ContactInformation')}
                type="button"
              >
                <EditSharp style={{ color: '#2185D0' }} />
              </IconButton>
            ) : (
              <IconButton
                className="btn mx-1"
                onClick={() => editionMode('')}
                type="button"
              >
                <ExpandLess style={{ color: '#2185D0' }} />
              </IconButton>
            )}
          </h1>
          <hr />
          {editing === 'ContactInformation' ? (
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                className="input-profile"
                id="outlined-basic"
                label="Correo electrónico"
                value={information.email}
                name="email"
                onChange={handleChange}
              />
              <TextField
                className="input-profile mb-4"
                id="phone-textfield"
                label="Número de teléfono"
                value={information.phone}
                name="phone"
                onChange={handleChange}
                type="number"
              />
              <br />
              {largeWidth ? (
                <button
                  type="submit"
                  className="btn w-25 btn-success btn-update btn-round"
                  onClick={handleSubmit}
                >
                  Actualizar datos
                </button>
              )
                : (
                  <div className="w-100 all-center p-0 m-0">
                    <button
                      className="btn w-100 btn-success btn-update"
                      onClick={handleSubmit}
                      type="submit"
                    >
                      Actualizar
                    </button>
                  </div>
                )}
              {largeWidth && (
                <button
                  type="button"
                  className="btn btn-outline-danger btn-round w-12"
                  onClick={() => editionMode('')}
                >
                  Cancelar
                </button>
              )}
            </form>
          ) : (
            <div>
              <div className="d-flex flex-row">
                <h4 className="d-inline mr-3">
                  Correo electrónico:&nbsp;&nbsp;&nbsp;
                </h4>
                <p>{user.email}</p>
              </div>
              <div className="d-flex flex-row align-items-center mb-3">
                <h4 className="d-inline mr-3 mb-0">
                  Celular:&nbsp;&nbsp;&nbsp;
                </h4>
                <p>
                  {!user.phone ? (
                    <button
                      className="btn btn-round my-1 btn-sm btn-outline-primary"
                      onClick={() => {
                        editionMode('ContactInformation');
                        setTimeout(() => {
                          document.getElementById('phone-textfield').focus();
                          document.getElementById('phone-textfield').click();
                        }, 1000);
                      }}
                      type="button"
                    >
                      Agrega un celular
                    </button>
                  ) : (
                    user.phone
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="mt-3">
          <h1
            className="display-6 profile-section"
            onMouseEnter={(e) => mouseEnter(e)}
            onMouseLeave={(e) => mouseLeave(e)}
          >
            Contraseña
            {largeWidth ? (
              !(editing === 'password') && (
                <button
                  className="btn btn-round mx-3 btn-sm btn-outline-primary profile-edit"
                  onClick={() => editionMode('password')}
                  type="button"
                >
                  Editar
                </button>
              )
            ) : !(editing === 'password') ? (
              <IconButton
                className="btn mx-1"
                onClick={() => editionMode('password')}
                type="button"
              >
                <EditSharp style={{ color: '#2185D0' }} />
              </IconButton>
            ) : (
              <IconButton
                className="btn mx-1"
                onClick={() => editionMode('')}
                type="button"
              >
                <ExpandLess style={{ color: '#2185D0' }} />
              </IconButton>
            )}
          </h1>
          <hr />
          {editing === 'password' ? (
            <form className={classes.root} noValidate autoComplete="off">
              <FormControl className="input-profile">
                <InputLabel htmlFor="actual-password">
                  Contraseña actual
                </InputLabel>
                <Input
                  id="actual-password"
                  type={visiblePassword.password ? 'text' : 'password'}
                  spellcheck={false}
                  endAdornment={(
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => visibilityPassword('password')}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {visiblePassword.password ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )}
                  value={password.current}
                  name="current"
                  onChange={handlePasswordChange}
                />
              </FormControl>
              <FormControl className="input-profile" error={error.password}>
                <InputLabel htmlFor="new-password-1">
                  Contraseña nueva
                </InputLabel>
                <Input
                  id="new-password-1"
                  type={visiblePassword.newPassword ? 'text' : 'password'}
                  endAdornment={(
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => visibilityPassword('newPassword')}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {visiblePassword.newPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )}
                  value={password.new1}
                  name="new1"
                  inputProps={{
                    onBlur: handleErrors
                  }}
                  onChange={handlePasswordChange}
                />
                <FormHelperText>
                  {error.password && 'La contraseña debe tener al menos seis caracteres'}
                </FormHelperText>
              </FormControl>
              <FormControl className="input-profile mb-4">
                <InputLabel htmlFor="actual-password-2">
                  Repite la nueva contraseña
                </InputLabel>
                <Input
                  id="new-password-2"
                  type={visiblePassword.newPassword ? 'text' : 'password'}
                  spellcheck={false}
                  endAdornment={(
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => visibilityPassword('newPassword')}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {visiblePassword.newPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )}
                  value={password.new2}
                  name="new2"
                  onChange={handlePasswordChange}
                />
              </FormControl>
              <br />
              {largeWidth ? (
                <button
                  className="btn w-25 btn-success btn-round btn-update"
                  disabled={error.password}
                  onClick={handlePasswordSubmit}
                  type="submit"
                >
                  Modificar contraseña
                </button>
              )
                : (
                  <div className="w-100 all-center p-0 m-0">
                    <button
                      className="btn w-100 btn-success btn-update"
                      disabled={error.password}
                      onClick={handlePasswordSubmit}
                      type="submit"
                    >
                      Modificar contraseña
                    </button>
                  </div>
                )}
              {largeWidth && (
                <button
                  type="submit"
                  className="btn btn-outline-danger btn-round w-12"
                  onClick={() => editionMode('')}
                >
                  Cancelar
                </button>
              )}
            </form>
          ) : null}
        </div>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        message={snackbar.message}
        action={(
          <>
            <IconButton className="btn" size="small" color="inherit" onClick={closeSnackbar}>
              <HighlightOffOutlined fontSize="small" />
            </IconButton>
          </>
        )}
      />
    </div>
  );
};

export default Profile;
