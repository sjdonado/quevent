import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Box } from '@material-ui/core';
import styles from './TabsNav.module.scss';


const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: '#2f353f',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
// eslint-disable-next-line react/jsx-props-no-spreading
}))((props) => <Tab disableRipple {...props} />);


export default function TabsNav() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={styles.wrapper}>
      <Tabs
        classes={{
          indicator: styles.tabs,
        }}
        centered
        value={value}
        onChange={handleChange}
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
    </Box>
  );
}
