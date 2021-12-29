import { Grid, Tab, Tabs } from "@material-ui/core";
import { useState, useEffect } from "react";

import { DocsAndReports, TabPanelProps } from "../../../ComponentInterface";
import SectionDocs from "./SectionDocs";
//import data from '../ParamsList/data.js'


const DocsReportsMainWindow= (props:DocsAndReports) =>{
    const [value, setValue] = useState(0);
    const test = document.createElement("div")
    test.innerText = "test"
    const [ div, setDiv] = useState([<div> 1 </div>, <> 2 </>])
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
      };

    
    return(
        <Grid container direction="row" justifyContent="flex-start" alignItems="center" xs> 
          <Grid xs>
      
              
              <SectionDocs id={props.id} />
              
          
          </Grid>
        </Grid>
    )
}


export default DocsReportsMainWindow;

/*
 <Grid direction={'column'} style={{}}>
                <Tabs value={value} onChange={handleChange} >
                    <Tab label="Документы" {...a11yProps(0)} />
                    <Tab label="Отчёты" {...a11yProps(1)} />
                </Tabs>
            </Grid>
            <TabPanel  value={value} index={0}>
                
                <SectionDocs id={props.id} />
                
            </TabPanel>
            <TabPanel  value={value} index={1}>
                
            Ыефыыыыы
                
            </TabPanel>


<SectionDocs id={props.id}/>
  <TableParams/>
<Grid xs item style={{zIndex:"4", backgroundColor:"blue", height: "100%"}} >
                dsd
            </Grid>
<Alert/>
*/