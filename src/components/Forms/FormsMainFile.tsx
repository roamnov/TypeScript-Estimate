import { Grid } from "@mui/material";
import React,{useEffect, useState} from "react";
import { XMLrequest } from "../Url";




export default function FormsMainFile(props:any){
    const [dataForms, setDataForms] = useState();

    useEffect(()=>{
        GetSectionForms();
    },[]);

    useEffect(()=>{
        if(dataForms !== undefined){
            FormDataProcessing(dataForms)
        }
    },[dataForms])

    const GetSectionForms=()=>{//GET /forms~GetSectionForm?LicGUID=8C5F5163443EBAC78D42B78939951952&SectionID=482 HTTP/1.0
        let params = new Map, json;
        params.set('prefix', 'forms');
        params.set("comand", "GetSectionForm");
        params.set("SectionID", props.id);/////
        json = XMLrequest(params);
        setDataForms(json);
        console.log(json);
    } 

    function FormDataProcessing(json:any){

    }


    return(
        <Grid id="mainForms">

        </Grid>
    )
}