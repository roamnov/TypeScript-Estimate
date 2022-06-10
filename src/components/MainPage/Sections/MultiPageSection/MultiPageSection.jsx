import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography";
import React,{ useEffect, useState } from "react";
import SectionToolsJS from '../../Tools/SectionToolsJS';
import { ImgURL, XMLrequest, } from '../../../Url';
import { Tabs, TabItem} from 'smart-webcomponents-react/tabs';
import Button from "@mui/material/Button";
import SectionReport from '../ElementsSections/SectionReports'
import Tooltip from '@mui/material/Tooltip';
import FullRightSide from "../../Windows/FullRightSide";
import {tokenProcessingTest} from "../../../TokenProcessing" 
import SectionsDBview from '../dbview';
import SectionsReportDocuments from '../ReportDocuments';
import FormsMainFile from '../../../Forms/FormsMainFile.jsx';
import Params from '../ElementsSections/Params';


const MultiPageSection = (props) => {
   const [currentHeight, setCurrentHeight] = useState(window.innerHeight - 189);
   const [data, setData] = React.useState();
   const [openReportData, setOpenReportData] = React.useState({});
   const [isLoading, setIsLoading] = React.useState(true); 
   const [drawerOpen, setdrawerOpen] = React.useState(true);
   const [selected, setSelected] = React.useState(false);
   const [toolsId, setToolsId] = React.useState(props.id);

   useEffect(() => {
        let params = new Map, json;
        params.set('prefix', 'pages');
        params.set("comand", "GetMembers");
        params.set("SectionID", props.id);
        setData(XMLrequest(params));
  },[]);

    const handleResize = () => {
        setCurrentHeight(window.innerHeight - 189);
    }
    useEffect(() => {
        window.addEventListener("resize", handleResize, false);
    }, []);
 
    function OpenReport (ev)
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

 function loadObjects(path){
  let params = new Map();
  params.set('prefix', 'programs');
  params.set('comand', 'GetParamDialog');
  params.set('GroupID', '0');
  params.set('Path', path);
  let otv = XMLrequest(params);
  //let parametry = document.createElement("div");
  return otv;
 }

    let content
    let defaultButton
    return (
        <><SectionToolsJS  ID={props.id} />
                <Tabs   style={{ position:"absolute", height: "85%", width:"80%", backgroundColor:"s"}}>
                {data && data.Pages.map((Page)=>{
                  if (Page.CLSID !== undefined && Page.CLSID == "{A759DBA0-9FA2-11D5-B97A-C2A4095B2C3B}") {// Просмотр данных
                    content = <SectionsDBview  CLSID = {Page.CLSID} id = {props.id}/>
                  } else
                  if(Page.CLSID !== undefined && Page.CLSID =="{B357E5B2-137F-4253-BBEF-E5CFD697E362}") {
                    defaultButton = <Tooltip title="Сформировать отчет" >
                       <Button variant="outlined" size="small" onClick={(e) => OpenReport(e)} style={{textTransform:"none", marginLeft:"0.88%"}}>
                           Выполнить
                       </Button>
                   </Tooltip>
                   content = <SectionReport CLSID = {Page.CLSID} id = {props.id} defaultButton = {defaultButton} SectionToolsJS={false} />
                  } else 
                  if (Page.CLSID !== undefined && Page.CLSID =="{A358FF4E-4CE5-4CDF-B32D-38CC28448C61}"){//Секция Документов/отчётов
                    defaultButton = <Tooltip title="Сформировать отчет" >
                        <Button variant="outlined" size="small" onClick={(e) => OpenReport(e)} style={{textTransform:"none", marginLeft:"0.88%"}}>
                            Выполнить
                        </Button>
                    </Tooltip>
                    content = <SectionsReportDocuments  CLSID = {Page.CLSID} id = {props.id} defaultButton = {defaultButton} />
                  }else
                  if(Page.CLSID !== undefined && Page.CLSID ==="{C0CED968-8834-405D-8801-A3838BF536F3}"){//Формы
                    content = <FormsMainFile id = {props.id}/> 
                  } else if (Page.CLSID !== undefined && Page.CLSID === "{D8402CE6-6582-4F0D-A82D-C2D9CA73F79E}"){
                             content = <Params id= {"item_params_reports"+props.id} SectionID = {props.id} data = {loadObjects(Page.Params.Path)} />
                  } else  {
                 content =  <Grid container direction="row" justifyContent="center" alignItems="center" style={{ height: `${currentHeight}px` }}>
                 <Grid item>
                     <div>
                         <Typography variant="h4">
                             Функционал находится в разработке. {Page.CLSID}
                         </Typography>
                     </div>
                 </Grid>
             </Grid>
               }

                 return(
                   <TabItem label={Page.Name} > 
                     {content}
                   </TabItem>
                  )
                 })}
               </Tabs>
          </>
    )
}

export default MultiPageSection;