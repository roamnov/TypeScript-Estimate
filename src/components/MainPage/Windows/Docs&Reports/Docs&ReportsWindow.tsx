import { Grid } from "@material-ui/core";
import axios from "axios";
import { useState, useEffect } from "react";
import Alert from "../../../Alert";
import { DocsAndReports } from "../../../ComponentInterface";
import TableParams from "../ParamsList/TableParams/TableParams";
import SectionDocs from "./SectionDocs";
//import data from '../ParamsList/data.js'




const DocsReportsMainWindow= (props:DocsAndReports) =>{


    return(
        <Grid container direction="row" justifyContent="flex-start" alignItems="center" xs> 
            <SectionDocs id={props.id}/>
            <div style={{}}>
              
            </div>
            <Alert/>
        </Grid>
    )
}


export default DocsReportsMainWindow;

/*
  <TableParams/>
<Grid xs item style={{zIndex:"4", backgroundColor:"blue", height: "100%"}} >
                dsd
            </Grid>

*/