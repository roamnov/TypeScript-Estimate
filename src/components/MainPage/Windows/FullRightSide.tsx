import * as React from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid"
import {  InfoAboutClick } from "../../ComponentInterface";
//import init from "../stimweb/tools"
//import Init from '../stimategrid/test';
import {AppTabs} from './DocTabs/DocTabs';
import SectionsDBview from '../Sections/dbview';
import SectionsReportDocuments from '../Sections/ReportDocuments';
import StickyFooter from '../NotWorkArea(Side&Head)/Footer';
import StillDevelopmentPage from './StillDevelopmentPage';
import { XMLrequest } from '../../Url';
import SectionReport from '../Sections/ElementsSections/SectionReports'
import Tooltip from '@mui/material/Tooltip';
import FormsMainFile from '../../Forms/FormsMainFile.jsx';
import ReactDOM from 'react-dom';
import ModalProgress from '../../Containers/ModalProgress';
import {tokenProcessingTest} from "../../TokenProcessing"

export default function FullRightSide(props: InfoAboutClick) {

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [openReportData, setOpenReportData] = React.useState<any>({});
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  let pringReportsDoc:any
      // pringReportsDoc = document.getElementById('print_reports');
  React.useEffect(()=>{
    if(!isEmptyObject(openReportData) ){
      console.log(openReportData);
      pringReportsDoc = document.getElementById(`print_reports${props.id}`)
      pringReportsDoc.innerHTML = openReportData.Items[0].content;
    }
  },[openReportData])

  function isEmptyObject(obj:any) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
    
}

 function OpenReport (ev:any)
 {
   let btn = ev.currentTarget
   let json
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
   json = XMLrequest(params)
   
   switch(json.Token){
    case "ShowProgressDialog":
      let Path = json.Params.Path;
      let doc = document.getElementById('RenderModal')
      if(doc !== null){
        doc.innerHTML = "";
      }
      tokenProcessingTest(json, setOpenReportData);
      // ReactDOM.render(<ModalProgress open={true}  Json={json} path={Path} setReturnValue={setOpenReportData}/> , document.getElementById('RenderModal'));
      break;
    default:
      tokenProcessingTest(json);
      break;  
   }
      

 }

  let content
  let defaultButton
  if (props.id !== undefined && props.clsic == "{A759DBA0-9FA2-11D5-B97A-C2A4095B2C3B}") {

    content = <SectionsDBview  CLSID = {props.clsic} id = {props.id}/>
  } else
  if (props.id !== undefined && props.clsic =="{A358FF4E-4CE5-4CDF-B32D-38CC28448C61}")
  {
    defaultButton = <Tooltip title="Сформировать отчет" >
        <Button variant="outlined" size="small" onClick={(e) => OpenReport(e)} style={{textTransform:"none"}}>
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
        <Button variant="outlined" size="small" onClick={(e) => OpenReport(e)} style={{textTransform:"none"}}>
            Выполнить
        </Button>
    </Tooltip>
    content = <SectionReport CLSID = {props.clsic} id = {props.id} defaultButton = {defaultButton} SectionToolsJS={true} />
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