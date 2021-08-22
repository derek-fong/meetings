import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { throttle } from 'lodash';
// redux
import { connect } from 'react-redux';
import { raiseHand, doneTalking } from '../../redux/actions/SocketAction';

//UI
import { Button, List } from '@material-ui/core';
import { styles, altStyles } from '../../UI_Components/UIComponents';
import MeetingQueueListItem from './MeetingQueueListItem';

const MeetingQueueMode = (props) => {
  const useStyles = makeStyles(props.isDarkMode ? altStyles : styles);
  const classes = useStyles();

  const raise = throttle(
    (roomId, userName) => {
      const userObj = {
        userName: userName,
        fullName: props.fullName,
      };
      props.raiseHand(roomId, userObj);
    },
    1000,
    { trailing: false }
  );

  const finishTalking = throttle(
    (roomId, userName) => {
      props.doneTalking(roomId, userName);
    },
    1000,
    { trailing: false }
  );

  const userNameFirstLetterGetter = (userName) => {
    var res = userName.charAt(0);
    return res.toUpperCase();
  };

  const renderButton = () => {
    const { userName, queue } = props;
    const roomId = props.match.params.roomId;
    let buttonLabel = 'Raise';
    let handler = () => raise(roomId, userName);
    if (queue[0] && queue[0].userName === userName) {
      handler = () => finishTalking(roomId, userName);
      buttonLabel = 'Done';
    } else if (queue.find((u) => u.userName === userName)) {
      handler = () => {};
      buttonLabel = 'Wait for your turn...';
    }

    return (
      <Button
        disabled={buttonLabel === 'Wait for your turn...'}
        className={classes.bottomButton}
        onClick={handler}
      >
        {buttonLabel}
      </Button>
    );
  };

  return (
    <div>
      <div className={classes.mappingItemContainer}>
        <h1>Queue</h1>
        {Array.isArray(props.queue) && props.queue.length > 0 && (
          <List>
            {props.queue.map((q, i) => (
              <MeetingQueueListItem
                classes={classes}
                key={i}
                userName={q.fullName}
                userNameFirstLetter={userNameFirstLetterGetter(
                  q.fullName
                )}
              />
            ))}
          </List>
        )}
      </div>
      <div className={classes.bottomNav}>
        <div>{renderButton()}</div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    connectionStatus: state.room.connectionStatus,
    roomId: state.room.roomId,
    queue: state.room.queue,
    isDarkMode: state.theme.isDarkMode,
    userName: state.user.userName,
    fullName: state.user.fullName,
    members: state.room.members,
    isAdmin: state.room.isAdmin,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    raiseHand: (roomId, userName) => {
      dispatch(raiseHand(roomId, userName));
    },
    doneTalking: (roomId, userName) => {
      dispatch(doneTalking(roomId, userName));
    },
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )((MeetingQueueMode))
);
