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
import SectionsReportDocuments from '../Sections/ReportDocuments';
import { WorkPlaceTools } from '../Tools/WorkPlaceTools';
import StickyFooter from '../NotWorkArea(Side&Head)/Footer';
import StillDevelopmentPage from './StillDevelopmentPage';
import SectionToolsJS from '../Tools/SectionToolsJS';
import { XMLrequest } from '../../Url';
import SectionReport from '../Sections/ElementsSections/SectionReports'
import Tooltip from '@mui/material/Tooltip';
import FormsMainFile from '../../Forms/FormsMainFile.jsx';
import {tokenProcessingTest} from '../../TokenProcessing'
export default function FullRightSide(props: InfoAboutClick) {

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const openGrid= ()=>{
    setOpen(!open)
  }

 function OpenReport (ev:any)
 {
   let btn = ev.currentTarget
   
   let Param = document.querySelector(".TabDoc.TabDocActiv .Params.ActivParams")
   let idParams 
   Param ?  idParams = Param.id.split("_"): idParams = ""
   let SectionID = idParams[2].replace(/[^+\d]/g, '')
   let ReportID = idParams[3]
   let path = "Reports\\Params\\"+ReportID+"\\"+SectionID
   let params = new Map();
  /* params.set('prefix', 'programs');
   params.set('comand', 'FixParamHistory');
   params.set('Path', path);
   XMLrequest(params)*/
   params.clear();
   params.set('prefix', 'reports');
   params.set('comand', 'ExecuteReport');
   params.set('SectionID', SectionID);
   params.set('ReportID', ReportID);
   params.set('HTML', 1);
   params.set('WSM', 1);
   
   let TokenReturn = tokenProcessingTest(XMLrequest(params));
   console.log(TokenReturn)

 }

  let content
  let defaultButton
  if (props.id !== undefined && props.clsic == "{A759DBA0-9FA2-11D5-B97A-C2A4095B2C3B}") {

    content = <SectionsDBview  CLSID = {props.clsic} id = {props.id}/>
  } else
  if (props.id !== undefined && props.clsic =="{A358FF4E-4CE5-4CDF-B32D-38CC28448C61}")
  {
    defaultButton = <Tooltip title="Сформировать отчет" >
        <Button variant="outlined" size="small" onClick={(e) => OpenReport(e)}>
            Выполнить
        </Button>
    </Tooltip>
    content = <SectionsReportDocuments  CLSID = {props.clsic} id = {props.id} defaultButton = {defaultButton}/>
  }
  else
  if(props.id !== undefined && props.clsic ==="{C0CED968-8834-405D-8801-A3838BF536F3}"){//Формы
    content = <FormsMainFile id = {props.id}/>

  } else
  if(props.id !== undefined && props.clsic =="{B357E5B2-137F-4253-BBEF-E5CFD697E362}")
  {
     defaultButton = <Tooltip title="Сформировать отчет" >
        <Button variant="outlined" size="small" onClick={(e) => OpenReport(e)}>
            Выполнить
        </Button>
    </Tooltip>
    content = <SectionReport CLSID = {props.clsic} id = {props.id} defaultButton = {defaultButton}/>
  }
  else
    if (props.id !== undefined) {
      content = <StillDevelopmentPage  id = {props.id}/>
    }

  

  return (
    
    <Grid container   direction="column"     justifyContent="center"   sx={{ flexGrow: 1 }}    alignItems="stretch"    >
      <div id ="WorkPlace" style = {{ height: "calc(100% - 48px)"}}>
      <Grid item  >
        {props.isLoading?<div></div>:<Grid  container  direction="row"  justifyContent="flex-start" alignItems="center" >  </Grid>}
        
      </Grid>      
      {AppTabs(props.id, content)}
       </div>
       
       {props.id ===undefined?<></>:<StickyFooter/>}
       
       
    </Grid>
  );
}