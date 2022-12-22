import React from 'react';
import moment from 'moment';
import momenttz from 'moment-timezone';
import {
  Chip, Fab, IconButton, Tooltip
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NoteCard from './NoteCard';

const Notes = ({
  collections,
  darkMode,
  editNote,
  greeting,
  largeWidth,
  message,
  newNote,
  notes,
  onEdition,
  pathname,
  restartFilter,
  selectedFilter,
  user
}) => {
  const register = [];

  return (
    <div
      className={largeWidth ? 'blue-aside notes-cont' : 'notes-cont'}
      id={darkMode ? 'dark-border' : undefined}
    >
      <div className="row full-height w-100">
        <div className="col d-flex justify-content-between align-items-center directory mb-2">
          {pathname === '/archive' ? (
            <h1 className="violet m-0">Notas archivadas</h1>
          ) : pathname === '/trash' ? (
            <h1 className="violet m-0">Notas eliminadas</h1>
          ) : (
            <>
              <h1 className="violet m-0">Notas</h1>
              {largeWidth
                ? (
                  <Tooltip title="Nueva nota" placement="right">
                    <IconButton
                      className="p-0 btn btn-add-note"
                      style={{ width: 45, height: 45 }}
                      onClick={newNote}
                    >
                      <AddIcon className="w-75 h-75 white" />
                    </IconButton>
                  </Tooltip>
                )
                : (
                  <div className="d-flex row justify-content-end">
                    <b className="m-0 d-flex justify-content-end greeting display-6">
                      {`${greeting},`}
                    </b>
                    <b className="m-0 d-flex justify-content-end greeting-name">
                      {`${user.name}!`}
                    </b>
                    <hr className="my-1 w-25 pr-2" style={{ marginRight: '10px' }} />
                  </div>
                )}
            </>
          )}
        </div>
        {selectedFilter.name !== '' && (
          <div className="row d-flex align-items-center my-3 px-4">
            <b className="p-0">{`${selectedFilter.type} seleccionada`}</b>
            <hr className="mt-0" />
            <div className="d-flex justify-content-between align-items-center p-0">
              <Chip
                label={selectedFilter.name}
                onDelete={restartFilter}
                color="secondary"
                className="filter-selected"
              />
            </div>
          </div>
        )}
        <div id="notes-cont-3" className={notes.length === 0 ? 'all-center' : undefined}>
          {notes.length !== 0 ? (
            notes
            && notes.map((note) => {
              const updated = moment(note.updatedAt.slice(0, 10), 'YYYY-MM-DD')
                .fromNow()
                .split(' ');
              return (
                <div key={note.id}>
                  {((updated[1] === 'hour' || updated[1] === 'hours' || updated[1] === 'seconds' || updated[1] === 'minute' || updated[1] === 'minutes' || updated[1] === 'few') || (updated[0] === 'in'))
                    && !register.includes('today')
                    && (register.push('today'),
                    (
                      <>
                        <b>Hoy</b>
                        <hr className="mt-0" />
                      </>
                    ))}
                  {updated[1] === 'day'
                    && !register.includes('yesterday')
                    && (register.push('yesterday'),
                    (
                      <>
                        <b>Ayer</b>
                        <hr className="mt-0" />
                      </>
                    ))}
                  {updated[1] === 'days'
                    && !register.includes('days')
                    && (register.push('days'),
                    (
                      <>
                        <b>Dos días o mas</b>
                        <hr className="mt-0" />
                      </>
                    ))}
                  {updated[1] === 'days'
                    && parseInt(updated[0], 10) >= 7
                    && !register.includes('week')
                    && (register.push('week'),
                    (
                      <>
                        <b>Una semana o mas</b>
                        <hr className="mt-0" />
                      </>
                    ))}
                  {(updated[1] === 'month' || updated[1] === 'months')
                    && !register.includes('month')
                    && (register.push('month'),
                    (
                      <>
                        <b>Un mes o mas</b>
                        <hr className="mt-0" />
                      </>
                    ))}
                  {(updated[1] === 'year' || updated[1] === 'years')
                    && !register.includes('year')
                    && (register.push('year'),
                    (
                      <>
                        <b>Un año o mas</b>
                        <hr className="mt-0" />
                      </>
                    ))}
                  <NoteCard
                    editNote={editNote}
                    collection={
                      collections.filter((e) => e.id === note.collectionId)[0]
                    }
                    content={
                      note.id === onEdition.id
                        ? onEdition.content
                        : note.content
                    }
                    date={
                      note.updatedAt
                      && moment(note.updatedAt.slice(0, 10), 'YYYY-MM-DD').format(
                        'DD/MM/YY',
                      )
                    }
                    darkMode={darkMode}
                    hour={
                      note.updatedAt
                      && momenttz(note.updatedAt)
                        .tz('America/Montevideo')
                        .format('HH:mm')
                    }
                    id={note.id}
                    key={note.id}
                    title={
                      note.id === onEdition.id ? onEdition.title : note.title
                    }
                  />
                </div>
              );
            })
          ) : (
            <div className="all-center row w-75">
              <img
                draggable={false}
                src="svg/oops.svg"
                width="50%"
                alt="not-found"
                style={{ marginBottom: '10%' }}
              />
              <p className="all-center">
                <b>{message}</b>
              </p>

            </div>
          )}
        </div>
        {!largeWidth && pathname === '/home' && (
          <Fab aria-label="add" className="fab-add btn" onClick={newNote}>
            <AddIcon className="add-icon" />
          </Fab>
        )}
      </div>
    </div>
  );
};

export default Notes;
