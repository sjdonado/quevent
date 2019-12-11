import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Paper } from '@material-ui/core';
import styles from './TabsNav.module.scss';


export default function TabsNav({ handleTabChange, currentFilter }) {
  return (
    <Paper className={styles.wrapper}>
      <Tabs
        classes={{
          indicator: styles.tabs,
        }}
        centered
        value={currentFilter}
        onChange={handleTabChange}
        aria-label="styled tabs example"
        TabIndicatorProps={{ children: <div /> }}
      >
        <Tab
          classes={{
            root: styles.tab,
          }}
          disableRipple
          label="All Guests"
        />
        <Tab
          classes={{
            root: styles.tab,
          }}
          disableRipple
          label="Attended"
        />
        <Tab
          classes={{
            root: styles.tab,
          }}
          disableRipple
          label="Not Attended"
        />
      </Tabs>
    </Paper>
  );
}

TabsNav.propTypes = {
  handleTabChange: PropTypes.func.isRequired,
  currentFilter: PropTypes.number.isRequired,
};
