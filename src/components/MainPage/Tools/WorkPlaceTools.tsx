//GET /config~GetWorkPlaceTools?LicGUID=6AE4B0E34E97A2392311FD9F28A52A66  &SectionID=143 
import { Grid } from "@mui/material"
import {useEffect, useState} from "react"
import { XMLrequest } from "../../Url";
import { Button, Menu, MenuItem } from "@mui/material";
import App from "./nest";
import NestedMenu from "./NestedMenu.jsx";



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

    
    const handleClick = (event:any) => setAnchorEl(event.currentTarget);
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



    
    function Rec(jsonItems:any){
        
        if ( jsonItems !== undefined){
            let DeepFirst:any, Token, keyS= 0, ArrItems;
            let assemblyLists = [];

            for (const [key, value] of Object.entries(jsonItems)) {
                //console.log(value)
                keyS = Number(key)+ 1;
                Token = jsonItems[key]["Token"];
                DeepFirst = value;
                console.log(key)
                ArrItems = Object.keys(DeepFirst);
                if (ArrItems[1]=== "Token"){
                    
                }
                
            if (Token === undefined){
                Rec(DeepFirst);
            }else{
                //console.log(key)
            }
            }
            return <>a</> 
        }
               
        // Object.keys(jsonItems).map((key, index, stas)=>{
        //     console.log(stas)
        // })
    }

    


    const BuildNestedMenu = ()=>{
       
    }

    return(
        <Grid>
            <NestedMenu/>
            {/*
            
            <App/>
            
            
            */}
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {Rec(menuBar)}
            </Menu>
        </Grid>
    )
}