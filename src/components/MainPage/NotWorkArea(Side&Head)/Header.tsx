import { useContext, useEffect, useState } from 'react';
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import URL, { CreateCokies, get_cookie, XMLrequest } from "../../Url";
import useLocalStorage from '../../Hooks/useLocalStorage';
import { useStyles } from "../../Styles"
import { Tooltip, Typography } from '@mui/material';
import { Theme } from '../../Wrapper';
import { HiddenNavButton } from './HiddenNav'
import useTheme from '../../Hooks/useTheme.jsx';
import cn from "classnames"

const DashboardNavbar = (props: any) => {
  const theme:any = useTheme(); 
  const [notifications] = useState([]);
  let navigate = useNavigate();
  const classes = useStyles();
  const drx = get_cookie("drx");
  const HandleSingOut = (event: any) => {
    let params = new Map();
    params.set('comand', 'leave');
    XMLrequest(params)
    CreateCokies("drx", "");
    CreateCokies("LicG", "");
  };

  return (
    <AppBar className={
      cn("headerStimate",{light: theme === "light"})
    } 
    position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} >
      <Toolbar className={classes.customizeToolbar} style={{ minHeight: 48, height: 48 }}>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          className={
            cn("fontColorStimate",{light: theme === "light"})
          } 
        >
          {drx.replace(".drx", "")}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton  size="large"
          className={
            cn("iconButtonStimete",{light: theme === "light"})
          } 
        >
          <Badge
            badgeContent={notifications.length}
            color="primary"
            variant="dot"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Tooltip title={"Выход"}>
          <Link to={'/'} >
            <IconButton size="large" onClick={HandleSingOut}
              className={
                cn("iconButtonStimete",{light: theme === "light"})
              } 
            >
              <InputIcon />

            </IconButton>
          </Link>
        </Tooltip>
        

        </Toolbar>
      
      
    </AppBar>

  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
