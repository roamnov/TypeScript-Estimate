//GET /config~GetWorkPlaceTools?LicGUID=6AE4B0E34E97A2392311FD9F28A52A66  &SectionID=143 
import { Grid } from "@mui/material"
import {useEffect, useState} from "react"
import { XMLrequest } from "../../Url";
import { Button, Menu, MenuItem } from "@mui/material";
import { NestedMenuItem } from "./NestedMenuOrigin/NestedMenuItem";
import LongMenu from "./dsad";

const ITEM_HEIGHT = 48;

export function WorkPlaceTools (){
    const [dataButtonsDefault, setDataButtonsDefault] = useState();
    const [open1, setOpen1] = useState(false);
    const [menuBarDefault, setMenuBarDefault] = useState();
    const [ID, setID] = useState();
    const [AssMass, setAssMass] = useState(new Map());
    const [anchorElAss, setAnchorElAss] = useState(new Map());

    useEffect(() => {
       GetWorkPlaceTools();
    }, []);

    
    const handleClick = (event) =>{
        setOpen1(!open1)
        const id =event.currentTarget.getAttribute("id");
        setAssMass(AssMass.set(id,true));
        setAnchorElAss(anchorElAss.set(id,event.currentTarget));
        setID(id);        
    }

    const handleClose = (event) => {
        setOpen1(!open1)
        const id = event.currentTarget.getAttribute("id")
        setAssMass(AssMass.set(ID,false))
        setAnchorElAss(anchorElAss.set(ID,null));
    };


    const GetWorkPlaceTools = ( ) =>{
        let params = new Map, json;
        params.set('prefix','config'); 
        params.set('comand','GetWorkPlaceTools');
        json = XMLrequest(params)
        console.log(json["Buttons"]);
        setDataButtonsDefault(json["Buttons"]);
        setMenuBarDefault(json["MenuBar"]);
        CreateMap(json["MenuBar"]);
        //Rec(json["MenuBar"]);
    } 
    
    function CreateMap(List){
        for (const [key, value] of Object.entries(List)) {
            setAnchorElAss(anchorElAss.set(key,null));
            setAssMass(AssMass.set(key,false));
            
        }
    }


    function RecItems(jsonItems, CurrentID ){
        
        if ( jsonItems !== undefined){
            let DeepFirst, Token, keyS= 0, ArrItems, openSet;
            let assemblyLists = [];

            for (const [key, value] of Object.entries(jsonItems)) {
                //console.log(value)
                keyS = Number(key)+ 1;
                Token = jsonItems[key]["Token"];
                DeepFirst = value;
                
                ArrItems = Object.keys(DeepFirst);
                if (ArrItems[1]=== "Token"){//это то что будет внутри item
                    assemblyLists.push(
                        <Grid key={key}>
                            <MenuItem  onClick={handleClose} >
                            {key}
                            </MenuItem>  
                        </Grid>
                        
                    )
                    
                }else{// это item который будет распахиваться
                    openSet = AssMass.get(CurrentID);
                    assemblyLists.push(
                        <Grid key={key}>
                            <NestedMenuItem   onClick={handleClose} label={key}  parentMenuOpen={openSet}  >
                                {RecItems(DeepFirst, CurrentID)}  
                            </NestedMenuItem>
                        </Grid>
                        
                    )
                    
                }
            }
            return assemblyLists 
        }
    }


    
    function Rec(jsonItems){
        //console.log(AssMass)
        if ( jsonItems !== undefined){
            let DeepFirst, Token, keyS= 0, ArrItems, openSet, anchorElset;
            let assemblyLists = [];

            for (const [key, value] of Object.entries(jsonItems)) {
                //console.log(value)
                keyS = Number(key)+ 1;
                Token = jsonItems[key]["Token"];
                DeepFirst = value;
               
                ArrItems = Object.keys(DeepFirst);
                //console.log(Object.keys(jsonItems))
                //console.log(value)

                if (ArrItems[1]=== "Token"){//это то что будет внутри item
                    
                }else{// это item который будет распахиваться
                    openSet = AssMass.get(key);
                    anchorElset = anchorElAss.get(key);
                    assemblyLists.push(
                        <Grid item  key={key}>
                            <Button id={key} onClick={handleClick}>
                                {key}
                            </Button>
                            <Menu id={key} anchorEl={anchorElset} open={openSet} onClose={handleClose} >
                                    {RecItems(DeepFirst, key)}
                            </Menu>
                        </Grid>
                    )
                }
            }
            return assemblyLists 
        }
    }

    


    

    return(
        <Grid item>
            
            <Grid container  direction="row"  justifyContent="flex-start" alignItems="center" >
                {Rec(menuBarDefault)}
            </Grid>
        </Grid>
    )
}