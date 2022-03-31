import {  useState } from "react";
// import { NestedMenuItem } from "../Tools/NestedMenuOrigin/NestedMenuItem"
import { Button, Grid, IconButton, TextField, Menu, MenuItem, Tooltip } from "@mui/material"
import { ImgURL, get_cookie } from "../../Url";

export default function SideBarButton(props:any){
    const [open, setOpen] = useState(false);
    const [drawerOpen, setdrawerOpen] = useState(true)
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(get_cookie("CurrentSecID"));
    const [data2, setData2] = useState(new Map());
    const [anchorElAss, setAnchorElAss] = useState(new Map());


    function MenuButton(){
        
          let assemblyLists = [];
          assemblyLists.push(
            <>
            <Button  variant="outlined" style={{textTransform:"none"}}>
              Выбрать
            </Button>
            <Menu open={open}>
              {MenuButtonItems(props.json)}
            </Menu>
            </>
          )
        
      }

    function handleclickbutton(){
      setOpen(!open)
    }
    function isEmptyObject(obj:any) {
      for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
              return false;
          }
      }
      return true;
      
  }
    
    function MenuButtonItems(SectionList:any){
      if (isEmptyObject(props.json)) {
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
            mainCollapseID = ID;
            openSet = data2.get(ID);
            openSetID = ID;
            assemblyLists.push(
              <Grid key={key}>
                  <MenuItem>
                    {Name}
                  </MenuItem>
              </Grid>
            );
          } else if (currentDeep !== null) {
            
          }
  
  
        }
        return assemblyLists;
      }
      
    }

      return(
          <>
          <Button  variant="outlined" style={{textTransform:"none"}}>
              Выбрать
            </Button>
            <Menu open={open}>
              {MenuButtonItems(props.json)}
            </Menu>
          </>
      )
}