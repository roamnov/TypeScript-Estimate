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
    useEffect(() => {
        GetWorkPlaceTools();
    }, []);

    
    const GetWorkPlaceTools = ( ) =>{
        let params = new Map, json;
        params.set('prefix','config'); 
        params.set('comand','GetWorkPlaceTools');
        json = XMLrequest(params)
        console.log(json);
        setDataButtons(json);
        CreateMap(json["MenuBar"]);
    } 

    function CreateMap(jsonItems:any){
        let DeepFirst:any

        for (const [key, value] of Object.entries(jsonItems)) {
            //console.log(value)
            DeepFirst = value;
            for (const [key, value] of Object.entries(DeepFirst)) {
                console.log(value)
            }   
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
            <App/>
        </Grid>
    )
}