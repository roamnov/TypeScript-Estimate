import {  useState } from "react";
import { NestedMenuItem } from "../Tools/NestedMenuOrigin/NestedMenuItem"
import { Button, Grid, IconButton, TextField, Menu, MenuItem, Tooltip, ListItemIcon, Typography } from "@mui/material"
import { ImgURL, get_cookie } from "../../Url";
import { XMLrequest } from "../../Url";

export default function SideBarButton(props){
    // const [open, setOpen] = useState(false);
    const [drawerOpen, setdrawerOpen] = useState(true)
    const [data, setData] = useState(undefined);
    const [selected, setSelected] = useState(get_cookie("CurrentSecID"));
    const [data2, setData2] = useState(new Map());
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      if(data=== undefined){ 
        let params = new Map(), json;
        params.set('comand', 'GetSectionList');
        params.set('Simple', '0');
        params.set('full', '1');
        params.set(`png`, `1`);
        json = XMLrequest(params)
        setData(json["Sections"]);
      }
      
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


    function MenuButton(SectionList){
      if (SectionList !== undefined) {
        let Name, ID, Img, mainCollapseID, openSetID
        let assemblyLists = [];
        for (const [key, value] of Object.entries(SectionList)) {
          Name = SectionList[key]["Name"];
          ID = SectionList[key]["ID"];
          // currentDeep = SectionList[key]["Deep"];
          Img = ImgURL(SectionList[key]["Image"], "32px", "32px");
          // Img = ImgBASE64(SectionList[key]["RCDATA"]);
          // keyS += 1;
          //   mainCollapse = data2.get(ID);
          //   mainCollapseID = ID;
          //   openSet = data2.get(ID);
          //   openSetID = ID;
            console.log(value["Sections"])
            if(value["Sections"]!== undefined){
            assemblyLists.push(
              <Grid key={key}>
                  <NestedMenuItem leftIcon={Img} label={Name} parentMenuOpen={true}>
                    {MenuButtonItems(value["Sections"])}
                  </NestedMenuItem>
              </Grid>
            );
            }else{
              assemblyLists.push(
              <Grid  key={key}>
                  <MenuItem style={{paddingLeft: "4px"}}>
                    <Grid>
                      {Img}
                    </Grid>
                    <Typography variant="body1" sx={{pl:1,pd:1}}>
                      {Name}
                    </Typography>
                  </MenuItem>
              </Grid>)
            }
          
        }
        return assemblyLists;
      }
    }  
    
    function MenuButtonItems(SectionList){
      

        let Name, ID, currentDeep, openSet,  Img
        let assemblyLists = [];
        for (const [key, value] of Object.entries(SectionList)) {
          Name = SectionList[key]["Name"];
          ID = SectionList[key]["ID"];
          currentDeep = SectionList[key]["Deep"];
          Img = ImgURL(SectionList[key]["Image"], "32px", "32px");
          //Img = ImgBASE64(SectionList[key]["RCDATA"]);
          // keyS += 1;
          //если ключ НЕ необъявен и след deep больше текущего, то рисуем родителя
          // openSetDeep = openSet;
          if(value["Sections"]!== undefined){
            assemblyLists.push(
              <Grid key={key}>
                  <NestedMenuItem leftIcon={Img} label={Name} parentMenuOpen={true}>
                    {MenuButtonItems(value["Sections"])}
                  </NestedMenuItem>
              </Grid>
            );
            }else{
              assemblyLists.push(
              <Grid  key={key}>
                  <MenuItem style={{paddingLeft: "4px"}}>
                    <Grid>
                      {Img}
                    </Grid>
                    <Typography variant="body1"  sx={{pl:1,pd:1}}>
                      {Name}
                    </Typography>
                  </MenuItem>
              </Grid>)
            }
        }
        return assemblyLists;
      
      
    }

      return(
          <Grid >
          <Button size="small" onClick={handleClick} variant="text" style={{textTransform:"none", color:"white"}}>
              Выбрать
            </Button>
            <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
              {MenuButton(data)}
            </Menu>
          </Grid>
      )
}