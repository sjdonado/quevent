import React from 'react';
import PropTypes from 'prop-types';

import {
  Tooltip, IconButton,
} from '@material-ui/core';
import styles from './ActionButton.module.scss';

function ActionButton({ title, children, ...props }) {
  return (


    <Tooltip title={title} aria-label="add a guest to the list">
      <IconButton
        {...props}
        color="secondary"
        aria-label="add"
        className={styles['action-button']}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
}

ActionButton.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default ActionButton;
