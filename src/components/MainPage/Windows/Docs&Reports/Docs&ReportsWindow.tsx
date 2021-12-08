import { Grid } from "@material-ui/core";
import axios from "axios";
import { useState, useEffect } from "react";
import { DocsAndReports } from "../../../ComponentInterface";
import SectionDocs from "./SectionDocs";




const DocsReportsMainWindow= (props:DocsAndReports) =>{


    return(
        <Grid container direction="row" justifyContent="flex-start" alignItems="center"> 
            <SectionDocs id={props.id}/>
            <div style={{}}>

            </div>
        </Grid>
    )
}


export default DocsReportsMainWindow;

/*

<Grid xs item style={{zIndex:"4", backgroundColor:"blue", height: "100%"}} >
                dsd
            </Grid>

*/