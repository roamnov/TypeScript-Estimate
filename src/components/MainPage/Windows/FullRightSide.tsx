import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Grid, Toolbar } from '@material-ui/core';
import SqlWindow from './ViewData/SqlWindow';
import { IdToTree, InfoAboutClick, TabPanelProps,InfoAboutClickDown } from "../../ComponentInterface";
//import init from "../stimweb/tools"
//import Init from '../stimategrid/test';
import { isTemplateSpan } from 'typescript';
import { TabsDemo } from './DocTabs/ClosableTabs';
import { BrowserRouter } from 'react-router-dom';
import BasicBreadcrumbs from '../Tools/Breadcrumbs';
import SectionTools from '../Tools/SectionTools';
import DocTabs from './DocTabs/DocTabs';
import ManWhoSoldTheWorld from '../stimategrid/test';
import DocsReportsMainWindow from './Docs&Reports/Docs&ReportsWindow';
import NestedMenu from '../Tools/NestedMenu';
import SectionsDBview from '../Sections/dbview';
import { WorkPlaceTools } from '../Tools/WorkPlaceTools';


export default function FullRightSide(props: InfoAboutClick) {

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [sectionToolsData, setSectionToolsData] = React.useState();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const openGrid= ()=>{
    setOpen(!open)
  }


  const getTabs = ()=>{
    if(props.id !== undefined && props.clsic  == "{A759DBA0-9FA2-11D5-B97A-C2A4095B2C3B}"){
      
      return DocTabs(props.name, props.id, document.getElementById("WorkPlace"), <SectionsDBview CLSID = {props.clsic}/>) 
    }
    if(props.id !== undefined){
      return DocTabs(props.name, props.id, document.getElementById("WorkPlace"), <DocsReportsMainWindow id={props.id}/>) 
    }
  }


  return (
    
    <Grid container 
          direction="column" 
          justifyContent="center" 
          sx={{ flexGrow: 1, pt: 2, pl:2 }}  
          alignItems="stretch" 
          >
    
    <Grid item  >
      <Toolbar />
      {props.isLoading?<div></div>:<><WorkPlaceTools/> <SectionTools setChildren={setSectionToolsData}/> </>}
        
    </Grid>
    
    <Grid item xs   >
      <div id ="WorkPlace">

      </div>
     
      {getTabs()}
    </Grid>  
  </Grid>
  );
}


