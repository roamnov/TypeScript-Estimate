import { useCallback, useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import URL, { CreateCokies, get_cookie, ImgBASE64, XMLrequest } from "../../Url";
import { ImgURL } from "../../Url";
import { Box, Drawer, Slide, Toolbar } from "@material-ui/core";
import { useStyles } from "../../Styles";
import { MainBoxBackClick, InfoAboutClick } from "../../ComponentInterface";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { styled } from '@mui/material/styles';
import { Button, Grid, IconButton, ListItem, ListItemSecondaryAction, Menu, Typography } from "@mui/material";
import {SetStateNav} from './HiddenNav'
import SideBarButton from "./SideBarButton";
import ReactDOM from "react-dom";
const defaultDrawerWidth = window.innerWidth / 100 * 16.791045;
const minDrawerWidth = 1;
const maxDrawerWidth = 400;
//alert( window.innerWidth ); 

const StyledList = styled(List)({
  // selected and (selected + hover) states
  '&& .Mui-selected, && .Mui-selected:hover': {
    backgroundColor: "#3d5b75"
  },
  "&.MuiListItemSecondaryAction-root":{
      top: "48%",
      right: "92%"
      
  }
  // hover states
  // '& .MuiListItemButton-root:hover': {
  //   backgroundColor: 'orange',
  //   '&, & .MuiListItemIcon-root': {
  //     color: 'yellow',
  //   },
  // },
});


export default function SideBar(props: MainBoxBackClick) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [drawerOpen, setdrawerOpen] = useState(true)
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(get_cookie("CurrentSecID"));
  const [selectedButton, setSelectedButton] = useState(undefined);
  const [data2, setData2] = useState(new Map());
  const [drawerWidth, setDrawerWidth] = useState(defaultDrawerWidth);
  const [FirstLoad, setFirstLoad]= useState(true);
  const [anchorElAss, setAnchorElAss] = useState(new Map());
  const [openButton, setOpenButton] = useState(false);
  let e = 0;//event 

  useEffect(()=>{
   /* let state = { 
      state: 
       {
        id: selectedButton ? selectedButton["ID"] : "", 
        clsic: selectedButton ? selectedButton["CLSID"] :"", 
        name: selectedButton ? selectedButton["Name"] : ""
       }
    }*/
    if(selectedButton !== undefined){
      updateSelected(selectedButton)  
    }
  },[selectedButton])


  useEffect(()=>{
    let selected = get_cookie("CurrentSec").split(",");
    props.setSelected({ id: selected[0], clsic: selected[1], name: selected[2] })      
  },[])

  useEffect(() => {
    getSectionList();
  }, []);

  const handleMouseDown = () => {
    document.addEventListener("mouseup", handleMouseUp, true);
    document.addEventListener("mousemove", handleMouseMove, true);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mouseup", handleMouseUp, true);
    document.removeEventListener("mousemove", handleMouseMove, true);
  };

  const handleMouseMove = useCallback(e => {
    const newWidth = e.clientX - document.body.offsetLeft;
    if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
      setDrawerWidth(newWidth);
    }
  }, []);

  const drawerClick = () => {
    setdrawerOpen(!drawerOpen)
    drawerOpen ? setDrawerWidth(8) : setDrawerWidth(defaultDrawerWidth)
    let nav = document.getElementById("HiddenNav");
    if (!drawerOpen)
    {
          nav ? nav.style.display = "none": document.getElementById("HiddenNav")
    }
    else
    nav ? nav.style.display = "block": document.getElementById("HiddenNav")
  }

  const handleClick = (event: any) => {
    setOpen(!open);

    let ID = event.currentTarget.getAttribute("id");
    setData2(data2.set(ID, !data2.get(event.currentTarget.getAttribute("id"))));
    
  };

  const updateSelected = (event: any) => {
    let ID, CLSID, Name, Patch, img
   
    if (event.title){
      ID = event.id;
      CLSID = event.CLSID
      Name = event.title
      Patch = event.Patch
    }else if (!event.state) {
      let el = event.currentTarget;
      if (!el)
      el = event.target.parentNode
      ID = el.getAttribute("id");
      CLSID = GetElementAttributeByID(ID, data, "CLSID")
      Name = el["innerText"]
      Patch = el["title"]? el["title"]+'/'+ Name:Name
      img = el.querySelector("img").src
      let dataState = {
        id: ID,
        title: Name,
        CLSID: CLSID,
        Patch: Patch,
        img: img        
      };
      window.history.pushState(dataState, Patch);
      document.title = Patch;
      SetStateNav(dataState, updateSelected)
    }
    else {
      ID = event.state.id;
      CLSID = event.state.CLSID
      if (event.state.title)
      Name = event.state.title
      else
      {Name = event.state.name
        
      }

    }

    setSelected(ID);
    CreateCokies("CurrentSecID", ID );
    CreateCokies("CurrentSec", ID+","+ CLSID+","+ Name );
    
    let NameSection = document.getElementById("NameSection");
    NameSection ? NameSection.innerText = Name : NameSection = document.createElement("div")
    props.setSelected({ id: ID, clsic: CLSID, name: Name })
  };



  //useEffect(()=>props.setSelected(selected),[selected] )
  

  
  const getSectionList = async () => {
    let params = new Map(), json;
    params.set('comand', 'GetSectionList');
    params.set('Simple', '1');
    params.set('full', '1');
    params.set(`png`, `1`);
    json = XMLrequest(params)
    setData(json["Sections"]);
    ListItems(json["Sections"]);
    props.isLoading(false);


  }

  function ListItems(List: any) {
    if (data.length !== undefined) {
      let ID, keyS = 0;
      for (const [key, value] of Object.entries(List)) {
        keyS += 1;
        ID = List[key]["ID"];

        if (List[key]["Deep"] == null) {
          setData2(data2.set(ID, false));
        }
        if (List[keyS] !== undefined && List[keyS]["Deep"] > List[key]["Deep"]) {
          setData2(data2.set(ID, false));
        }
      }
    }
  }

  function GetElementAttributeByID(CurrnetID: string, List: any, Attribute: string) {
    let backvalue;
    List.filter((Elements: any) => {
      if (Elements["ID"] == CurrnetID) return (backvalue = Elements[Attribute]);
    });
    return backvalue;
  }

 
  


  function MenuList(SectionList: any) {
    // фцнкция отрисовки меню
    if (data.length !== undefined) {


      let Name, ID, currentDeep, openSet, openSetDeep, mainCollapse, deepCollapse, Img, keyS = 0, howDeep = 4, mainCollapseID, openSetID, deepCollapseID, leftP
      let assemblyLists = []; //сюда записываем все секции а потом отправляем на отрисовку


      for (const [key, value] of Object.entries(SectionList)) {
        //ходим по всему объекту
        Name = SectionList[key]["Name"];
        ID = SectionList[key]["ID"];
        currentDeep = SectionList[key]["Deep"];
        Img = ImgURL(SectionList[key]["Image"], "32px", "32px");
        //Img = ImgBASE64(SectionList[key]["RCDATA"]);
        keyS += 1;

        if(ID === selected && FirstLoad === true){
          data2.set(mainCollapseID, true);
          if(currentDeep === "2" || currentDeep === "3" ){
            data2.set(openSetID, true);
            if(currentDeep === "3"){
              data2.set(deepCollapseID, true);
            }
          }
          setFirstLoad(false)
        }
        

        if (currentDeep == null) {
          //если нет DEEP то отрисовываем родителя
          mainCollapse = data2.get(ID);
          mainCollapseID = ID;
          openSet = data2.get(ID);
          openSetID = ID;
          assemblyLists.push(
            <ListItem id={ID} disablePadding  key={ID} style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, display:"inherit" }} sx={{ "& .Mui-selected": { backgroundColor: "rgb(35, 114, 191)" }, "& .MuiListItemSecondaryAction-root":{ right:"auto", left: "0%" } }} selected={selected === ID} 
            
            secondaryAction={
           
                <IconButton id={ID} onClick={handleClick} style={{width:25, height:25}}>
                  {SectionList[keyS] !== undefined && SectionList[keyS]["Deep"] >= 1 ? (openSet ? (<ExpandLess fontSize="small" />) : (<ExpandMore fontSize="small" />)) : (<></>)}
                </IconButton>
             
            }  >
              
              <ListItemButton style={{paddingRight:0}} className={classes.colorList} key={ID} component="li" id={ID} onClick={updateSelected}>
                <ListItemIcon style={{minWidth:"0px", paddingRight:"10px", paddingLeft:10}}>{Img}</ListItemIcon>
                <ListItemText  style={{ color: "white"  }}  primary={<Typography variant="body1" style={{ fontSize:"0.875rem", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", width: "99.9%" }}>{Name}</Typography>} />

              </ListItemButton>
              
            </ListItem>
          );
        } else if (currentDeep !== null) {
          //если есть DEEP
          howDeep = 4;
          
          switch (
          currentDeep //Определяем сколько сдвинуть направо отностиельно родителя
          ) {
            case "1":
              openSet = mainCollapse;
              howDeep += 2 
              leftP = 19
              break;
            case "2":
              howDeep +=4;
              leftP = "12%"
              break;
            case "3":
              howDeep += 6;
              break;
          }
          
          if (SectionList[keyS] !== undefined && SectionList[keyS]["Deep"] > currentDeep) {
            //если ключ НЕ необъявен и след deep больше текущего, то рисуем родителя

            currentDeep == "2" ? (deepCollapse = openSet) : (deepCollapse = undefined);
            currentDeep == "2" ? (deepCollapseID = openSetID) : (deepCollapseID = "0");
            openSetDeep = openSet;
            assemblyLists.push(
              <Collapse key={ID} in={openSet && mainCollapse} timeout="auto" unmountOnExit >
                {(openSet = data2.get(ID))}
               
                <ListItem key={ID} style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, display:"inherit" }} sx={{"& .MuiListItemSecondaryAction-root":{ right:"auto", left: leftP } }} secondaryAction={
                  <IconButton id={ID} onClick={handleClick} style={{width:25, height:25}}>
                    {openSet ? (<ExpandLess fontSize="small"/>) : (<ExpandMore fontSize="small"/>)}
                </IconButton>
                }>
                  <ListItemButton style={{paddingRight:0}} className={classes.colorList} key={ID} sx={{ pl: howDeep, "& .Mui-selected": { backgroundColor: "rgb(35, 114, 191)" } }} id={ID} selected={selected === ID} onClick={updateSelected}>
                    <ListItemIcon>{Img}</ListItemIcon>
                    <ListItemText  style={{ color: "white"  }}  primary={<Typography noWrap variant="body1" style={{ fontSize:"0.875rem", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", width: "99.9%" }}>{Name}</Typography>} />

                  </ListItemButton>
                  
                </ListItem>
              </Collapse>
            );
            openSetID = ID;
            
        
            
          } else {
            assemblyLists.push(
              <Collapse
                key={ID}
                in={openSet && mainCollapse && currentDeep == "3" ? deepCollapse : openSet && mainCollapse}
                timeout="auto"
                unmountOnExit
              >
                <List key={ID} component="div" disablePadding >
                  <ListItemButton className={classes.colorList} key={ID} sx={{ pl: howDeep, "& .Mui-selected": { backgroundColor: "rgb(35, 114, 191)" } }} selected={selected === ID} id={ID} onClick={updateSelected} >
                    <ListItemIcon>{Img}</ListItemIcon>
                    <ListItemText  style={{ color: "white"  }}  primary={<Typography variant="body1"  style={{ fontSize:"0.875rem", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", width: "99.9%" }}>{Name}</Typography>} />

                  </ListItemButton>
                </List>
              </Collapse>
            );
          }
        }
      }
      
     
      setTimeout(() => {
        ReactDOM.render(<SideBarButton setSelected={setSelectedButton}/>,document.getElementById('HiddenNav'))
      }, 1000);
      
      return assemblyLists;
      
    }
  }
  let buttonDragger = (<div className={classes.buttonDragger} >{drawerOpen ? (<ArrowLeftIcon style={{ fontSize: "1rem" }} id={"01001"} onClick={drawerClick} />) : (<ArrowRightIcon style={{ fontSize: "1rem" }} id={"01001"} onClick={drawerClick} />)} </div>)
  window.onpopstate = updateSelected;
  return (
    <>
    
      <Box style={{ scrollbarWidth: "none" }} sx={{ overflow: "auto" }}>
          
          <StyledList
            sx={{
              width: "100%",
              bgcolor: '#628cb6',
              marginTop: 1,
            }}
            style={{ scrollbarWidth: "none" }}
            aria-labelledby="nested-list-subheader"
          >
            {MenuList(data)}
          </StyledList>
        
      </Box>

    </>

  );
}