import { Grid, Tab, Tabs } from "@material-ui/core";
import axios from "axios";
import { useState, useEffect } from "react";

import { DocsAndReports, TabPanelProps } from "../../../ComponentInterface";
import ModalContainer from "../../../Containers/ModalContainer";
import TableParams from "../ParamsList/TableParams/TableParams";
import SectionDocs from "./SectionDocs";
//import data from '../ParamsList/data.js'



function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Grid style={{ height: "100vh"  }}>
            {children}
          </Grid>
        )}
      </div>
    );
  }
  //

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

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
            <Grid xs>

         
            <ModalContainer> 

            <SectionDocs id={props.id} />
              </ModalContainer>

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