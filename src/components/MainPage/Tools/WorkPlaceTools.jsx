//GET /config~GetWorkPlaceTools?LicGUID=6AE4B0E34E97A2392311FD9F28A52A66  &SectionID=143 
import { Grid } from "@mui/material"
import {useEffect, useState} from "react"
import { XMLrequest } from "../../Url";
import { Button, Menu, MenuItem } from "@mui/material";
import App from "./nest";
import NestedMenu from "./NestedMenu.jsx";
import { NestedMenuItem } from "./NestedMenuOrigin/NestedMenuItem";



export function WorkPlaceTools (){
    const [dataButtons, setDataButtons] = useState();
    const [menuBar, setMenuBar] = useState();
    const [MenuJSX,setMenuJSX] = useState([<></>]);
    const [AssMass, setAssMass] = useState(new Map());
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
       GetWorkPlaceTools();
    }, []);

    
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);


    const GetWorkPlaceTools = ( ) =>{
        let params = new Map, json;
        params.set('prefix','config'); 
        params.set('comand','GetWorkPlaceTools');
        json = XMLrequest(params)
        console.log(json["MenuBar"]);
        setDataButtons(json["Buttons"]);
        setMenuBar(json["MenuBar"]);
        //CreateMap(json["MenuBar"]);
        //Rec(json["MenuBar"]);
        //console.log(["array", "arrrsas",["asd"]])
    } 



    function RecItems(jsonItems){
        
        if ( jsonItems !== undefined){
            let DeepFirst, Token, keyS= 0, ArrItems;
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
                    assemblyLists.push(
                        <Grid key={key}>
                            <NestedMenuItem   onClick={handleClose} label={key}  parentMenuOpen={open}  >
                                {RecItems(DeepFirst)}  
                            </NestedMenuItem>
                        </Grid>
                        
                    )
                    
                }
            }
            return assemblyLists 
        }
    }


    
    function Rec(jsonItems){
        
        if ( jsonItems !== undefined){
            let DeepFirst, Token, keyS= 0, ArrItems;
            let assemblyLists = [];

            for (const [key, value] of Object.entries(jsonItems)) {
                //console.log(value)
                keyS = Number(key)+ 1;
                Token = jsonItems[key]["Token"];
                DeepFirst = value;
               
                ArrItems = Object.keys(DeepFirst);
                //console.log(Object.keys(jsonItems))
                console.log(value)

                if (ArrItems[1]=== "Token"){//это то что будет внутри item
                    
                }else{// это item который будет распахиваться
                    assemblyLists.push(
                        <Grid item  key={key}>
                            <Button  onClick={handleClick}>
                                {key}
                            </Button>
                            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                                    {RecItems(DeepFirst)}
                            </Menu>
                        </Grid>
                    )
                }
            }
            return assemblyLists 
        }
    }

    


    const BuildNestedMenu = ()=>{
       
    }

    return(
        <Grid item>
            <Grid container  direction="row"  justifyContent="flex-start" alignItems="center" >
                {Rec(menuBar)}
            </Grid>
        </Grid>
    )
}