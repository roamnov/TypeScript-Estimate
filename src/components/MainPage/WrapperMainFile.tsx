import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import DashboardNavbar from './NotWorkArea(Side&Head)/Header';
import SideBar from './NotWorkArea(Side&Head)/SideBar';
import FullRightSide from './Windows/FullRightSide';
import { InfoAboutClick } from '../ComponentInterface';
import ModalContainer from '../Containers/ModalContainer';
import { Outlet } from 'react-router-dom';

export default function WrapperRightSide() {
  
  function ClickDocument(ev: any) {
    let AllList, list, itemList
    AllList = document.querySelectorAll("div.css-b62m3t-container")
    // console.log(AllList)
    for (let i = 0; i<=AllList.length - 1; i = i+1)
    {
        list = AllList[i];
        const withinBoundaries = ev.composedPath().includes(list);
        if ( ! withinBoundaries ){
            itemList = list.querySelector("div.select__menu") 
            if (itemList)
            {
                itemList.remove();
            }
        }
        
    }
}


  const [id, setID] = React.useState();
  const [clsid, setCLSID] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [selected, setSelected] = React.useState<InfoAboutClick | undefined>();
  document.addEventListener("click", (e) => {ClickDocument(e) })

  return (
    <Box sx={{ display: 'flex' , height:"100%", overflow:"hidden"}}>
      <CssBaseline />
      <DashboardNavbar/>
      <SideBar  isLoading={setIsLoading} setSelected={setSelected}/>
      <FullRightSide isLoading={isLoading} id= {selected?.id}  clsic= {selected?.clsic} name= {selected?.name}  />
    </Box>
  );
}



/*

        <ModalContainer>
          <>
          SAS
          </>
        </ModalContainer>
<Button style={{marginTop: 200}} onClick={() => setGrid(true)}> Нажми на меня</Button>
        <div style={{marginTop: 200, width:"50%", height:"100%"}} id="gridPanel">  </div> 
        {grid? Init(): <> пока пусто</> }
*/