import * as React from 'react';
import { Button, Grid, Toolbar } from '@material-ui/core';
import { IdToTree, InfoAboutClick, TabPanelProps,InfoAboutClickDown } from "../../ComponentInterface";
//import init from "../stimweb/tools"
//import Init from '../stimategrid/test';
import SectionTools from '../Tools/SectionTools';
import {AppTabs} from './DocTabs/DocTabs';
import ManWhoSoldTheWorld from '../stimategrid/test';
import DocsReportsMainWindow from './Docs&Reports/Docs&ReportsWindow';
import NestedMenu from '../Tools/NestedMenu';
import SectionsDBview from '../Sections/dbview';
import { WorkPlaceTools } from '../Tools/WorkPlaceTools';
import StickyFooter from '../NotWorkArea(Side&Head)/Footer';
import StillDevelopmentPage from './StillDevelopmentPage';
import SectionToolsJS from '../Tools/SectionToolsJS';
import { XMLrequest } from '../../Url';


export default function FullRightSide(props: InfoAboutClick) {

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const openGrid= ()=>{
    setOpen(!open)
  }

 

  let content
  if (props.id !== undefined && props.clsic == "{A759DBA0-9FA2-11D5-B97A-C2A4095B2C3B}") {

    content = <SectionsDBview  CLSID = {props.clsic} id = {props.id}/>
  } else
    if (props.id !== undefined) {
      content = <StillDevelopmentPage  id = {props.id}/>
    }

  

  return (
    
    <Grid container   direction="column"     justifyContent="center"   sx={{ flexGrow: 1, pt: 8, pl:2 }}    alignItems="stretch"    >
      <div id ="WorkPlace">
      <Grid item  >
        {props.isLoading?<div></div>:<Grid  container  direction="row"  justifyContent="flex-start" alignItems="center" >  </Grid>}
        
      </Grid>
      {AppTabs(props.id, content)}
        
       </div>
       {props.id ===undefined?<Grid style={{marginTop: 20}}><SectionToolsJS /></Grid>  :<></>}
       {props.id ===undefined?<></>:<StickyFooter/>}
       
       
    </Grid>
  );
}