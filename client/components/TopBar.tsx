import React from 'react';
import { useHistory } from 'react-router';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useAuth } from '../hooks/useAuth';
import { Routes } from '../routes';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import AccountBoxSharpIcon from '@material-ui/icons/AccountBoxSharp';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export const TopBar: React.FC = () => {
  const history = useHistory();
  const { setAuth } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const logout = () => {
    setAuth(null);
    history.push(Routes.LOGIN)
  };

  const classes = useStyles();
  return (
    <AppBar position={'static'} color={'inherit'} elevation={0}>
      <Toolbar>
        <Icon className={classes.menuButton}>
          <HomeWorkIcon />
        </Icon>
        <Typography variant={'h6'} className={classes.title}>
          Rental Seeker
        </Typography>
        <div>
          <IconButton
            onClick={(event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)}
            color={'inherit'}
          >
            <AccountBoxSharpIcon />
          </IconButton>
          <Menu
            open={!!anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorEl={anchorEl}
            keepMounted
          >
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};
