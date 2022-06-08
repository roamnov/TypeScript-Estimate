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
import { HiddenNavButton } from '../MainPage/NotWorkArea(Side&Head)/HiddenNav'
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from '@material-ui/core';
import Split from 'react-split'
import Tooltip from '@mui/material/Tooltip';
import { Scrollbars } from 'react-custom-scrollbars-2';
import cn from "classnames"
import useTheme from '../Hooks/useTheme';
import { ThemeProvider } from '../../provider/ThemeProvider';

export default function WrapperRightSide() {
  const theme:any = useTheme(); 
  function ClickDocument(ev: any) {
    let AllList, list, itemList
    AllList = document.querySelectorAll("div.css-b62m3t-container")
    // console.log(AllList)
    for (let i = 0; i <= AllList.length - 1; i = i + 1) {
      list = AllList[i];
      const withinBoundaries = ev.composedPath().includes(list);
      if (!withinBoundaries) {
        itemList = list.querySelector("div.select__menu")
        if (itemList) {
          itemList.remove();
        }
      }

    }
  }

  console.log(theme, "1")

  const [id, setID] = React.useState();
  const [clsid, setCLSID] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [selected, setSelected] = React.useState<InfoAboutClick | undefined>();
  const [drawerOpen, setdrawerOpen] = React.useState(true);
  const [nameOpen, setNameOpen] = React.useState();

  document.addEventListener("click", (e) => { ClickDocument(e) })
 
  function ShowMenu()
  {

    setdrawerOpen(!drawerOpen)


  }
  
 

  return ( 
  // <ThemeProvider>
    <div style={{ display: 'flex', height: "100%", overflow: "hidden", position: "absolute", flexDirection: "column", width: "100%" }} >
      <div style={{ display: 'flex', height: "82px", overflow: "hidden" }} id="Header">
        <DashboardNavbar />
        <div className={
              cn("headerStimate",{light: theme === "light"})
            }  style={{ height: "34px", overflow: "hidden", width: "100%", position: "fixed", top: "48px", boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)" }}>
          <div id="miniMenu" style={{ display: '-webkit-box', alignItems: "center" }}>
            <div id="HideMenu" >
              <Tooltip title={!drawerOpen ? "Показать панель рабочих мест" : "Скрыть панель рабочих мест"} >
                <IconButton aria-label="CancelEdit" size="small" onClick={ShowMenu}>
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div id="HiddenNav" style= {drawerOpen ? {display: 'none'}: {display: 'flex'}} >
              <HiddenNavButton />
            </div>
            <div className={
                    cn("fontColorStimate",{light: theme === "light"})
                  }  id="NameSection" style={{  paddingTop: "6px", fontFamily: "Roboto,Helvetica,Arial, sans-serif", fontWeight: "500", fontSize: "1rem" }}>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', height: "100%", overflow: "hidden", flexDirection: "row" }} id="SideBar_FullRightSide">
        <Split className="wrap" sizes={[20, 80]} >
          <div 
          className={
            cn("sidebarStimate",{light: theme === "light"})
          } 
          style={drawerOpen ? { width: "calc(20% - 5px)",height: "100%", overflow: "auto", whiteSpace:"nowrap" } : {height: "100%",  width: "0px"}} id="SideBar" >
          <Scrollbars autoHide>
            <SideBar isLoading={setIsLoading} setSelected={setSelected} />
          </Scrollbars>
          </div>
          <div className={
            cn("backgroundColorStimate",{light: theme === "light"})
          } 
            style={ drawerOpen ? { display: 'flex', height: "100%", overflow: "hidden", width: "calc(80% - 5px)" }: { display: 'flex', height: "100%", overflow: "hidden", width: "100%" }} id="FullRightSide" >
            <FullRightSide isLoading={isLoading} id={selected?.id} clsic={selected?.clsic} name={selected?.name} />
          </div>
        </Split>
      </div>
    </div>
    // </ThemeProvider>
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