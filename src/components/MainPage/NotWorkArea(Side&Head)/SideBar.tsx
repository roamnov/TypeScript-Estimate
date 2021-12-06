import  {  useCallback, useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import axios from "axios";
import URL from "../../Url";
import { ImgURL } from "../../Url";
import { Box, Drawer, Slide, Toolbar } from "@material-ui/core";
import { useStyles } from "../../Styles";
import { MainBoxBackClick,InfoAboutClick } from "../../ComponentInterface";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const defaultDrawerWidth = window.innerWidth/100 * 16.791045;
const minDrawerWidth = 1;
const maxDrawerWidth = 400;
//alert( window.innerWidth ); 




export default function SideBar(props: MainBoxBackClick) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [drawerOpen, setdrawerOpen] = useState(true)
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<InfoAboutClick | undefined> ();
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

  const drawerClick =() => {
    setdrawerOpen(!drawerOpen)
    drawerOpen ? setDrawerWidth(8) : setDrawerWidth( defaultDrawerWidth)
  }

  const handleClick = (event: any) => {
    setOpen(!open);
  
    let ID = event.currentTarget.getAttribute("id");
    setData2(data2.set(ID, !data2.get(event.currentTarget.getAttribute("id"))));    
  };

  const updateSelected = (event: any) => {

    let ID = event.currentTarget.getAttribute("id");
    let CLSID  = GetElementAttributeByID(ID, data, "CLSID")
    let Name = event.currentTarget["innerText"]

    props.setSelected( {id: ID, clsic: CLSID, name: Name})  
  };



  //useEffect(()=>props.setSelected(selected),[selected] )
  useEffect(() => {
    getSectionList();
  }, []);

  const getSectionList= async ()=> {
    let params = new Map();
    params.set('comand','GetSectionList');
    params.set('Simple','1');
    params.set('full','1');
    await axios.get(URL(params)).then((response) => {
      console.log(response.data)
      setData(response.data["Sections"]);
      ListItems(response.data["Sections"]);
      props.isLoading(false);
    });
  }

  function ListItems(List: any) {
    if(data.length!== undefined){
    let ID,
      keyS = 0;
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

  function GetElementAttributeByID(CurrnetID: string, List: any,Attribute:string) {
    let backvalue;
    List.filter((Elements: any) => {
      if (Elements["ID"] == CurrnetID) return (backvalue = Elements[Attribute]);
    });
    return backvalue;
  }



  function  Menu(SectionList: any) {
    // фцнкция отрисовки меню
    if(data.length!== undefined){
        
        
      let Name, ID, currentDeep, openSet, openSetDeep, mainCollapse, deepCollapse, Img, keyS = 0, howDeep = 4
      let assemblyLists = []; //сюда записываем все секции а потом отправляем на отрисовку

      
        for (const [key, value] of Object.entries(SectionList)) {
          //ходим по всему объекту
          Name = SectionList[key]["Name"];
          ID = SectionList[key]["ID"];
          currentDeep = SectionList[key]["Deep"];
          //Img = ImgURL(SectionList[key]["Image"]);

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
          } else if (currentDeep !== null) {
            //если есть DEEP
            howDeep = 4;

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
            if (
              SectionList[keyS] !== undefined &&
              SectionList[keyS]["Deep"] > currentDeep
            ) {
              //если ключ НЕ необъявен и след deep больше текущего, то рисуем родителя

              currentDeep == "2"  ? (deepCollapse = openSet): (deepCollapse = undefined);
              openSetDeep = openSet;
              assemblyLists.push(
                <Collapse    in={openSet && mainCollapse}    timeout="auto" unmountOnExit >
                  {(openSet = data2.get(ID))}
                  <ListItemButton sx={{ pl: howDeep }} id={ID} >
                    <ListItemIcon>{Img}</ListItemIcon>
                    <ListItemText primary={Name} />
                    {openSet ? ( <ExpandLess id={ID} onClick={handleClick} /> ) : (<ExpandMore id={ID} onClick={handleClick} />)}
                  </ListItemButton>
                </Collapse>
              );
            } else {
              assemblyLists.push(
                <Collapse
                  in={ openSet && mainCollapse && currentDeep == "3" ? deepCollapse: openSet && mainCollapse    }
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding >
                    <ListItemButton sx={{ pl: howDeep }}   id={ID} onClick={updateSelected}>
                      <ListItemIcon>{Img}</ListItemIcon>
                      <ListItemText primary={Name} />
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
  let buttonDragger = (<div  className={classes.buttonDragger} >{drawerOpen ? ( <ArrowLeftIcon style={{fontSize: "1rem"}} id={"01001"} onClick={drawerClick} /> ) : (<ArrowRightIcon style={{fontSize: "1rem"}}  id={"01001"} onClick={drawerClick} />)} </div>)
  return (
 
    <Drawer
    
      className={classes.drawer}
      variant="permanent"
      PaperProps={{ style: { width: drawerWidth,  } }}
      sx={{ml: drawerWidth/100*11.9444444444444444}}
      style={{ overflowX: "hidden"}}
      >
       
      <div onMouseDown={e => handleMouseDown()} className={classes.dragger} >
            {buttonDragger}
      </div>
     
   
      <Toolbar />
        <Box sx={{ overflow: "auto" }}>
      <Slide direction="right" in={drawerOpen}> 
      <List
        sx={{
          width: "100%",
          
          bgcolor: "background.paper",
          marginTop: 1,
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {Menu(data)}
      </List>
      </Slide>
    </Box>
    
    </Drawer>
    
  );
}
