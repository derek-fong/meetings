import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    height: '100vh',
  },
  chatContainer: {
    height: '45vh',
  },
  queueContainer: {
    marginTop: '2vh',
    height: '45vh',
  },
});

export const RightPanel = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Paper className={classes.chatContainer}>
        <span>Chat Component goes here</span>
      </Paper>
      <Paper className={classes.queueContainer}>
        <span>Queue Component goes here</span>
      </Paper>
    </div>
  );
};

export default RightPanel;
