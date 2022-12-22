import React from 'react';
import { useHistory } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import './css/Card.css';

const CardInfo = ({
  color, description, image, largeWidth, title,
}) => {
  const history = useHistory();

  return (
    <div className="card card-info" style={{ backgroundColor: color }}>
      <div className="h-50 all-center">
        <img
          src={image}
          alt="icon"
          className="card-img-top h-100"
        />
      </div>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <hr />
        <p className="card-text">{description}</p>
        {largeWidth && (
          <button
            className="card-btn"
            onClick={() => history.push('/login')}
            type="button"
          >
            Empieza &nbsp;&nbsp;
            <Icon name="long arrow alternate right" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CardInfo;
