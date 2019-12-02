import React from 'react';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

import style from './Progress.module.scss';

function Progress({
  type,
  size,
  className,
}) {
  switch (type) {
    case 'circular':
      return (
        <div className={style.root}>
          <CircularProgress size={size} />
        </div>
      );
    case 'linear':
      return <LinearProgress className={className} />;
    default:
      return null;
  }
}

Progress.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
};

Progress.defaultProps = {
  size: null,
  className: null,
};

export default Progress;
