import { Grid } from "@material-ui/core";
import axios from "axios";
import { useState, useEffect } from "react";
import { DocsAndReports } from "../../../ComponentInterface";
import SectionDocs from "./SectionDocs";




const DocsReportsMainWindow= (props:DocsAndReports) =>{


    return(
        <Grid container direction="row" justifyContent="flex-start" alignItems="center"> 
            <SectionDocs id={props.id}/>
            sdddssd
        </Grid>
    )
}


export default DocsReportsMainWindow;