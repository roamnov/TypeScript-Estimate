import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardNavbar from './Header';
import SideBar from './SideBar';
import { Button, ButtonGroup, Grid } from '@material-ui/core';
import SqlWindow from './Windows/ViewData/SqlWindow';
import FullRightSide from './Windows/FullRightSide';
import Init from './test';
import ReactDOM from 'react-dom';



export default function ClippedDrawer() {
  const [id, setID] = React.useState();
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar  position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} style={{backgroundColor:"#628eb8"}}>
        <DashboardNavbar/>
      </AppBar>

      <SideBar setBackID={setID}/>
      {id !== undefined? <FullRightSide ID={id} /> : <div></div>}
      {}
      
      
    </Box>
  );
}
