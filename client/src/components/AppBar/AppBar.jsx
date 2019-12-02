import React from 'react';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Typography from '@material-ui/core/Typography';
import { Query } from 'react-apollo';

import style from './AppBar.module.scss';

import { APPBAR_QUERY } from '../../graphql/queries';

import Progress from '../Progress/Progress';

function AppBar() {
  const handleUserMenuClick = () => {

  };

  return (
    <Query query={APPBAR_QUERY}>
      {({ loading, error, data }) => {
        if (error) return null;
        if (loading) {
          return (
            <div className={style.root}>
              <Progress type="circular" size={68} />
            </div>
          );
        }
        const { name, profilePicture } = data.getUser;
        return (
          <div
            role="button"
            aria-controls="user-menu"
            aria-haspopup="true"
            tabIndex={0}
            onClick={handleUserMenuClick}
            onKeyDown={handleUserMenuClick}
            // className={`${style['user-menu-btn']} ${classes.userMenuBtn}`}
          >
            <img src={profilePicture} width="40" height="40" alt="User's profile" />
            <Typography variant="body2" color="primary">{name}</Typography>
            <ArrowDropDownIcon color="primary" />
          </div>
        );
      }}
    </Query>
  );
}

export default AppBar;
