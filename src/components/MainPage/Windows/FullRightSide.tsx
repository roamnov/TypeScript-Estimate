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
import MultiPageSection from '../Sections/MultiPageSection/MultiPageSection'
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
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import Frame from 'react-frame-component';


export default function FullRightSide(props: InfoAboutClick) {

  const [value, setValue] = React.useState(0);
  const [openReportData, setOpenReportData] = React.useState<any>({});
  const [globalIdHook,setGlobalIdHook] = React.useState<any>();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  var GlobalId:any
  var ViewIdentObj:any
  
  const [currentHeight, setCurrentHeight] = React.useState(window.innerHeight - 295);
    
  const handleResize = () => {
      setCurrentHeight(window.innerHeight - 295);
  }
  React.useEffect(() => {
      window.addEventListener("resize", handleResize, false);
      
  }, []);

  let pringReportsDoc:any

  function createMarkup(code:any) {
    return {__html: code};
  }
  function RenderReports(){
    if(!isEmptyObject(openReportData)){// проверка на пустой ли объект
      let arrOfReportId = openReportData.ViewIdent.split("-");// переменная для того что бы получить id отчёта
      arrOfReportId = arrOfReportId[0].split("Report")
      const id = "print_reports" + props.id + "_" + arrOfReportId[1]//создаем id для последующего его использования. id = выбранный отчёт в tree
      let idTabs:any =document.getElementById(id+"tabs")//получаем основной блок табов, мб мы его уже рисовали
      let tabsLength = idTabs === null? 1: idTabs["_tabs"].length// определяем длинну
      let ViewIdentForButton:any ={ViewIdent:openReportData.ViewIdent+".", items:[]} 
      let JSXTabItems=[]
      GlobalId = id;
      if(openReportData.Items){
        let ValueAny:any
        let reportContent: any
        var frame: any

        for(const[key,value] of Object.entries(openReportData.Items)){
          ValueAny = value;
          ViewIdentForButton.items.push(ValueAny.ViewIdent)
          frame = document.createElement("iframe")
          frame.id = "Frame123"
          reportContent = String(ValueAny.content).replaceAll(/[\n]+/g, "");
          reportContent = String(reportContent).replaceAll(/[\r]+/g, "");
          frame.innerHTML = reportContent
          //reportContent = "<iframe>"+reportContent+"</iframe>"
          JSXTabItems.push(
            <TabItem id={ViewIdentForButton.ViewIdent+ViewIdentForButton.items[key]} style={{textTransform:"none",display:"inline-block", height: currentHeight}} 
              label={ValueAny.Title} >
               <Frame 
               initialContent = {reportContent} 
               style ={{width:"100%", height: "100%"}}>
              </Frame> 
            </TabItem>
          )
        }
      }
      ViewIdentObj = ViewIdentForButton

      if(document.getElementById(id) === null || tabsLength === 0 || openReportData.Items){// если длинна равна 0(уже создавали табы) или мы не создавали еще контейнер для вкладок который потом будет скрывать
        let newReportWindow:any// в ней у нас хранится блок для секции дерева
        let TabIndex = openReportData.TabIndex;
        pringReportsDoc = document.getElementById(`print_reports${props.id}`);//ищем блок СЕКЦИИ
        TabIndex = TabIndex===undefined?0:Number(TabIndex)
        newReportWindow = document.getElementById(id);// получаем блок

        if(newReportWindow === null){// если уже создавали вкладку
          pringReportsDoc.querySelectorAll('.ActivParams').forEach((n: { classList:{ 
            remove: (arg0: string) => void; add: (arg0: string) => void; }; 
          }) => {n.classList.remove('ActivParams'); n.classList.add('NoActivParams')})
          newReportWindow = document.createElement("div");// создаем блок 
          newReportWindow.classList.add("Params");
          newReportWindow.classList.add("ActivParams");
          newReportWindow.id = id;
          pringReportsDoc.appendChild(newReportWindow);
        }
        if(tabsLength===0){
          idTabs.insert(0, { label: openReportData.Items[0].Title, content:openReportData.Items[0].content });
        }else{
          newReportWindow = document.getElementById(id);
          if(openReportData.Items && idTabs !== null){
            let ValueAny:any
            for(const[key,value] of Object.entries(openReportData.Items)){
              ValueAny = value;
              if(idTabs["_tabs"][key] === undefined){
                idTabs.insert(Number(key), { label: ValueAny.Title, content:ValueAny.content?ValueAny.content:"<div></div>" });
              }else{
                idTabs.update(Number(key), ValueAny.Title, ValueAny.content?ValueAny.content:"<div></div>")
              }
              idTabs.select(TabIndex)
            }
          }else{
            ReactDOM.render(
              <Grid item  id={id+"tabsContainer"}>    
                  <Tabs  selectionMode="dblclick" scrollMode="paging" id={id+"tabs"} 
                    closeButtons tabPosition="bottom" className="Tabs"  selectedIndex={TabIndex}
                    style={{ height: "400px", width: "100%" }} onChange={OnIndexChange} onClosing={handleClosing} onClose={onCloseTab}>
    
                      {JSXTabItems}
              
                  </Tabs>
              </Grid>
            ,newReportWindow);
          }
        }
        

        setTimeout(() => {// с задержкой, что бы установить стили и кнопку поставить
          let tab:any, tabs:any, valueStylingLabels:any, tabItems:any,valueAnyLabel:any, Fixed:any ;          
          tabs = document.getElementById(id+"tabs");
          if(tabs){ 
            tabItems = tabs.getTabs();
            for (const [key, value] of Object.entries(tabs["_tabLabelContainers"])) {
              valueAnyLabel = value;
              Fixed = openReportData.Items[key].Fixed;
              Fixed = Fixed === "1"?true: false;
              valueAnyLabel.firstChild.children["0"].style.marginLeft="17px" 
              valueAnyLabel.firstChild.id=openReportData.ViewIdent+"." + openReportData.Items[key].ViewIdent
              if(valueAnyLabel.firstChild.children["2"] === undefined){
                let PinButtonContainer = document.createElement("div");// создаем контейнер для кнопки
                PinButtonContainer.style.height ="10px";
                PinButtonContainer.style.width = "10px";
                PinButtonContainer.style.position = "absolute";
                PinButtonContainer.style.left = "3.2%";
                PinButtonContainer.style.top="22%";
                PinButtonContainer.id = id+",ButtonFixUp"+key;
                valueAnyLabel.firstChild.appendChild(PinButtonContainer);
                let idForBttn= ViewIdentForButton.ViewIdent +ViewIdentForButton.items[key];
                ReactDOM.render(
                  <IconButton id={idForBttn+","+Fixed+","+ key} style={{width: 10, height:10, fontSize:"small"}}  onClick={FixUpTabPage}>
                      {Fixed === true?<LockIcon fontSize='small'/>:<LockOpenIcon fontSize='small'/>}
                  </IconButton>
                ,PinButtonContainer);
              }
            }
            for(const[key,value] of Object.entries(tabItems)){
              tab = value
              tab.style.height= `${currentHeight}px`;// даём высоту 
              tab.style.display="inline-block"
            }
           }
          }, 50);
  
      }
    }
  }



  function FixUpTabPage(event:any){//GET /reptabs~FixupTabPage?LicGUID=31CDFD96401AD8BDBB6C2BB22C8E8150&Fixed=1&ViewIdent=Report453-Section108.{E31774C7-0524-4A9C-9BF7-708D4FDC05AB}
    let params = new Map
    let arrEvent = event.currentTarget.getAttribute("id").split(",")
    let TrueOrFalse =arrEvent[1] ==="true"? true:false
    let ViewIdent =arrEvent[0]
    const key = arrEvent[2]
    TrueOrFalse = !TrueOrFalse;
    params.set('prefix', 'reptabs');
    params.set("comand", "FixupTabPage");
    params.set("Fixed",TrueOrFalse?"1":"0");
    params.set("ViewIdent",ViewIdent);
    XMLrequest(params);
    ReactDOM.render(
      <IconButton id={ViewIdent+","+`${TrueOrFalse}`+","+ key} style={{width: 10, height:10, fontSize:"small"}} onClick={FixUpTabPage}>
        {TrueOrFalse === true?<LockIcon fontSize='small'/>:<LockOpenIcon fontSize='small'/>}
      </IconButton>
    ,document.getElementById(GlobalId+",ButtonFixUp"+key));
    
  }

  function OnIndexChange(event:any){//GET /reptabs~GetPageContent?LicGUID=dsds&ViewIdent=Report453-Section108.{1013B2D8-A827-412C-8D67-A0FC930D5F26}&HTML=0
    let Tabs:any, EventTabContent:string,EventTabLabel:any, ViewIdent:any, json:any= {}, params:any = new Map, tabsItem:any
    const index = event.detail.index
    Tabs = document.getElementById(GlobalId+"tabs");
    EventTabContent = Tabs.getTabContent(index);
    console.log(event)
    tabsItem = Tabs.getTabs(); 
    ViewIdent = document.getElementById(GlobalId+`,ButtonFixUp${index}`)
    if(ViewIdent)ViewIdent = ViewIdent.children[0].id.split(",")[0]
    if(EventTabContent ==="<div></div>"){
      let paramsGetPageContent = new Map;
      EventTabLabel = Tabs.getTabLabel(index);
      paramsGetPageContent.set('prefix', 'reptabs');
      paramsGetPageContent.set("comand", "GetPageContent");
      paramsGetPageContent.set("ViewIdent",ViewIdent);
      paramsGetPageContent.set("HTML","1");
      json = XMLrequest(paramsGetPageContent)
      Tabs.update(index, EventTabLabel, json.content)
    }else{
      if(ViewIdent){
        params.set('prefix', 'reptabs');
        params.set("comand", "PageChanged");
        params.set("ViewIdent",ViewIdent);
        XMLrequest(params);
      }
    }
  }

  function onCloseTab(event:any){
    const index = event.detail.index
    let tabs:any, tabContent:any, tabLabel:any, params = new Map, json:any, ViewIdent:any
    tabs = document.getElementById(GlobalId+"tabs");// получаем блок вкладок
    if(index>0){// print_reports108_453,ButtonFixUp2
      ViewIdent = document.getElementById(GlobalId+`,ButtonFixUp${index-1}`)
      ViewIdent = ViewIdent.children[0].id.split(",")[0]
      tabContent = tabs.getTabContent(index-1);
      if(tabContent === "<div></div>"){
        params.set('prefix', 'reptabs');
        params.set("comand", "GetPageContent");
        params.set("ViewIdent",ViewIdent);
        params.set("HTML","1");
        tabLabel = tabs.getTabLabel(index-1);
        json = XMLrequest(params);
        tabs.update(index-1, tabLabel, json.content)
      }
    }
  }

  function handleClosing(event:any) {
    let params = new Map, tabs:any, tabsItem:any, ViewIdent:any;
    const detail = event.detail,
    index = detail.index;
    tabs = document.getElementById(GlobalId+"tabs");// получаем блок вкладок
    tabsItem = tabs.getTabs(); 
    ViewIdent = event.explicitOriginalTarget.parentElement.id
    params.set('prefix', 'reptabs');
    params.set("comand", "CloseTabPage");
    params.set("ViewIdent",ViewIdent);
    XMLrequest(params);
  }

  function onHeightChange(element:any){
    
    let items:any = element.getTabs(), tab:any;
    console.log(items)
    let container:any = document.getElementById(`print_reports${props.id}`);//ищем блок СЕКЦИИ
    for(const[key,value] of Object.entries(items)){
      tab = value
      tab.style.height= `${currentHeight}px`;// даём высоту 
      tab.style.display="inline-block"
    }
  }

  React.useEffect(()=>{

    // RunTabsReports();
    try{
        RenderReports();
    }catch(err){
      console.log(err)
    }
  },[openReportData])

  React.useEffect(()=>{
    let tabs:any = document.getElementById(GlobalId+"tabs");
    if(!isEmptyObject(openReportData)){
      let arrOfReportId = openReportData.ViewIdent.split("-");// переменная для того что бы получить id отчёта
      arrOfReportId = arrOfReportId[0].split("Report")
      const id = "print_reports" + props.id + "_" + arrOfReportId[1]//создаем id для последующего его использования. id = выбранный отчёт в tree
      tabs = document.getElementById(id+"tabs");
      if(tabs){
        onHeightChange(tabs);
      }
    }
    
  },[currentHeight])

 
  

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
  if (props.id !== undefined && props.clsic == "{A759DBA0-9FA2-11D5-B97A-C2A4095B2C3B}") {// Просмотр данных

    content = <SectionsDBview  CLSID = {props.clsic} id = {props.id}/>
  } else
  if (props.id !== undefined && props.clsic =="{A358FF4E-4CE5-4CDF-B32D-38CC28448C61}"){//Секция Документов/отчётов
    defaultButton = <Tooltip title="Сформировать отчет" >
        <Button variant="outlined" size="small" onClick={(e) => OpenReport(e)} style={{textTransform:"none", marginLeft:"0.88%"}}>
            Выполнить
        </Button>
    </Tooltip>
    content = <SectionsReportDocuments  CLSID = {props.clsic} id = {props.id} defaultButton = {defaultButton} />
  }
  else
  if(props.id !== undefined && props.clsic ==="{C0CED968-8834-405D-8801-A3838BF536F3}"){//Формы
    content = <FormsMainFile id = {props.id}/>

  } else
  if(props.id !== undefined && props.clsic =="{B357E5B2-137F-4253-BBEF-E5CFD697E362}"){// Секция отчётов
     defaultButton = <Tooltip title="Сформировать отчет" >
        <Button variant="outlined" size="small" onClick={(e) => OpenReport(e)} style={{textTransform:"none", marginLeft:"0.88%"}}>
            Выполнить
        </Button>
    </Tooltip>
    content = <SectionReport CLSID = {props.clsic} id = {props.id} defaultButton = {defaultButton} SectionToolsJS={true} />
  }else if(props.id !== undefined && props.clsic =="{353FD9D7-651E-4840-9319-A8578806C496}"){
    content = <MultiPageSection id = {props.id}/>
  }
  else if (props.id !== undefined) {
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