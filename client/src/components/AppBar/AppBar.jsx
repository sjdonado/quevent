import React from 'react';

import {
  Typography, AppBar, Toolbar, IconButton, Menu, MenuItem, Badge, Avatar, Box,
} from '@material-ui/core';
import { Query } from 'react-apollo';

import styles from './AppBar.module.scss';

import { APPBAR_QUERY } from '../../graphql/queries';

import Progress from '../Progress/Progress';

function StyledAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <AppBar className={styles.root}>
      <Toolbar className={styles.toolbar}>
        <Typography variant="h6">
                Quevent
        </Typography>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          className={styles['profile-wrapper']}
          color="inherit"
        >
          <Box className={styles['profile-wrapper']}>
            <Query query={APPBAR_QUERY}>
              {({ loading, error, data }) => {
                if (error) {
                  return null;
                }
                if (loading) {
                  return null;
                }
                const { name, profilePicture } = data.getUser;
                return (
                  <>
                    <Typography
                      className={styles.username}
                      variant="subtitle1"
                      noWrap
                    >
                      {name}
                    </Typography>
                    <Badge
                      classes={{ badge: styles.badge }}
                      overlap="circle"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      variant="dot"
                    >
                      <Avatar
                        alt="Profile Picture"
                        src={profilePicture}
                        className={styles.picture}
                      />
                    </Badge>
                  </>
                );
              }}
            </Query>
          </Box>
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default StyledAppBar;
