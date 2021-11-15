import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import DashboardNavbar from './NotWorkArea(Side&Head)/Header';
import SideBar from './NotWorkArea(Side&Head)/SideBar';
import { Button, ButtonGroup, Grid, Toolbar } from '@material-ui/core';
import SqlWindow from './Windows/ViewData/SqlWindow';
import FullRightSide from './Windows/FullRightSide';
import Init from './stimategrid/test';
import { InfoAboutClick } from '../ComponentInterface';


export default function WrapperRightSide() {
  const [id, setID] = React.useState();
  const [clsid, setCLSID] = React.useState();
  const [selected, setSelected] = React.useState<InfoAboutClick | undefined>();
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar  position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} style={{backgroundColor:"#628eb8"}}>
        <DashboardNavbar/>
      </AppBar>

      <SideBar setBackCLSID={setCLSID} setBackID={setID} setSelected={setSelected}/>
      <FullRightSide CLSID={clsid} ID={id} />
      <Toolbar/>
          
      
    </Box>
  );
}



/*

<Button style={{marginTop: 200}} onClick={() => setGrid(true)}> Нажми на меня</Button>
        <div style={{marginTop: 200, width:"50%", height:"100%"}} id="gridPanel">  </div> 
        {grid? Init(): <> пока пусто</> }
*/