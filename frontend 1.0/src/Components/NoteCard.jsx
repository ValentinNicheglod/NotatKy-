import React from 'react';

const NoteCard = ({
  collection,
  content,
  darkMode,
  date,
  editNote,
  hour,
  id,
  title,
}) => (
  <div
    className="card note-card"
    id={darkMode && 'dark-blue'}
    onClick={() => editNote(id)}
    onKeyDown={() => editNote(id)}
    role="button"
    tabIndex={0}
  >
    <div className="card-title">
      <h3>{title.length > 20 ? `${title.slice(0, 20)}...` : title || 'Sin título'}</h3>
    </div>
    <div className="card-text d-flex h-100">
      <p>{content.length > 200 ? `${content.slice(0, 100)}...` : content}</p>
    </div>
    <div
      className="card-footer d-flex justify-content-between align-items-center px-0"
      id={darkMode && 'dark-blue'}
    >
      <div className="w-50">
        {collection && (
          <span
            style={{ backgroundColor: '#2185D0', borderRadius: 10 }}
            className="uk-label col-label"
          >
            {collection.name}
          </span>
        )}
      </div>
      <div className="w-50 d-flex justify-content-end">
        <p className="date">{`${date} | ${hour}`}</p>
      </div>
    </div>
  </div>
);

export default NoteCard;
