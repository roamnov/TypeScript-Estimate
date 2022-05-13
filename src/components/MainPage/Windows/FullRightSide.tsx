import * as React from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid"
import {  InfoAboutClick } from "../../ComponentInterface";
//import init from "../stimweb/tools"
//import Init from '../stimategrid/test';
import { Tabs, TabItem } from 'smart-webcomponents-react/tabs';
import {AppTabs} from './DocTabs/DocTabs';
import SectionsDBview from '../Sections/dbview';
import SectionsReportDocuments from '../Sections/ReportDocuments';
import StickyFooter from '../NotWorkArea(Side&Head)/Footer';
import StillDevelopmentPage from './StillDevelopmentPage';
import { ImgURL, XMLrequest, } from '../../Url';
import URL from '../../Url';
import SectionReport from '../Sections/ElementsSections/SectionReports'
import Tooltip from '@mui/material/Tooltip';
import FormsMainFile from '../../Forms/FormsMainFile.jsx';
import ReactDOM from 'react-dom';
import ModalProgress from '../../Containers/ModalProgress';
import {tokenProcessingTest} from "../../TokenProcessing"
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import Scrollbars from 'react-custom-scrollbars-2';


export default function FullRightSide(props: InfoAboutClick) {

  const [value, setValue] = React.useState(0);
  const [openReportData, setOpenReportData] = React.useState<any>({});
  const [tabItems, SetTabItems] = React.useState<any>({})
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  const [currentHeight, setCurrentHeight] = React.useState(window.innerHeight - 295);
    
  const handleResize = () => {
      setCurrentHeight(window.innerHeight - 295);
      console.log(window.innerHeight - 189)
  }
  React.useEffect(() => {
      window.addEventListener("resize", handleResize, false);
      
  }, []);

  let pringReportsDoc:any

  React.useEffect(()=>{
    console.log(openReportData);
    
    if(!isEmptyObject(openReportData)){
      
      
      let arrOfReportId = openReportData.ViewIdent.split("-");
      arrOfReportId = arrOfReportId[0].split("Report")
      const id = "print_reports" + props.id + "_" + arrOfReportId[1]
      console.log(document.getElementById(id));
      console.log(tabItems)
      if(document.getElementById(id) === null){
        let newReportWindow = document.createElement("div");
        pringReportsDoc = document.getElementById(`print_reports${props.id}`);
        pringReportsDoc.querySelectorAll('.ActivParams').forEach((n: { classList: { remove: (arg0: string) => void; add: (arg0: string) => void; }; }) => {n.classList.remove('ActivParams'); n.classList.add('NoActivParams')})
        newReportWindow.classList.add("Params");
        newReportWindow.classList.add("ActivParams");
        newReportWindow.id = id;
        // newReportWindow.innerHTML = openReportData.Items[0].content;
        pringReportsDoc.appendChild(newReportWindow);
        SetTabItems({[id]:[{
          "label":openReportData.Items[0].Title,
          "pinned":false
          }]
        })
        
        ReactDOM.render(
              <Grid item>    
                  <Tabs scrollMode="paging" id={id+"tabs"} closeButtons tabPosition="bottom" className="Tabs" selectedIndex={0} style={{ height: "calc(100% - 37px)", width: "100%" }} >
                    <Grid id={"upper"+props.id} item style={{textTransform:"none",display:"inline-block", height: "inherit", width: "100%"}}>
                      <TabItem id={id+"item"} style={{textTransform:"none",display:"inline-block", height: currentHeight}} label={openReportData.Items[0].Title} content={openReportData.Items[0].content} >
                        
                        
                      </TabItem>
                    </Grid> 
                  </Tabs>
              </Grid>
              ,newReportWindow);
    
        setTimeout(() => {
          let tab:any
          tab = document.getElementById(id+"item");
          tab.style.height= `${currentHeight}px`        
        }, 100);
        
            
      }else{
        if(!isEmptyObject(tabItems)){
          
          let tabs:any, valueAny:any
          tabs = document.getElementById(id+"tabs");
          tabs.insert(1, { label: openReportData.Items[0].Title, content:openReportData.Items[0].content });
          let tabsItems = tabs.getTabs();
          for (const [key, value] of Object.entries(tabsItems)) {
            valueAny= value;
            valueAny.style.display = "inline-block"
            valueAny.style.height= `${currentHeight}px`  ;
            console.log(value)
          }
        }
      }
      
      // ReactDOM.render(<div id='test1'> </div>,pringReportsDoc)
      // pringReportsDoc.innerHTML = openReportData.Items[0].content;
      // if(openReportData.Tools !== undefined){
      //   let buttonFromReport:any
      //   buttonFromReport = document.getElementById(`buttons_for_section`+props.id);
      //   buttonFromReport.querySelectorAll('.ActivParams').forEach((n: { classList: { remove: (arg0: string) => void; add: (arg0: string) => void; }; }) => {n.classList.remove('ActivParams'); n.classList.add('NoActivParams')})
      //   let newReportButton = document.createElement("div");
      //   let Button = openReportData.Tools.Buttons[0]
      //   let report = Button.ViewIdent.split("-");
      //   report = report[0].split("Report");
      //   let secid = Button.ViewIdent.split("Section");
      //   let ID = Button.ID +"-"+ report[1] +"-"+ secid[1]
      //   newReportButton.classList.add("ActivParams");//NoActivButtons
      //   newReportButton.id = "button_report_token" + props.id + "_" + arrOfReportId[1];
      //   buttonFromReport.appendChild(newReportButton);
      //   ReactDOM.render(
      //     <Grid item>    
      //         <Tooltip  title={Button.Hint + Button.ID +"-"+ report[1] +"-"+ secid[1]} arrow>
      //                 <IconButton id={ID}  color='primary'  component="span" onClick={reportsHandleToolButton}   >
      //                     {ImgURL(Button.Image)}
      //                 </IconButton>
      //         </Tooltip>
      //     </Grid>
      //     ,newReportButton)
      // }
    }
  },[openReportData])

  


  async function reportsHandleToolButton(event:any){//reports~HandleToolButton?LicGUID=B921C12049AC58E14F039A983633FE8E&ID=117&ReportID=453&SectionID=108&ViewIdent=Report453-Section108&WSM=1 
    let params = new Map;
    let ID, ReportID, SectionID, ViewIdent
    let e = event.currentTarget.getAttribute("id").split("-")
    ID = e[0]
    ReportID = e[1]
    SectionID = e[2] 
    ViewIdent =  `Report${ReportID}-Section${SectionID}`
    params.set('prefix', 'reports');
    params.set("comand", "HandleToolButton");
    params.set("ID", ID);
    params.set("ReportID", ReportID);
    params.set("SectionID", SectionID) 
    params.set("ViewIdent", ViewIdent);
    params.set("WSM","1")
    await axios.get(URL(params)).then((res:any)=> {tokenProcessingTest(res.data)})
  }


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
        <Button variant="outlined" size="small" onClick={(e) => OpenReport(e)} style={{textTransform:"none", marginLeft:"0.88%"}}>
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
        <Button variant="outlined" size="small" onClick={(e) => OpenReport(e)} style={{textTransform:"none", marginLeft:"0.88%"}}>
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
    
    <Grid container   direction="column"     justifyContent="center"   sx={{ flexGrow: 1 }}    alignItems="stretch"   style={{}} >
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