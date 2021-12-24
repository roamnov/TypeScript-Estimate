//GET /config~GetWorkPlaceTools?LicGUID=6AE4B0E34E97A2392311FD9F28A52A66  &SectionID=143 
import { Grid } from "@mui/material"
import {useEffect, useState} from "react"
import { XMLrequest } from "../../Url";



export function WorkPlaceTools (){
    const [data, setData] = useState();
    useEffect(() => {
        GetWorkPlaceTools();
    }, [])

    console.log(data)
    const GetWorkPlaceTools = ( ) =>{
        let params = new Map;
        params.set('prefix','config'); 
        params.set('comand','GetWorkPlaceTools');
        //params.set('SectionID','143');
        setData(XMLrequest(params));
    } 


    return(
        <Grid>

        </Grid>
    )
}