import { useState } from 'react';
import { Link, Link as RouterLink, useHistory } from 'react-router-dom';
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
import URL from "../Url";
import axios from 'axios';
import imageHeader from '../../static/images/header.jpg';

const DashboardNavbar = ({  ...rest }) => {
  const [notifications] = useState([]);
  let history = useHistory();
  
  const handleSingOut = (event: any) => {
    let params = new Map();
    params.set('comand','leave');
    axios.get(URL(params)).then((response) => {
      console.log(response.data);
    });
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
          <IconButton color="inherit" size="large" onClick={handleSingOut}>
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
