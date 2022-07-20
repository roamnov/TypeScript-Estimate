import * as React from 'react';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid"
import { InfoAboutClick } from "../../ComponentInterface";
//import init from "../stimweb/tools"
//import Init from '../stimategrid/test';
import { Tabs, TabItem } from 'smart-webcomponents-react/tabs';
import { AppTabs } from './DocTabs/DocTabs';
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
import { tokenProcessingTest } from "../../TokenProcessing"
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import Params from '../Sections/ElementsSections/Params';
import SectionToolsJS from '../Tools/SectionToolsJS';
import CloseIcon from '@mui/icons-material/Close';
import PdfPage from './PdfPage';
import Frame from 'react-frame-component';
import unpinned from "./../../../static/images/unpinned.png"
import pinned from "./../../../static/images/pinned.png"

export default function FullRightSide(props: InfoAboutClick) {

  const [value, setValue] = React.useState(0);
  const [openReportData, setOpenReportData] = React.useState<any>({});
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  var GlobalId: any
  var ViewIdentObj: any

  const [currentHeight, setCurrentHeight] = React.useState(window.innerHeight - 295);

  function ReturnHeightBasedOnCLSID() {
    if (props.clsic) {
      switch (props.clsic) {
        case "{B357E5B2-137F-4253-BBEF-E5CFD697E362}":// только отчёты
          return window.innerHeight - 145
        case "{A358FF4E-4CE5-4CDF-B32D-38CC28448C61}":
          return window.innerHeight - 295
      }
    }
  }

  const handleResize = () => {
    setCurrentHeight(window.innerHeight - 295);
  }
  React.useEffect(() => {
    window.addEventListener("resize", handleResize, false);

  }, []);

  let pringReportsDoc: any

  
  function DeleteActivFrame() {
   
    var frams: any
    frams = document.querySelectorAll(".Params.ActivParams")
    for (let n = 0; n <= frams.length - 1; n++) {
      let Activ = frams[n]
      let reps = Activ.querySelectorAll(".ActivReport")
      for (let f = 0; f <= reps.length - 1; f++) {
        let rep = reps[f];
        if (rep) {
          rep.classList.remove('ActivReport')
        }
      }
    }
  }
  function InsertIdReport(Html: string) {
    DeleteActivFrame();
    var rep
    //  .classList.remove('ActivReport')});
    // frame = frame.querySelector("iframe.ActivReport");
    //document.querySelectorAll("iframe.ActivReport").forEach(n => {n.classList.remove('ActivReport')})
    Html = String(Html).replaceAll("\'", "\"");
    Html = String(Html).replaceAll("overflow: hidden;", "");
    Html = String(Html).replaceAll(/[\n]+/g, "");
    Html = String(Html).replaceAll(/[\r]+/g, "");
    Html = String(Html).replaceAll('onClick="ClickCells(event)"', "");
    //onClick="ClickCells(event)"
    // Html = String(Html).replaceAll("#13", "");
    var newDoc = new DOMParser().parseFromString(Html, "text/html")
    rep = "<iframe srcdoc ='" + Html + "' style = 'width: 100%; height: 100%; border-width: 0px;' class='ActivReport'></iframe>"
    
    return rep
  }

  function RenderReports(id: any) {
    let idTabs: any = document.getElementById(id + "tabs")//получаем основной блок табов, мб мы его уже рисовали
    let tabsLength = idTabs === null ? 1 : idTabs["_tabs"].length// определяем длинну
    let ViewIdentForButton: any = { ViewIdent: openReportData.ViewIdent + ".", items: [] }
    let JSXTabItems = []
    GlobalId = id;
    let reportContent: any
    if (openReportData.Items) {
      let ValueAny: any
      for (const [key, value] of Object.entries(openReportData.Items)) {
        ValueAny = value;
        ViewIdentForButton.items.push(ValueAny.ViewIdent)
        if (ValueAny.RCDATA==undefined ){
        reportContent = String(ValueAny.content).replaceAll(/[\n]+/g, "");
        reportContent = String(reportContent).replaceAll(/[\r]+/g, "");
        if (reportContent !== "undefined") {

          reportContent = InsertIdReport(reportContent)
        }
        JSXTabItems.push(
          <TabItem id={ViewIdentForButton.ViewIdent + ViewIdentForButton.items[key]} style={{ textTransform: "none", display: "inline-block", height: currentHeight }}
            label={ValueAny.Title} content={reportContent} >
          </TabItem>
        )
      }  else {
        reportContent =  ValueAny.RCDATA
        JSXTabItems.push(
          <TabItem id={ViewIdentForButton.ViewIdent + ViewIdentForButton.items[key]} style={{ textTransform: "none", display: "inline-block", height: currentHeight }}
            label={ValueAny.Title}  >
              <PdfPage RCDATA={reportContent} offsetHeight={55}/> 
          </TabItem>
        ) 
      }
      }
    }

    ViewIdentObj = ViewIdentForButton

    if (document.getElementById(id) === null || tabsLength === 0 || openReportData.Items) {// если длинна равна 0(уже создавали табы) или мы не создавали еще контейнер для вкладок который потом будет скрывать
      let newReportWindow: any// в ней у нас хранится блок для секции дерева
      let TabIndex = openReportData.TabIndex;
      pringReportsDoc = document.getElementById(`print_reports${props.id}`);//ищем блок СЕКЦИИ
      TabIndex = TabIndex === undefined ? 0 : Number(TabIndex)
      newReportWindow = document.getElementById(id);// получаем блок
      RenderSoloReport(id, newReportWindow, false);

      if (tabsLength === 0) {
        idTabs.insert(0, { label: openReportData.Items[0].Title, content: openReportData.Items[0].content });
      } else {
        newReportWindow = document.getElementById(id);
        if (openReportData.Items && idTabs !== null) {
          let ValueAny: any
          console.log("AS")
          for (const [key, value] of Object.entries(openReportData.Items)) {
            ValueAny = value;
            reportContent = String(ValueAny.content).replaceAll(/[\n]+/g, "");
            reportContent = String(reportContent).replaceAll(/[\r]+/g, "");
            if (reportContent !== "undefined") {
    
              reportContent = InsertIdReport(reportContent)
            }
            if (idTabs["_tabs"][key] === undefined) {
              idTabs.insert(Number(key), { label: ValueAny.Title, content: ValueAny.content ? reportContent : undefined });
            } else {
              idTabs.update(Number(key), ValueAny.Title, ValueAny.content ? reportContent : undefined)
            }
            idTabs.select(TabIndex)
          }
        } else {
          ReactDOM.render(
            <Grid item id={id + "tabsContainer"} style={{ height: "inherit" }}>
              <Tabs scrollMode="paging" id={id + "tabs"} animation="none"
                tabPosition="bottom" selectedIndex={TabIndex}
                style={{ width: "100%", height: `96%` }} onChange={OnIndexChange} >

                {JSXTabItems}

              </Tabs>
            </Grid>
            , newReportWindow);
        }
      }
      
      setTimeout(() => {// с задержкой, что бы установить стили и кнопку поставить
        let tab: any, tabs: any, valueStylingLabels: any, tabItems: any, valueAnyLabel: any, Fixed: any, anyValClick: any, Buttons: any, childrens: any;
        tabs = document.getElementById(id + "tabs");
        if (tabs) {
          tabItems = tabs.getTabs();
          delete tabs.children[0]["$"].events.down
          for (const [key, value] of Object.entries(tabs["_tabLabelContainers"])) {
            valueAnyLabel = value;
            Fixed = openReportData.Items[key].Fixed;
            Fixed = Fixed === "1" ? true : false;
            if (!valueAnyLabel.firstChild.getAttribute("key")) {
              valueAnyLabel.firstChild.setAttribute("key", key)
              valueAnyLabel.firstChild.children["0"].setAttribute("key", key)
              valueAnyLabel.firstChild.setAttribute("tabsid", id)
              valueAnyLabel.firstChild.children["0"].setAttribute("tabsid", id)
            }
            valueAnyLabel.firstChild.onclick = function (event: any) {
              if (event.target.className === "smart-tab-label-text-container" || event.target.className === "smart-tab-label-text-wrapper") {
                const id = event.target.getAttribute("key")
                const tabsid = event.target.getAttribute("tabsid")
                const tabs: any = document.getElementById(tabsid + "tabs");
                tabs.select(Number(id))
              }
              // smart-tab-label-text-container
              // smart-tab-label-text-wrapper
            }
            valueAnyLabel.firstChild.id = openReportData.ViewIdent + "." + openReportData.Items[key].ViewIdent
            childrens = valueAnyLabel.firstChild.children
            Buttons = Number(openReportData.Items[key].Buttons)
            const closeButtonId = id + ",CloseButton" + key;
            if (CheckChilder(childrens, closeButtonId) && Buttons === 3 || Buttons === 1) {//кнопки закрытия
              let CloseButtonContainer = document.createElement("div");// создаем контейнер для кнопки
              let localId = id + ",CloseButton" + key;
              CloseButtonContainer.style.height = "10px";
              CloseButtonContainer.style.width = "10px";
              CloseButtonContainer.style.position = "absolute";
              CloseButtonContainer.style.right = "6.5%";
              CloseButtonContainer.style.top = "26.5%";
              CloseButtonContainer.id = localId;
              valueAnyLabel.firstChild.appendChild(CloseButtonContainer);
              valueAnyLabel.firstChild.children["0"].style.marginRight = "10px"
              let idForBttn = ViewIdentForButton.ViewIdent + ViewIdentForButton.items[key];
              ReactDOM.render(
                <IconButton id={idForBttn + "," + key} style={{ width: 10, height: 10, fontSize: "small" }} onClick={CustomClose} >
                  <CloseIcon fontSize="small" />
                </IconButton>
                , CloseButtonContainer);
            }
            // smart-tab-close-button
            const PinButtonId = id + ",ButtonFixUp" + key
            if (CheckChilder(childrens, PinButtonId) && Buttons === 3 || Buttons === 2) {//кнопки для пинов
              let PinButtonContainer = document.createElement("div");// создаем контейнер для кнопки
              let localId = id + ",ButtonFixUp" + key
              PinButtonContainer.style.height = "10px";
              PinButtonContainer.style.width = "10px";
              PinButtonContainer.style.position = "absolute";
              PinButtonContainer.style.left = "3.2%";
              PinButtonContainer.style.top = "22%";
              PinButtonContainer.id = localId;
              valueAnyLabel.firstChild.appendChild(PinButtonContainer);
              valueAnyLabel.firstChild.children["0"].style.marginLeft = "17px"
              let idForBttn = ViewIdentForButton.ViewIdent + ViewIdentForButton.items[key];
              ReactDOM.render(
                <IconButton id={idForBttn + "," + Fixed + "," + key} style={{ width: 10, height: 10, fontSize: "small" }} onClick={FixUpTabPage}>
                  {Fixed === true ? <img src={pinned} style={{width:"22px"}}/> : <img src={unpinned} style={{width:"22px"}}/>}
                  
                </IconButton>
                , PinButtonContainer);
            } else if (!document.getElementById(id + "," + key)) {
              let DataContainer = document.createElement("div");
              DataContainer.style.display = "none";
              DataContainer.id = id + "," + key;
              let Data = document.createElement("div");
              Data.id = ViewIdentForButton.ViewIdent + ViewIdentForButton.items[key] + ",";
              DataContainer.appendChild(Data)
              valueAnyLabel.firstChild.appendChild(DataContainer);
            }
          }
          // for (const [key, value] of Object.entries(tabItems)) {
          //   tab = value
          //   tab.style.height = `${currentHeight-10}px`;// даём высоту 
          //   tab.style.display = "inline-block"
          // }
        }
      }, 50);

    }
  }

  function WichReportRender() {
    if (!isEmptyObject(openReportData)) {
      let arrOfReportId = openReportData.ViewIdent.split("-");// переменная для того что бы получить id отчёта
      arrOfReportId = arrOfReportId[0].split("Report")
      const id = "print_reports" + props.id + "_" + arrOfReportId[1]//создаем id для последующего его использования. id = выбранный отчёт в tree
      switch (openReportData.CLSID) {
        case "{18CCCA1A-CD3D-41B3-8C20-9F80AA3ED8CE}"://групповые
          RenderReports(id);
          LinkrefClick(openReportData.ViewIdent);
          break;
        case "{55D200F8-A5EE-4BB8-B9AD-762B6FB815D1}"://обычная форма просмотра
          let newReportWindow: any// в ней у нас хранится блок для секции дерева
          let TabIndex = openReportData.TabIndex;
          pringReportsDoc = document.getElementById(`print_reports${props.id}`);//ищем блок СЕКЦИИ
          TabIndex = TabIndex === undefined ? 0 : Number(TabIndex)
          newReportWindow = document.getElementById(id);// получаем блок
          RenderSoloReport(id, newReportWindow, true);
          LinkrefClick(openReportData.ViewIdent);
          break;
        case "{A5CDFCEB-A95A-4ABC-839E-77D1D1F5CD86}": 
          let newReportWindow1: any// в ней у нас хранится блок для секции дерева
          let TabIndex1 = openReportData.TabIndex;
          pringReportsDoc = document.getElementById(`print_reports${props.id}`);//ищем блок СЕКЦИИ
          TabIndex1 = TabIndex1 === undefined ? 0 : Number(TabIndex)
          newReportWindow1 = document.getElementById(id);// получаем блок
          RenderPdfReport(id, newReportWindow1, true); 
          break;
      }
    }
  }

  function LinkrefClick(ViewIdent: any) {
    try {
      let frame: any
      let frams = document.querySelectorAll(".Params.ActivParams");
        for (let n = 0; n<=frams.length - 1; n++)
        frame = frams[n].querySelector("iframe.ActivReport");
        frame.onload = function (ev: any) { 
      let Test = frame.contentDocument.getElementsByClassName("linkref")
      let valAny: any, anyValClick: any
      for (const [key, value] of Object.entries(Test)) {
        valAny = value
        valAny.id = ViewIdent
        if (valAny.onclick === null) {
          valAny.onclick = function (event: any) {
            let params = new Map;
            console.log(event.currentTarget.attributes["data-path"].value)
            const id = event.currentTarget.id
            params.set("prefix", "cellobj")
            params.set("comand", "CallCellHandler")
            params.set("Command", "EditRef")
            params.set("ViewIdent", event.currentTarget.id)
            params.set("Path", event.currentTarget.attributes["data-path"].value)
            params.set("SectionID", props.id)
            params.set("WSM", "1")
            let jsonClick = XMLrequest(params)
            console.log(jsonClick)
            switch (jsonClick.Token) {
              case "ShowProgressDialog":
                let Path = jsonClick.Params.Path;
                let doc = document.getElementById('RenderModal')
                if (doc !== null) {
                  doc.innerHTML = "";
                }
                tokenProcessingTest(jsonClick, setOpenReportData);
                // ReactDOM.render(<ModalProgress open={true}  Json={json} path={Path} setReturnValue={setOpenReportData}/> , document.getElementById('RenderModal'));
                break;
              case undefined:
                setOpenReportData(jsonClick)
                break;
              default:
                tokenProcessingTest(jsonClick);
                break;
            }

          }}
        }


      }
      // console.log(Test)
    } catch {

    }
  }

  function RenderSoloReport(id: any, newReportWindow: any, bool?: any) {
    if (newReportWindow === null) {// если уже создавали вкладку
      pringReportsDoc.querySelectorAll('.ActivParams').forEach((n: {
        classList: {
          remove: (arg0: string) => void; add: (arg0: string) => void;
        };
      }) => { n.classList.remove('ActivParams'); n.classList.add('NoActivParams') })
      newReportWindow = document.createElement("div");// создаем блок 
      newReportWindow.classList.add("Params");
      newReportWindow.classList.add("ActivParams");
      newReportWindow.id = id;
      newReportWindow.style.height = "100%"
      if (bool) {
        newReportWindow.innerHTML = InsertIdReport(openReportData.content)

      }
      pringReportsDoc.appendChild(newReportWindow);
    }
  }

 
  function RenderPdfReport(id: any, newReportWindow: any, bool?: any) {
      if (newReportWindow === null) {// если уже создавали вкладку
      pringReportsDoc.querySelectorAll('.ActivParams').forEach((n: {
        classList: {
          remove: (arg0: string) => void; add: (arg0: string) => void;
        };
      }) => { n.classList.remove('ActivParams'); n.classList.add('NoActivParams') })
      newReportWindow = document.createElement("div");// создаем блок 
      newReportWindow.classList.add("Params");
      newReportWindow.classList.add("ActivParams");
      newReportWindow.id = id;
      newReportWindow.style.height = "100%"  
      
    let content = <PdfPage RCDATA={openReportData.RCDATA}/>
      ReactDOM.render(content, newReportWindow);
      pringReportsDoc.appendChild(newReportWindow);
    }
  }

  function CheckChilder(children: any, id: any) {
    let valueAny: any
    for (const [key, value] of Object.entries(children)) {
      valueAny = value;
      if (valueAny.id === id) {
        return false
      }
    }
    return true
  }


  function FixUpTabPage(event: any) {//GET /reptabs~FixupTabPage?LicGUID=31CDFD96401AD8BDBB6C2BB22C8E8150&Fixed=1&ViewIdent=Report453-Section108.{E31774C7-0524-4A9C-9BF7-708D4FDC05AB}
    let params = new Map
    let arrEvent = event.currentTarget.getAttribute("id").split(",")
    let TrueOrFalse = arrEvent[1] === "true" ? true : false
    let ViewIdent = arrEvent[0]
    const key = arrEvent[2]
    TrueOrFalse = !TrueOrFalse;
    params.set('prefix', 'reptabs');
    params.set("comand", "FixupTabPage");
    params.set("Fixed", TrueOrFalse ? "1" : "0");
    params.set("ViewIdent", ViewIdent);
    XMLrequest(params);
    ReactDOM.render(
      <IconButton id={ViewIdent + "," + `${TrueOrFalse}` + "," + key} style={{ width: 10, height: 10, fontSize: "small" }} onClick={FixUpTabPage}>
        {TrueOrFalse === true ? <img src={pinned} style={{width:"22px"}}/> : <img src={unpinned} style={{width:"22px"}}/>}
      </IconButton>
      , document.getElementById(GlobalId + ",ButtonFixUp" + key));

  }

  function OnIndexChange(event: any) {//GET /reptabs~GetPageContent?LicGUID=dsds&ViewIdent=Report453-Section108.{1013B2D8-A827-412C-8D67-A0FC930D5F26}&HTML=0
    let Tabs: any, EventTabContent: string, EventTabLabel: any, ViewIdent: any, json: any = {}, params: any = new Map, tabsItem: any
    const index = event.detail.index
    Tabs = document.getElementById(GlobalId + "tabs");
    EventTabContent = Tabs.getTabContent(index);
    tabsItem = Tabs.getTabs();
    ViewIdent = document.getElementById(GlobalId + `,ButtonFixUp${index}`)
    if (ViewIdent) ViewIdent = ViewIdent.children[0].id.split(",")[0]
    if (!ViewIdent) {
      ViewIdent = document.getElementById(GlobalId + `,${index}`)
      if (ViewIdent) ViewIdent = ViewIdent.children[0].id.split(",")[0]
    }
    if (EventTabContent === undefined || EventTabContent === "undefined") {
      let paramsGetPageContent = new Map;
      EventTabLabel = Tabs.getTabLabel(index);
      paramsGetPageContent.set('prefix', 'reptabs');
      paramsGetPageContent.set("comand", "GetPageContent");
      paramsGetPageContent.set("ViewIdent", ViewIdent);
      //paramsGetPageContent.set("HTML", "1");
      json = XMLrequest(paramsGetPageContent)
      let content 
      let pdfReport = document.getElementById(ViewIdent); //получаем ссылку на текущую вкладку
      if (json.RCDATA!==undefined) //если отчет в pdf
      { 
        content = <PdfPage RCDATA={json.RCDATA} offsetHeight={55}/>  
        let newReportWindow = document.createElement("div");// создаем блок 
        newReportWindow.classList.add("PdfReport"+index);
        newReportWindow.id = index;
        newReportWindow.style.height = "100%"  
        ReactDOM.render(content, newReportWindow);
        Tabs.update(index, EventTabLabel,'')   //обновляем вкладку
        if (pdfReport!== null) pdfReport.appendChild(newReportWindow);  //добавляем во вкладку отчет в pdf 
      } else 
        {
          content = json.content 
          content = InsertIdReport(content)  
          Tabs.update(index, EventTabLabel, content)                
        }
    } else {
      if (ViewIdent) {
        params.set('prefix', 'reptabs');
        params.set("comand", "PageChanged");
        params.set("ViewIdent", ViewIdent);
        XMLrequest(params);
        DeleteActivFrame();
        let frame = tabsItem[index]
        frame = frame.querySelector("iframe")
        frame.classList.add("ActivReport")
      }
    }
  }

  function ClickCells(event?: any) {
    console.log(event)
  }

  function CustomClose(event: any) {
    let arrEvent = event.currentTarget.getAttribute("id").split(",")
    let tabs: any
    tabs = document.getElementById(GlobalId + "tabs");
    handleClosing(arrEvent["0"])
    tabs.removeAt(Number(arrEvent["1"]))
    onCloseTab(Number(arrEvent["1"]))
  }

  function onCloseTab(index: any) {
    // const index = event.detail.index
    let tabs: any, tabContent: any, tabLabel: any, params = new Map, json: any, ViewIdent: any
    tabs = document.getElementById(GlobalId + "tabs");// получаем блок вкладок
    if (index > 0) {// print_reports108_453,ButtonFixUp2
      ViewIdent = document.getElementById(GlobalId + `,ButtonFixUp${index - 1}`)
      if (ViewIdent) ViewIdent = ViewIdent.children[0].id.split(",")[0]
      if (!ViewIdent) {
        ViewIdent = document.getElementById(GlobalId + `,${index - 1}`)
        ViewIdent = ViewIdent.children[0].id.split(",")[0]
      }
      tabContent = tabs.getTabContent(index - 1);
      if (tabContent === undefined || tabContent === "undefined") {
        params.set('prefix', 'reptabs');
        params.set("comand", "GetPageContent");
        params.set("ViewIdent", ViewIdent);
        params.set("HTML", "1");
        tabLabel = tabs.getTabLabel(index - 1);
        json = XMLrequest(params);
        tabs.update(index - 1, tabLabel, json.content)
      }
    }
  }

  function handleClosing(ViewIdent: any) {
    let params = new Map, tabs: any, tabsItem: any
    tabs = document.getElementById(GlobalId + "tabs");// получаем блок вкладок
    tabsItem = tabs.getTabs();
    params.set('prefix', 'reptabs');
    params.set("comand", "CloseTabPage");
    params.set("ViewIdent", ViewIdent);
    XMLrequest(params);
  }

  function onHeightChange(element: any) {
    let items: any = element.getTabs(), tab: any;
    let container: any = document.getElementById(`print_reports${props.id}`);//ищем блок СЕКЦИИ
    for (const [key, value] of Object.entries(items)) {
      tab = value
      tab.style.height = `${currentHeight - 10}px`;// даём высоту 
      tab.style.display = "inline-block"
    }
  }

  React.useEffect(() => {

    // RunTabsReports();
    try {
      WichReportRender();
    } catch (err) {
      console.log(err)
    }
  }, [openReportData])

  React.useEffect(() => {
    let tabs: any = document.getElementById(GlobalId + "tabs");
    if (!isEmptyObject(openReportData)) {
      // let arrOfReportId = openReportData.ViewIdent.split("-");// переменная для того что бы получить id отчёта
      // arrOfReportId = arrOfReportId[0].split("Report")
      // const id = "print_reports" + props.id + "_" + arrOfReportId[1]//создаем id для последующего его использования. id = выбранный отчёт в tree
      // tabs = document.getElementById(id + "tabs");
      // if (tabs) {
      //   onHeightChange(tabs);
      // }
    }

  }, [currentHeight])




  async function reportsHandleToolButton(event: any) {//reports~HandleToolButton?LicGUID=B921C12049AC58E14F039A983633FE8E&ID=117&ReportID=453&SectionID=108&ViewIdent=Report453-Section108&WSM=1 
    let params = new Map;
    let ID, ReportID, SectionID, ViewIdent
    let e = event.currentTarget.getAttribute("id").split("-")
    ID = e[0]
    ReportID = e[1]
    SectionID = e[2]
    ViewIdent = `Report${ReportID}-Section${SectionID}`
    params.set('prefix', 'reports');
    params.set("comand", "HandleToolButton");
    params.set("ID", ID);
    params.set("ReportID", ReportID);
    params.set("SectionID", SectionID)
    params.set("ViewIdent", ViewIdent);
    params.set("WSM", "1")
    await axios.get(URL(params)).then((res: any) => { tokenProcessingTest(res.data) })
  }


  function isEmptyObject(obj: any) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        return false;
      }
    }
    return true;

  }

  function OpenReport(ev: any) {
    let btn = ev.currentTarget
    let json
    let Param = document.querySelector(".TabDoc.TabDocActiv .Params.ActivParams")
    let idParams
    Param ? idParams = Param.id.split("_") : idParams = ""
    let SectionID = idParams[2].replace(/[^+\d]/g, '')
    let ReportID = idParams[3]
    let path = "Reports\\Params\\" + ReportID + "\\" + SectionID
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
    params.set('WSM', 1);
    json = XMLrequest(params)

    switch (json.Token) {
      case "ShowProgressDialog":
        let Path = json.Params.Path;
        let doc = document.getElementById('RenderModal')
        if (doc !== null) {
          doc.innerHTML = "";
        }
        tokenProcessingTest(json, setOpenReportData);
        // ReactDOM.render(<ModalProgress open={true}  Json={json} path={Path} setReturnValue={setOpenReportData}/> , document.getElementById('RenderModal'));
        break;
      case undefined:
        setOpenReportData(json)
        break;
      default:
        tokenProcessingTest(json);
        break;
    }


  }

  function loadMultipage() {
    let params = new Map, json;
    params.set('prefix', 'pages');
    params.set("comand", "GetMembers");
    params.set("SectionID", props.id);
    return XMLrequest(params);
  }

  function loadObjects(path: any) {
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
  let multipage

  if (props.id !== undefined && props.clsic == "{353FD9D7-651E-4840-9319-A8578806C496}") {

    multipage = loadMultipage();
    content =
      <><SectionToolsJS ID={props.id} />
        <Tabs style={{ position: "absolute", height: "85%", width: "80%", backgroundColor: "s" }}>
          {multipage && multipage.Pages !== undefined && multipage.Pages.map((Page: any) => {
            if (Page.CLSID !== undefined && Page.CLSID == "{A759DBA0-9FA2-11D5-B97A-C2A4095B2C3B}") {// Просмотр данных
              content = <SectionsDBview CLSID={Page.CLSID} id={props.id} />
            } else
              if (Page.CLSID !== undefined && Page.CLSID == "{B357E5B2-137F-4253-BBEF-E5CFD697E362}") {
                defaultButton = <Tooltip title="Сформировать отчет" >
                  <Button variant="outlined" size="small" onClick={(e) => OpenReport(e)} style={{ textTransform: "none", marginLeft: "0.88%", marginBottom: "0.6%" }}>
                    Выполнить
                  </Button>
                </Tooltip>
                content = <SectionReport CLSID={Page.CLSID} id={props.id} defaultButton={defaultButton} SectionToolsJS={false} />
              } else
                if (Page.CLSID !== undefined && Page.CLSID == "{A358FF4E-4CE5-4CDF-B32D-38CC28448C61}") {//Секция Документов/отчётов
                  defaultButton = <Tooltip title="Сформировать отчет" >
                    <Button variant="outlined" size="small" onClick={(e) => OpenReport(e)} style={{ textTransform: "none", marginLeft: "0.88%", marginBottom: "0.6%" }}>
                      Выполнить
                    </Button>
                  </Tooltip>
                  content = <SectionsReportDocuments CLSID={Page.CLSID} id={props.id} defaultButton={defaultButton} />
                } else
                  if (Page.CLSID !== undefined && Page.CLSID === "{C0CED968-8834-405D-8801-A3838BF536F3}") {//Формы
                    content = <FormsMainFile id={props.id} />
                  } else if (Page.CLSID !== undefined && Page.CLSID === "{D8402CE6-6582-4F0D-A82D-C2D9CA73F79E}") {
                    content = <Params id={props.id} SectionID={props.id} data={loadObjects(Page.Params.Path)} />
                  } else {
                    content = <StillDevelopmentPage id={props.id} SectionToolsJS={false} />
                  }

            return (
              <TabItem label={Page.Name} >
                {content}
              </TabItem>
            )
          })}
        </Tabs>
      </>
  } else
    if (props.id !== undefined && props.clsic == "{A759DBA0-9FA2-11D5-B97A-C2A4095B2C3B}") {// Просмотр данных

      content = <SectionsDBview CLSID={props.clsic} id={props.id} />
    } else
      if (props.id !== undefined && props.clsic == "{A358FF4E-4CE5-4CDF-B32D-38CC28448C61}") {//Секция Документов/отчётов
        defaultButton = <Tooltip title="Сформировать отчет" >
          <Button variant="outlined" size="small" onClick={(e) => OpenReport(e)} style={{ textTransform: "none", marginLeft: "0.88%" }}>
            Выполнить
          </Button>
        </Tooltip>
        content = <SectionsReportDocuments CLSID={props.clsic} id={props.id} defaultButton={defaultButton} />
      }
      else
        if (props.id !== undefined && props.clsic === "{C0CED968-8834-405D-8801-A3838BF536F3}") {//Формы
          content = <FormsMainFile id={props.id} />

        } else
          if (props.id !== undefined && props.clsic == "{B357E5B2-137F-4253-BBEF-E5CFD697E362}") {// Секция отчётов
            defaultButton = <Tooltip title="Сформировать отчет" >
              <Button variant="outlined" size="small" onClick={(e) => OpenReport(e)} style={{ textTransform: "none", marginLeft: "0.88%" }}>
                Выполнить
              </Button>
            </Tooltip>
            content = <SectionReport CLSID={props.clsic} id={props.id} defaultButton={defaultButton} SectionToolsJS={true} />
          } else
            if (props.id !== undefined) {
              content = <StillDevelopmentPage id={props.id} SectionToolsJS={true} />
            }



  return (

    <Grid container direction="column" justifyContent="center" sx={{ flexGrow: 1 }} alignItems="stretch" style={{}} id="IDTEST">
      <div id="WorkPlace" style={{ height: "calc(100% - 48px)" }}>
        <Grid item  >
          {props.isLoading ? <div></div> : <Grid container direction="row" justifyContent="flex-start" alignItems="center" >  </Grid>}

        </Grid>
        {AppTabs(props.id, content)}
      </div>

      {props.id === undefined ? <></> : <StickyFooter />}


    </Grid>
  );
}