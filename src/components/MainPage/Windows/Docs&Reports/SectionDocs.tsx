import { Grid } from "@material-ui/core";
import axios from "axios";
import { useState, useEffect } from "react";
import { DocsAndReports } from "../../../ComponentInterface";
import URL from "../../../Url";


const SectionDocs= (props:DocsAndReports) =>{

    const [sectionDocs, setSetionDocs] = useState([]);
    useEffect(() => {
        setActiveSession();
        initContext();
        setActiveSite();
        setActiveSite();
        getSectionDocs();

    }, [])

    const setActiveSession= async ()=>{
        let params = new Map();
        params.set('prefix','project'); 
        params.set('comand','SetActiveSection');
        params.set('SectionID',props.id);
        await axios.get(URL(params)).then((response)=>{
            console.log(response.data)
        })
    }
    const initContext = async ()=>{ //GET /documents~InitContext?LicGUID=E2365CAC4CE2CFD8F60C3C857AD2E1F7&LazyMemos=1 HTTP/1.1
        let params = new Map();
        params.set('prefix','documents'); 
        params.set('comand','InitContext');
        await axios.get(URL(params)).then((response)=>{
            console.log(response.data)
        })
        
    }
    
    const setActiveSite= async ()=>{//GET /documents~SetActiveSite?LicGUID=E2365CAC4CE2CFD8F60C3C857AD2E1F7 HTTP/1.1
        let params = new Map();
        params.set('prefix','documents'); 
        params.set('comand','SetActiveSite');
        await axios.get(URL(params)).then((response)=>{
            console.log(response.data)
        })
    }
    
    //GET /tools~GetSectionTools?LicGUID=E2365CAC4CE2CFD8F60C3C857AD2E1F7&SectionID=136 HTTP/1.1 потом
    const getSectionDocs = async ()=>{
        let params = new Map();
        params.set('prefix','documents'); 
        params.set('comand','GetSectionDocs');
        params.set('SectionID',props.id);
        await axios.get(URL(params)).then((response)=>{
            console.log(response.data)
            setSetionDocs(response.data)
        })
    }

    return(
        <Grid item>
            {JSON.stringify(sectionDocs)}
        </Grid>
    )
}


export default SectionDocs;