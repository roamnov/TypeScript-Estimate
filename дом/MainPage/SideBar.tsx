import React, { useEffect, useState } from "react";
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
import jsonn from "./test.json";
import { setTimeout } from "timers";

export default function SideBar() {
  const [open, setOpen] = useState(true);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState();
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState();
  const [data2, setData2] = useState(new Map);

  const handleClick = (event: any) => {
    setOpen(!open);
    //setOpen1({[menu+'open']: !menu });
    console.log(event.currentTarget.getAttribute("id"));
  };

  const updateSelected = (event: any) => {
    console.log(event.currentTarget.getAttribute("id"));
  };

  const handleGet = (event: any) => {
    //ивент кнопки на получение данных
    axios.get(URL("GetSectionList", "Simple=1&full=1")).then((response) => {
      console.log(response.data["Sections"]);
      setData(response.data["Sections"]);
    });
    setOpen1(!open1);
  };

  function Menu(SectionList: any) {
    // фцнкция отрисовки меню
    if (open1) {
      let Name: {} | null | undefined,
        ID,
        Img,
        keyS = 0;
      let array = []; //сюда записываем все списки а потом отправляем на отрисовку
      let array1 = new Map;
      let howDeep = 4;

      try {
        for (const [key, value] of Object.entries(SectionList)) {
          //ходим по всему объекту
          Name = SectionList[key]["Name"];
          ID = SectionList[key]["ID"];
          Img = ImgURL(SectionList[key]["Image"]);
          keyS += 1;

          if (SectionList[key]["Deep"] == null) {
            //если нет DEEP то отрисовываем обычный компонент

            array1.set(ID, false);
            
            array.push(
              <ListItemButton id={ID} >
                <ListItemIcon>{Img}</ListItemIcon>
                <ListItemText primary={Name} />
                {open ? (<ExpandLess id={ID} onClick={handleClick} />) : ( <ExpandMore id={ID} onClick={handleClick} /> )}
              </ListItemButton>
            );
          } else if (SectionList[key]["Deep"] !== null) {
            //если есть DEEP
            howDeep = 4;

            switch (
              SectionList[key]["Deep"] //Определяем сколько сдвинуть направо отностиельно родителя
            ) {
              case "1":
                break;
              case "2":
                howDeep += 4;
                break;
              case "3":
                howDeep += 8;
                break;
            }
            if (
              SectionList[keyS] !== undefined &&
              SectionList[keyS]["Deep"] > SectionList[key]["Deep"]
            ) {
              //если ключ НЕ необъявен и след deep больше текущего, то рисуем родителя
              array.push(
                <ListItemButton sx={{ pl: howDeep }} id={ID}>
                  <ListItemIcon>{Img}</ListItemIcon>
                  <ListItemText primary={Name} />
                  {open ? (
                    <ExpandLess children={Name} onClick={handleClick} />
                  ) : (
                    <ExpandMore onClick={handleClick} />
                  )}
                </ListItemButton>
              );
            } else {
              array.push(
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: howDeep }}
                      id={ID}
                      
                      onClick={updateSelected}
                    >
                      <ListItemIcon>{Img}</ListItemIcon>
                      <ListItemText primary={Name} />
                    </ListItemButton>
                  </List>
                </Collapse>
              );
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
      
      //setData2(array1)
      console.log(data2);
      return array;
    }
    
  }

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      
    >
      {Menu(data)}
      <Button onClick={handleGet}> GET</Button>
    </List>
  );
}
