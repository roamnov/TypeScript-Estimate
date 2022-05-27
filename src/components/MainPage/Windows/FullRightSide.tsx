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
  const [currentTabIndex,setCurrentTabIndex] = React.useState<any>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  var PinItems:any
  
  const [currentHeight, setCurrentHeight] = React.useState(window.innerHeight - 295);
    
  const handleResize = () => {
      setCurrentHeight(window.innerHeight - 295);
  }
  React.useEffect(() => {
      window.addEventListener("resize", handleResize, false);
      
  }, []);

  let pringReportsDoc:any
function RunTabsReports(){
      if(!isEmptyObject(openReportData)){// проверка на пустой ли объект
      let arrOfReportId = openReportData.ViewIdent.split("-");// переменная для того что бы получить id отчёта
      arrOfReportId = arrOfReportId[0].split("Report")
      const id = "print_reports" + props.id + "_" + arrOfReportId[1]//создаем id для последующего его использования. id = выбранный отчёт в tree
      let idTabs:any =document.getElementById(id+"tabs")//получаем основной блок табов, мб мы его уже рисовали
      let tabsLength = idTabs === null? 1: idTabs["_tabs"].length// определяем длинну
      
      if(document.getElementById(id) === null || tabsLength === 0){// если длинна равна 0(уже создавали табы) или мы не создавали еще контейнер для вкладок который потом будет скрывать
        let newReportWindow:any// в ней у нас хранится блок для секции дерева
        pringReportsDoc = document.getElementById(`print_reports${props.id}`);//ищем блок СЕКЦИИ


        if(tabsLength === 0){// если уже создавали вкладку
          newReportWindow = document.getElementById(id);// получаем блок
          idTabs.insert(0, { label: openReportData.Items[0].Title, content:openReportData.Items[0].content });// встроеный метод добавления вкладки
        }else{// первая раз
          pringReportsDoc.querySelectorAll('.ActivParams').forEach((n: { classList:{ 
            remove: (arg0: string) => void; add: (arg0: string) => void; }; 
          }) => {n.classList.remove('ActivParams'); n.classList.add('NoActivParams')})
          newReportWindow = document.createElement("div");// создаем блок 
          newReportWindow.classList.add("Params");
          newReportWindow.classList.add("ActivParams");
          newReportWindow.id = id;
          pringReportsDoc.appendChild(newReportWindow);
          SetTabItems({[id]:[{
            "label":openReportData.Items[0].Title,
            "pinned":false,
            "i":"0"
            }]
          })
  
          ReactDOM.render(
            <Grid item  id={id+"tabsContainer"}>    
                <Tabs selectionMode="dblclick" scrollMode="paging" id={id+"tabs"} closeButtons tabPosition="bottom" className="Tabs" selectedIndex={0} style={{ height: "calc(100% - 37px)", width: "100%" }} onChange={OnIndexChange}>
                  <Grid id={"upper"+props.id} item style={{textTransform:"none",display:"inline-block", height: "inherit", width: "100%"}}>
                    <TabItem id={id+"item"} style={{textTransform:"none",display:"inline-block", height: currentHeight}} label={openReportData.Items[0].Title} content={openReportData.Items[0].content} >
                      
                      
                    </TabItem>
                  </Grid> 
                </Tabs>
            </Grid>
            ,newReportWindow);
        }
        
        
    
        setTimeout(() => {// с задержкой, что бы установить стили и кнопку поставить
          let tab:any, tabs:any, tabsTabs:any;
          tabsTabs = document.getElementById(id+"tabs");// получаем блок вкладок
          tab = tabsTabs.getTabs()["0"];// мы знаем что у нас только одна вкладка её и берем из array 
          tab.style.height= `${currentHeight}px`;// даём высоту 
          tab.style.textTransform = "none"
          tab.style.display="inline-block"
          let idEl = "0"
          let passT =tabsTabs["_tabLabelContainers"]
          let PinButtonContainer = document.createElement("div");// создаем контейнер для кнопки
          PinButtonContainer.style.height ="10px"
          PinButtonContainer.style.width = "10px"
          PinButtonContainer.style.position = "absolute"
          PinButtonContainer.style.left = "2%"
          PinButtonContainer.style.top="22%"
          PinButtonContainer.id = id+"Button0";
          passT[0].firstChild.appendChild(PinButtonContainer);
          ReactDOM.render(
            <IconButton id={idEl+ ","+ id + ",false,first"} style={{width: 10, height:10, fontSize:"small"}}  onClick={PinnedFirst}>
                n
            </IconButton>
          ,PinButtonContainer);
        }, 100);
  
      }else{

        if(!isEmptyObject(tabItems)){
          // При переключении удаляются все элементы, они должны быть хидден но они удаляются исправь
          let tabs:any, valueAny:any, tabsTabs:any, valueAnyTabs:any, tabItemsNew:any, newPinItems:any, idEL:any;
          tabs = document.getElementById(id+"tabs");// получаем главый блок с вкладками, через него потом найдет контейнер Label 
          let tabsItems = tabs.getTabs();// через встроенный метод получаем все вкладки, для получения их количества через .length т.к. это Array 
          let FirstButtonParent:any = document.getElementById(id+"Button0");// это для того что бы перерендерить первую кнопку.
          const DidFirstButtonExisting = FirstButtonParent.firstChild.id.split(",")// переменная для будущей проверки
          ShouldAddNewTab(tabs["_tabLabelContainers"]).then((res)=>{//проверка на можно ли добавить новую вкладку вернет true/false 
            console.log(res)
            if(res){// если новую всё таки можно добавить 
              idEL = tabsItems.length + 1;
              
              if(DidFirstButtonExisting[3]=== "first"){//нади ли перерендерить кнопку?
                  ReactDOM.render(
                  <IconButton id={"0,"+id +",true"} style={{width: 10, height:10, fontSize:"small"}} onClick={Pinned}>
                    p
                  </IconButton>
                ,FirstButtonParent);
              }
              
              tabs.insert(tabsItems.length + 1, { label: openReportData.Items[0].Title, content:openReportData.Items[0].content });// встроеный метод добавления вкладки
              
              for (const [key, value] of Object.entries(tabsTabs["_tabLabelContainers"])) {
                valueAnyTabs = value;
                if(valueAnyTabs.firstChild.children["2"] === undefined){// Есть ли кнопка для пина? Нет - добавляем. 
                  let PinButtonContainer = document.createElement("div");
                  PinButtonContainer.style.height ="10px"
                  PinButtonContainer.style.width = "10px"
                  PinButtonContainer.style.position = "absolute"
                  PinButtonContainer.style.left = "2%"
                  PinButtonContainer.style.top="22%"
                  PinButtonContainer.id = id+"Button";
                  valueAnyTabs.firstChild.appendChild(PinButtonContainer);
                  ReactDOM.render(
                    <IconButton id={`${key},`+id+",false"} style={{width: 10, height:10, fontSize:"small"}} onClick={Pinned}>
                      n
                    </IconButton>
                  ,PinButtonContainer);
                
              }
  
              for (const [key, value] of Object.entries(tabsItems)) {// стили для содержимого вкладки, ибо высота не правильно определяется
                valueAny= value;
                valueAny.style.display = "inline-block"
                valueAny.style.height= `${currentHeight}px`  ;
                }
              }
            }else{// если нужно обновить вкладку 
              let IdButton:any, indexWhereUpdate:any
              for (const [key, value] of Object.entries(tabsTabs["_tabLabelContainers"])) {
                valueAnyTabs = value;
                IdButton =valueAnyTabs.firstChild.children["2"].children["0"].id.split(",") // ID кнопки во вкладке, будет проверять в какую вкладку вставить новый отчёт.
                if(!IdButton[2]){
                  indexWhereUpdate = key
                }
              }
              tabs.update(indexWhereUpdate, openReportData.Items[0].Title, openReportData.Items[0].content );// встроенный метод обновления вкладки по индкесу
            }
          })

          
        }
      }
      
      // ReactDOM.render(<div id='test1'> </div>,pringReportsDoc)
      // pringReportsDoc.innerHTML = openReportData.Items[0].content;
      if(openReportData.Tools !== undefined){
        let buttonFromReport:any
        buttonFromReport = document.getElementById(`buttons_for_section`+props.id);
        buttonFromReport.querySelectorAll('.ActivParams').forEach((n: { classList: { remove: (arg0: string) => void; add: (arg0: string) => void; }; }) => {n.classList.remove('ActivParams'); n.classList.add('NoActivParams')})
        let newReportButton = document.createElement("div");
        let Button = openReportData.Tools.Buttons[0]
        let report = Button.ViewIdent.split("-");
        report = report[0].split("Report");
        let secid = Button.ViewIdent.split("Section");
        let ID = Button.ID +"-"+ report[1] +"-"+ secid[1]
        newReportButton.classList.add("ActivParams");//NoActivButtons
        newReportButton.id = "button_report_token" + props.id + "_" + arrOfReportId[1];
        buttonFromReport.appendChild(newReportButton);
        ReactDOM.render(
          <Grid item>    
              <Tooltip  title={Button.Hint + Button.ID +"-"+ report[1] +"-"+ secid[1]} arrow>
                      <IconButton id={ID}  color='primary'  component="span" onClick={reportsHandleToolButton}   >
                          {ImgURL(Button.Image)}
                      </IconButton>
              </Tooltip>
          </Grid>
          ,newReportButton)
      }
    }
    }

    async function ShouldAddNewTab(tabsLabels:any){
      let length= tabsLabels.length;
      let counter= 0, valueAny:any, buttonValue;
      for(const [key,value] of Object.entries(tabsLabels)){
        valueAny= value;
        buttonValue = valueAny.firstChild.children["2"].firstChild.id.split(",")
        buttonValue = buttonValue[2] ==="true"? true:false
        if(buttonValue){
          counter +=1;
        }
        console.log(buttonValue, counter,"=" ,length)
      }
      return length === counter?true:false; 
    }

  function OnIndexChange(event:any){
    setCurrentTabIndex(event.detail.index);
  }

  React.useEffect(()=>{
    
    RunTabsReports();

    
  },[openReportData])

  

  function PinnedFirst(event:any){
    console.log("Pinned1")
    let arrEvent = event.currentTarget.getAttribute("id").split(",");
    let id = arrEvent[0]
    let sectionKey =  arrEvent[1]
    let TrueOrFalse = arrEvent[2] ==="true"? true:false
    TrueOrFalse = !TrueOrFalse;
    
    ReactDOM.render(
      <IconButton id={`${id},`+ sectionKey+`,${TrueOrFalse}`} style={{width: 10, height:10, fontSize:"small"}} onClick={PinnedFirst}>
        {TrueOrFalse === true?<>p</>:<>n</>}
      </IconButton>
    ,event.target.parentElement);
  }

  function Pinned(event:any){
    console.log("Pinned2")
    let arrEvent = event.currentTarget.getAttribute("id").split(",");
    let id = arrEvent[0]
    let sectionKey = arrEvent[1]
    let TrueOrFalse =arrEvent[2] ==="true"? true:false
    TrueOrFalse = !TrueOrFalse;    
    ReactDOM.render(
      <IconButton id={`${id},`+ sectionKey+`,${TrueOrFalse}`} style={{width: 10, height:10, fontSize:"small"}} onClick={Pinned}>
        {TrueOrFalse === true?<>p</>:<>n</>}
      </IconButton>
    ,event.target.parentElement);
  }

  

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