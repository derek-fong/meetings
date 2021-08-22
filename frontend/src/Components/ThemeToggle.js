import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness6Icon from '@material-ui/icons/Brightness6';
import React from 'react';
import { connect } from 'react-redux';

import { setTheme } from '../redux/actions/ThemeAction';

const ThemeToggle = (props) => {
  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton
        aria-label="theme-toggle"
        onClick={() => props.setTheme(!props.isDarkMode)}
      >
        {props.isDarkMode ? <Brightness4Icon /> : <Brightness6Icon />}
      </IconButton>
    </Tooltip>
  );
};

const mapStateToProps = (state) => {
  return {
    isDarkMode: state.theme.isDarkMode, 
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTheme: (isDarkMode) => {
      dispatch(setTheme(isDarkMode));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeToggle);
