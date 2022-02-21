import { useCallback, useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import URL, { ImgBASE64, XMLrequest } from "../../Url";
import { ImgURL } from "../../Url";
import { Box, Drawer, Slide, Toolbar } from "@material-ui/core";
import { useStyles } from "../../Styles";
import { MainBoxBackClick, InfoAboutClick } from "../../ComponentInterface";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { styled } from '@mui/material/styles';
import { IconButton, ListItem } from "@mui/material";
import {SetStateNav} from './HiddenNav'

const defaultDrawerWidth = window.innerWidth / 100 * 16.791045;
const minDrawerWidth = 1;
const maxDrawerWidth = 400;
//alert( window.innerWidth ); 

const StyledList = styled(List)({
  // selected and (selected + hover) states
  '&& .Mui-selected, && .Mui-selected:hover': {
    backgroundColor: "#3d5b75"
  },
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
  const [selected, setSelected] = useState("");
  const [data2, setData2] = useState(new Map());
  const [drawerWidth, setDrawerWidth] = useState(defaultDrawerWidth);
  let e = 0;//event 



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
    props.setdrawerOpen(!drawerOpen);
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
    let ID
    let CLSID
    let Name
    let Patch
    let img
    if (event.title)
    {
      ID = event.id;
      CLSID = event.CLSID
      Name = event.title
      Patch = event.Patch
    }
    else
    if (!event.state) {
      ID = event.currentTarget.getAttribute("id");
      CLSID = GetElementAttributeByID(ID, data, "CLSID")
      Name = event.currentTarget["innerText"]
      Patch = event.currentTarget["title"]? event.currentTarget["title"]+'/'+ Name:Name
      img = event.currentTarget.querySelector("img").src
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
      Name = event.state.title
    }

    setSelected(ID);
    props.setSelected({ id: ID, clsic: CLSID, name: Name })
  };



  //useEffect(()=>props.setSelected(selected),[selected] )
  useEffect(() => {
    getSectionList();
  }, []);


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

  function FindParent(id: any, SectionList: any) {
    let partSectionList = SectionList.slice(0, Number(id)+1);
    partSectionList = partSectionList.reverse();
    let Name = new Array;
    let currentDeep, tDeep, Deep
    Deep = partSectionList[0]["Deep"]
    
    for (let i = 1; i<= partSectionList.length - 1; i = i+1)
    {
      if (partSectionList[i]["Deep"])
      {
        if (Number(Deep) - Number(partSectionList[i]["Deep"]) == 1)
        {
          Name.push(partSectionList[i]["Name"]);
          Deep = partSectionList[i]["Deep"];
        }
      }
      else
      {
        Name.push(partSectionList[i]["Name"]);
        break;
      }
    }
    Name = Name.reverse();
    let p = Name.toString()
    p = p.replace(",", "/")
    return p
  }

  function Menu(SectionList: any) {
    let patch
    // фцнкция отрисовки меню
    if (data.length !== undefined) {
      let Name, ID, currentDeep, openSet, openSetDeep, mainCollapse, deepCollapse, Img, keyS = 0, howDeep = 4
      let assemblyLists = []; //сюда записываем все секции а потом отправляем на отрисовку


      for (const [key, value] of Object.entries(SectionList)) {
        //ходим по всему объекту
        Name = SectionList[key]["Name"];
        ID = SectionList[key]["ID"];
        currentDeep = SectionList[key]["Deep"];
        Img = ImgURL(SectionList[key]["Image"], "32px", "32px");
        //Img = ImgBASE64(SectionList[key]["RCDATA"]);
        keyS += 1;

        if (currentDeep == null) {
          //если нет DEEP то отрисовываем родителя
          mainCollapse = data2.get(ID);
          openSet = data2.get(ID);
          assemblyLists.push(
            <ListItem key={ID} style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 0 }} sx={{ "& .Mui-selected": { backgroundColor: "rgb(35, 114, 191)" } }} selected={selected === ID}>
              <ListItemButton className={classes.colorList} key={ID} component="li" id={ID} onClick={updateSelected}>
                <ListItemIcon>{Img}</ListItemIcon>
                <ListItemText primary={Name} style={{ color: "white" }} />
              </ListItemButton>
              <IconButton id={ID} onClick={handleClick} >
                {SectionList[keyS] !== undefined && SectionList[keyS]["Deep"] >= 1 ? (openSet ? (<ExpandLess />) : (<ExpandMore />)) : (<></>)}
              </IconButton>
            </ListItem>
          );
        } else if (currentDeep !== null) {
          //если есть DEEP
          howDeep = 4;
          patch = FindParent(key, SectionList);
          switch (
          currentDeep //Определяем сколько сдвинуть направо отностиельно родителя
          ) {
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
          if (SectionList[keyS] !== undefined && SectionList[keyS]["Deep"] > currentDeep) {
            //если ключ НЕ необъявен и след deep больше текущего, то рисуем родителя

            currentDeep == "2" ? (deepCollapse = openSet) : (deepCollapse = undefined);
            openSetDeep = openSet;
            assemblyLists.push(
              <Collapse key={ID} in={openSet && mainCollapse} timeout="auto" unmountOnExit >
                {(openSet = data2.get(ID))}
                <ListItem key={ID} style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 0 }}>
                  <ListItemButton className={classes.colorList} key={ID} sx={{ pl: howDeep, "& .Mui-selected": { backgroundColor: "rgb(35, 114, 191)" } }} id={ID} selected={selected === ID} >
                    <ListItemIcon>{Img}</ListItemIcon>
                    <ListItemText primary={Name} style={{ color: "white" }} />
                  </ListItemButton>
                  <IconButton id={ID} onClick={handleClick} >
                    {openSet ? (<ExpandLess />) : (<ExpandMore />)}
                  </IconButton>
                </ListItem>
              </Collapse>
            );
          } else {
            assemblyLists.push(
              <Collapse
                key={ID}
                in={openSet && mainCollapse && currentDeep == "3" ? deepCollapse : openSet && mainCollapse}
                timeout="auto"
                unmountOnExit
              >
                <List key={ID} component="div" disablePadding >
                  <ListItemButton className={classes.colorList} key={ID} sx={{ pl: howDeep, "& .Mui-selected": { backgroundColor: "rgb(35, 114, 191)" } }}  selected={selected === ID} id={ID} onClick={updateSelected} title = {patch}>
                    <ListItemIcon>{Img}</ListItemIcon>
                    <ListItemText primary={Name} style={{ color: "white" }} />
                  </ListItemButton>
                </List>
              </Collapse>
            );
          }
        }
      }
      return assemblyLists;
    }
  }
  let buttonDragger = (<div className={classes.buttonDragger} >{drawerOpen ? (<ArrowLeftIcon style={{ fontSize: "1rem" }} id={"01001"} onClick={drawerClick} />) : (<ArrowRightIcon style={{ fontSize: "1rem" }} id={"01001"} onClick={drawerClick} />)} </div>)
  window.onpopstate = updateSelected;
  return (

    <Drawer

      className={classes.drawer}
      variant="permanent"
      PaperProps={{ style: { width: drawerWidth, backgroundColor: '#628cb6' } }}
      sx={{ ml: drawerWidth / 100 * 11.9444444444444444 }}
      style={{ overflowX: "hidden", scrollbarWidth: "none" }}
    >
      <Toolbar />
      <div onMouseDown={e => handleMouseDown()} className={classes.dragger} >
        {buttonDragger}
      </div>



      <Box style={{ scrollbarWidth: "none" }} sx={{ overflow: "auto" }}>
        <Slide direction="right" in={drawerOpen} >
          <StyledList
            sx={{
              width: "100%",
              bgcolor: '#628cb6',
              marginTop: 1,
            }}
            style={{ scrollbarWidth: "none" }}
            aria-labelledby="nested-list-subheader"
            
          >
            {Menu(data)}
          </StyledList>
        </Slide>
      </Box>

    </Drawer>

  );
}
