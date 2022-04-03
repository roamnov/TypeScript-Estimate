import {  useState } from "react";
import { NestedMenuItem } from "../Tools/NestedMenuOrigin/NestedMenuItem"
import { Button, Grid, IconButton, TextField, Menu, MenuItem, Tooltip, ListItemIcon } from "@mui/material"
import { ImgURL, get_cookie } from "../../Url";

export default function SideBarButton(props){
    // const [open, setOpen] = useState(false);
    const [drawerOpen, setdrawerOpen] = useState(true)
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(get_cookie("CurrentSecID"));
    const [data2, setData2] = useState(new Map());
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };


  
    
    function isEmptyObject(obj) {
      for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
              return false;
          }
      }
      return true;
      
  }
  
    
    function MenuButtonItems(SectionList){
      
      if (SectionList.lenht !== 0) {
        let Name, ID, currentDeep, openSet, openSetDeep, mainCollapse, deepCollapse, Img, keyS = 0, howDeep = 4, mainCollapseID, openSetID, deepCollapseID
        let assemblyLists = [];
        for (const [key, value] of Object.entries(SectionList)) {
          Name = SectionList[key]["Name"];
          ID = SectionList[key]["ID"];
          currentDeep = SectionList[key]["Deep"];
          Img = ImgURL(SectionList[key]["Image"], "32px", "32px");
          //Img = ImgBASE64(SectionList[key]["RCDATA"]);
          keyS += 1;
          
          if (currentDeep == null) {
            //если нет DEEP то отрисовываем родителя
            mainCollapse = data2.get(ID);
            console.log(Name)
            mainCollapseID = ID;
            openSet = data2.get(ID);
            openSetID = ID;
            assemblyLists.push(
              <Grid key={key}>
                  <NestedMenuItem leftIcon={Img} label={Name}>
                  
                    {Name}
                  </NestedMenuItem>
              </Grid>
            );
          } else if (currentDeep !== null) {
            howDeep = 4;
            switch (
            currentDeep //Определяем сколько сдвинуть направо отностиельно родителя
            ) {
              case "1":
                openSet = mainCollapse;
                break;
              case "2":
                howDeep += 5;
                break;
              case "3":
                howDeep += 8;
                break;
            }
            
            if (SectionList[keyS] !== undefined && SectionList[keyS]["Deep"] > currentDeep) {
              //если ключ НЕ необъявен и след deep больше текущего, то рисуем родителя

              currentDeep == "2" ? (deepCollapse = openSet) : (deepCollapse = undefined);
              currentDeep == "2" ? (deepCollapseID = openSetID) : (deepCollapseID = "0");
              openSetDeep = openSet;
              // assemblyLists.push(
                
              // );
              openSetID = ID;
              
          
              
            } else {
              // assemblyLists.push(
                
              // );
            }
          
          }
  
  
        }
        return assemblyLists;
      }
      
    }

      return(
          <Grid >
          <Button size="small" onClick={handleClick} variant="outlined" style={{textTransform:"none", backgroundColor:"white"}}>
              Выбрать
            </Button>
            <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
              {MenuButtonItems(props.json)}
            </Menu>
          </Grid>
      )
}