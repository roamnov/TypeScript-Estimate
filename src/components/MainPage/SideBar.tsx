import React, { createElement, useEffect, useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import axios from "axios";
import URL from "../Url";
import { ImgURL } from "../Url";
import { Button, Grid, MenuItem } from "@material-ui/core";

import { setTimeout } from "timers";

export default function SideBar() {

  const [open1, setOpen1] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [data2, setData2] = useState(new Map);

  const handleClick = (event: any) => {
    setOpen(!open);
    let ID = event.currentTarget.getAttribute("id");
    setData2(data2.set(ID, !data2.get(event.currentTarget.getAttribute("id"))))    
  };

  const updateSelected = (event: any) => {
    console.log(event.currentTarget.getAttribute("id"));
  };

  React.useEffect(() => {
    axios.get(URL("GetSectionList", "Simple=1&full=1")).then((response) => {
      console.log(response.data["Sections"]);
      setData(response.data["Sections"]);
      ListItems(response.data["Sections"]);
        });
    }, []);

  const handleGet = (event: any) => {
    //ивент кнопки на получение данных
    axios.get(URL("GetSectionList", "Simple=1&full=1")).then((response) => {
      console.log(response.data["Sections"]);
      setData(response.data["Sections"]);
      ListItems(response.data["Sections"]);
    });
    setOpen1(!open1);
    
  };

  function ListItems(List:any){
    let ID ,keyS = 0;
    let assemblyListsTest = [];
    for (const [key, value] of Object.entries(List)) {
      keyS += 1;
      ID = List[key]["ID"];

      if (List[key]["Deep"] == null) {
        setData2(data2.set(ID,false))
      }
      if (List[keyS] !== undefined  && List[keyS]["Deep"] > List[key]["Deep"] ) {
        setData2(data2.set(ID,false))
      }
    }
  
    
  };
  


  function Menu(SectionList: any) {
    // фцнкция отрисовки меню
   
         
      let Name, ID, currentDeep,  openSet, openSetDeep,  mainCollapse, deepCollapse, Img, keyS = 0, howDeep = 4, higherLvL= true;
      let assemblyLists = []; //сюда записываем все списки а потом отправляем на отрисовку
      
      try {
        for (const [key, value] of Object.entries(SectionList)) {
          //ходим по всему объекту
          Name = SectionList[key]["Name"];
          ID = SectionList[key]["ID"];
          currentDeep = SectionList[key]["Deep"];
          Img = ImgURL(SectionList[key]["Image"]);
          
          keyS += 1;
          
                
          if (currentDeep == null) {
            //если нет DEEP то отрисовываем родителя
            mainCollapse = data2.get(ID);
            openSet = data2.get(ID);
            assemblyLists.push(
              
              <ListItemButton component="li" id={ID} >
                <ListItemIcon>{Img}</ListItemIcon>
                <ListItemText primary={Name} />
                {SectionList[keyS] !== undefined  && SectionList[keyS]["Deep"] >= 1? (openSet ? (<ExpandLess id={ID} onClick={handleClick} />) : ( <ExpandMore id={ID} onClick={handleClick} /> )): (<></>)}
              </ListItemButton>
              
            );
          } else if (currentDeep !== null) {//если есть DEEP
            howDeep = 4;
                               
            switch (currentDeep) {//Определяем сколько сдвинуть направо отностиельно родителя
              case "1":
                openSet = mainCollapse;
                break;
              case "2":
                howDeep += 4;
                break;
              case "3":
                howDeep += 8;
                break;
            }
            if (SectionList[keyS] !== undefined  && SectionList[keyS]["Deep"] > currentDeep ) {//если ключ НЕ необъявен и след deep больше текущего, то рисуем родителя

              currentDeep == "2" ? deepCollapse =  openSet  :  deepCollapse = undefined ;
              openSetDeep =  openSet;
              assemblyLists.push(
                <Collapse in={openSet && mainCollapse} timeout="auto" unmountOnExit>
                  {openSet = data2.get(ID)}
                  <ListItemButton sx={{ pl: howDeep }} id={ID}>
                    <ListItemIcon>{Img}</ListItemIcon>
                    <ListItemText primary={Name} />
                    {openSet ? (<ExpandLess id={ID} onClick={handleClick} />) : ( <ExpandMore id={ID} onClick={handleClick} /> )}
                  </ListItemButton>
                </Collapse>
              );
               
            }
            else {
              assemblyLists.push(
               
                <Collapse in={ openSet && mainCollapse  && currentDeep == "3" ? deepCollapse: openSet && mainCollapse} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding >
                    <ListItemButton sx={{ pl: howDeep }} id={ID} >
                      <ListItemIcon>
                        {Img}
                      </ListItemIcon>
                      <ListItemText primary={Name} />
                    </ListItemButton>
                  </List>
                </Collapse>
                
              );
            }
          }
        }
        
      } catch(error) {
        console.log(error)
      }
     
      console.log(data2);
      return assemblyLists;
    
  }
 
  return (
    
      <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
     
    >
      {Menu(data)}
      
    </List>
  );
}
/*
else if(howDeep >= 8){
              assemblyLists.push(
              <Collapse in={mainCollapse} timeout="auto" unmountOnExit>
              <Collapse in={openSet} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding >
                    <ListItemButton sx={{ pl: howDeep }} id={ID} >
                      <ListItemIcon>
                        {Img}
                      </ListItemIcon>
                      <ListItemText primary={Name} />
                    </ListItemButton>
                  </List>
                </Collapse>
                </Collapse>);
            }
*/