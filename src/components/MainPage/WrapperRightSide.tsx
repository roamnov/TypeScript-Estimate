import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import DashboardNavbar from './Header';
import SideBar from './SideBar';
import { Button, ButtonGroup, Grid, Toolbar } from '@material-ui/core';
import SqlWindow from './Windows/ViewData/SqlWindow';
import FullRightSide from './Windows/FullRightSide';
import Init from './test';



export default function WrapperRightSide() {
  const [id, setID] = React.useState();
  const [name, setName] = React.useState();
  const [grid, setGrid] = React.useState(false);
  console.log(name)
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar  position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} style={{backgroundColor:"#628eb8"}}>
        <DashboardNavbar/>
      </AppBar>

      <SideBar setBackName={setName} setBackID={setID}/>
      <FullRightSide Name={name} ID={id} />
      <Toolbar/>
          
      
    </Box>
  );
}
/*

<Button style={{marginTop: 200}} onClick={() => setGrid(true)}> Нажми на меня</Button>
        <div style={{marginTop: 200, width:"50%", height:"100%"}} id="gridPanel">  </div> 
        {grid? Init(): <> пока пусто</> }
*/