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
import {useStyles} from "../../Styles"
import { Typography } from '@mui/material';
import { DrxContext } from '../../Wrapper';
import {HiddenNavButton} from './HiddenNav'
import { Headerprops } from '../../ComponentInterface';

const DashboardNavbar = (props:Headerprops) => {
  const [notifications] = useState([]);
  const [authtoken, setAutnToken] = useLocalStorage(true, "auth")
  let navigate = useNavigate();
  const classes = useStyles();
  const drx = get_cookie("drx");
  
  const HandleSingOut = (event: any) => {
    let params = new Map();
    params.set('comand','leave');
    XMLrequest(params)
    CreateCokies("drx","");
  };
 
  return (
    <AppBar  position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} style={{backgroundColor:"#628eb8"}}>
      <Toolbar className={classes.customizeToolbar} style = {{minHeight:48}}>
        <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            {props.name ? drx.replace(".drx","")+' / '+ props.name: drx.replace(".drx","")}
          </Typography>
          
        <Box sx={{ flexGrow: 1 }} />
        
          <IconButton color="inherit" size="large">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Link to={'/'} >
          <IconButton color="inherit" size="large" onClick={HandleSingOut}>
            <InputIcon />
           
          </IconButton>
       </Link>
        
      </Toolbar>
      <div id = "HiddenNav" style={!props.open ? {display: "block"}:{display: "none"}}>
       <HiddenNavButton />
      </div>
      </AppBar>
    
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
