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
import infoPanel from './Windows/InfoPanel';
import InfoPanel from './Windows/InfoPanel';
import SqlWindow from './Windows/SqlWindow';
import Tree from './Tree/tree';

const drawerWidth = 330;

export default function ClippedDrawer() {
  const [id, setID] = React.useState();
  console.log(id)
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar  position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} style={{backgroundColor:"#628eb8"}}>
        <DashboardNavbar/>
      </AppBar>
      
          <SideBar setBackID={setID}/>
          
    
          
      <Grid container 
        direction="column" 
        justifyContent="center" 
        component="main" 
        sx={{ flexGrow: 1, pt: 2, pl:2 }}  
        alignItems="stretch"
        
        >
     
        <Grid item direction="column" style={{backgroundColor:"blueviolet"}}>
        <Toolbar />
          Верхушка(меню)
        </Grid>
        <Grid item direction="column" style={{backgroundColor:"blue"}} >
          Хлебные крошки
        </Grid>
          <Grid container item
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
          xs
          >
            <Grid xs={2} style={{}} >
                <Tree/>
            </Grid>
            <Grid  xs={10} style={{backgroundColor:"red"}}>
                <SqlWindow/>
            </Grid>
          </Grid>
      </Grid>
    </Box>
  );
}
