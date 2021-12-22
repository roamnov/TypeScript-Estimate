import { useState } from 'react';
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
import URL, { XMLrequest } from "../../Url";
import axios from 'axios';
import imageHeader from '../../../static/images/header.jpg';
import useLocalStorage from '../../Hooks/useLocalStorage';

const DashboardNavbar = ({  ...rest }) => {
  const [notifications] = useState([]);
  const [authtoken, setAutnToken] = useLocalStorage(true, "auth")
  let navigate = useNavigate();
  
  const HandleSingOut = (event: any) => {
    let params = new Map();
    params.set('comand','leave');
    //useLocalStorage("","drx")
    XMLrequest(params)
    setAutnToken(false, "auth")
      
    
  };

  return (
    
      <Toolbar style={{marginLeft: -30, }}>
        <img src={imageHeader}/>
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
    
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
