import * as React from 'react';
import ReactDOM from 'react-dom';
import IconButton from '@mui/material/IconButton';
import { XMLrequest } from '../../../../Url';
import Switch from '../../../../Switch/Switch';
import Editor from "../../../../Editor/Editor"
import Tooltip from '@mui/material/Tooltip';
import UndoIcon from '@mui/icons-material/Undo';
import CheckIcon from '@mui/icons-material/Check';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';



export function clickTab(event) {
  let lbl = event.currentTarget;
  if (!lbl)
    lbl = event;
  let id = lbl.id.split("_")[1];
  let lbl2, contentTab1, contentTab2;
  contentTab1 = document.getElementById("content_tab1_" + id);
  contentTab2 = document.getElementById("content_tab2_" + id);
  if (lbl.id.split("_")[0] === "tab1") {
    lbl2 = document.getElementById("tab2_" + id);
    lbl.classList.add("activetab");
    contentTab1.classList.add("contentactive")
    lbl2.classList.remove("activetab");
    contentTab2.classList.remove("contentactive")
  }
  if (lbl.id.split("_")[0] === "tab2") {
    lbl2 = document.getElementById("tab1_" + id);
    lbl.classList.add("activetab");
    contentTab2.classList.add("contentactive")
    lbl2.classList.remove("activetab");
    contentTab1.classList.remove("contentactive")
  }
}
export default function Tree(props) {
  let data;
  var ApplyButtons;
  const [currentHeight, setCurrentHeight] = React.useState(window.innerHeight - 205);

  const handleResize = () => {
    setCurrentHeight(window.innerHeight - 205);
  }

  function fetchData(params) {
    if (!params) {
      params = new Map();
      params.set('prefix', 'dbview');
      params.set('comand', 'GetGroupTree');
    }
    data = XMLrequest(params)["Tree"]["items"]
  }
  function ShowChild(event) {
    let span = event.currentTarget;
    let id = span.id.split("_")[1];
    let btn = event.currentTarget.parentNode;
    let li = btn.parentNode.parentNode
    let spanFolder = btn.nextSibling;
    let ol;
    ol = li.querySelector("ol")

    if (span.classList.contains("rct-icon-expand-close")) {
      span.classList.remove("rct-icon-expand-close")
      span.classList.add("rct-icon-expand-open")
      spanFolder = spanFolder.querySelector(".rct-icon-parent-close")
      if (spanFolder) {
        spanFolder.classList.remove("rct-icon-parent-close")
        spanFolder.classList.add("rct-icon-parent-open")
      }
      if (!ol) {
        ol = document.createElement("ol");
        ReactDOM.render(CreateListTree(id), ol)
        ol.classList.add("hiddenBlock")

        li.appendChild(ol)
        ol.classList.remove("hiddenBlock")
        ol.classList.add("showBlock")
      }
      else {
        ol.classList.remove("hiddenBlock")
        ol.classList.add("showBlock")
      }
    }
    else {
      span.classList.add("rct-icon-expand-close")
      span.classList.remove("rct-icon-expand-open")
      spanFolder = spanFolder.querySelector(".rct-icon-parent-open")
      if (spanFolder) {
        spanFolder.classList.add("rct-icon-parent-close")
        spanFolder.classList.remove("rct-icon-parent-open")
      }
      if (ol) {
        ol.classList.add("hiddenBlock")
        ol.classList.remove("showBlock")
      }
    }
  }
  function GetObjectValues() {
    let params = new Map();
    let list = new Map();
    params.set('prefix', 'dbview');
    params.set('comand', 'GetConnectionList');
    let otv = XMLrequest(params);
    for (var key in otv) {
      if (otv.hasOwnProperty(key)) {
        if (otv[key].id)
          list.set(otv[key].id, otv[key].text)
        else
          list.set(0, otv[key])
      }
    }
    return list
  }
  function ClickCheck(id, val) {
    let params = new Map();
    params.set('prefix', 'dbview');
    params.set('comand', 'SetScriptType');
    params.set('ID', id);
    params.set('Value', val);
    fetchData(params)
  }
  function SetConnectionNo(index) {
    let params = new Map();
    let idItem
    params.set('prefix', 'dbview');
    params.set('comand', 'SetConnectionNo');
    idItem = document.querySelector("div.tabs.activetabs").querySelector("label.tablbl.activetab").id.split("_")[1]
    params.set('ID', idItem);
    params.set('Value', index);

    fetchData(params)
  }
  function ApplyCode(e) {
    let el = e.currentTarget;

    let buttons = document.querySelector("section.contentactive").querySelector("#ButtonCode");
    if (buttons) {
      if (buttons.style.display == "block") {
        buttons.style.display = "none"
      }
      let tab = document.querySelector("section.contentactive")
      let text = tab.querySelector(".cm-theme-light").querySelector(".cm-content").innerText;
      let Code = tab.querySelector("#Code");
      Code.textChanged = false;
      let params = new Map();
      params.set('prefix', 'dbview');
      params.set('comand', 'HandleSQLScript');
      let Data = {
        id: tab.id.split("_")[2],
        $content: text,
        //Comp: "NPO5898",
      }
      XMLrequest(params, Data)

    }
  }
  function CreateCodeMirror (d)
  {
   return  <CodeMirror
            value={d.content}
            height="100%"
            extensions={[sql()]}
          />
  }
  function RestoreCode(e) {
    let el = e.currentTarget;
    let tab = document.querySelector("section.contentactive")
    let buttons = tab.querySelector(".ButtonCode");
    if (buttons) {
      if (buttons.style.display == "block") {
        buttons.style.display = "none"
      }
    }
    let params = new Map();
    params.set('prefix', 'dbview');
    params.set('comand', 'HandleSQLScript');
    params.set('SectionID', "143");
    params.set('ID', tab.id.split("_")[2]);
    let otv = XMLrequest(params);
    let editor =CreateCodeMirror(otv)    
    let Code
    Code = tab.querySelector(".Code");
    ReactDOM.render(editor, Code)
   // Code.innerHTML = ""
    
    Code.textChanged = false;
    Code.addEventListener("KeyUp", EditCode)
  }
  function EditCode(e) {
    let el = e.currentTarget;
    let b
    b = "ShiftRight,ShiftLeft,ControlLeft,MetaLeft,AltLeft,CapsLock,ArrowLeft,ArrowRight,ArrowUp,ArrowDown,Escape,AudioVolumeMute,F1, F2,F3,F4,F5,F6,F7,F8,F9,F10,Insert,NumLock,Home,PageUp,PageDown,End"
    b = b.split(",");
    if (b.indexOf(e.code) == -1) {
      let tab = document.querySelector("section.contentactive")
      let buttons = tab.querySelector(".ButtonCode");
      if (buttons) {
        buttons.style.display = "block"
      }
    }

  }

  function CreateTabsData(idItem, query) {
    let tabs;
    ApplyButtons = false;
    tabs = <>
      <label id={"tab1_" + idItem} title="Данные" onClick={(event) => clickTab(event)} className='tablbl'> Данные</label>
      <label id={"tab2_" + idItem} title="SQL - скрипт" className='tablbl activetab' onClick={(event) => clickTab(event)}> SQL - скрипт</label>
      <section id={"content_tab1_" + idItem} >
        <div id={"gridpanel" + idItem} style={{ position: "absolute", height: "calc(100% - 10px)", width: "calc(100% - 10px)" }} ></div>
      </section>
      <section id={"content_tab2_" + idItem} className='contentactive'>
        <div style={{ display: "flex", width: "100%" }}>
          <div >
            <Editor idItem={idItem} EditStyle={1} caption="Подключение" style={{ width: "250px", top: "4px" }} GetObjectValues={GetObjectValues} onCloseUpList={SetConnectionNo} />
          </div>
          <div style={{ "padding-left": "10px" }}>
            <Switch idItem={idItem} label="Запрос модифицирования" onClick={ClickCheck} checked={query.IsReq ? query.IsReq : 0} />
          </div>
          <div className = "ButtonCode" style={{ display: "none" }}>
            <Tooltip title="Сохранить редактирование" >
              <IconButton aria-label="CancelEdit" size="small" onClick={ApplyCode}>
                <CheckIcon style={{ fill: "#628cb6" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Отменить редактирование" >
              <IconButton aria-label="CancelEdit" size="small" onClick={RestoreCode}>
                <UndoIcon style={{ fill: "#628cb6" }} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div style={{ overflow: "auto" }} className="Code" onKeyUp={(e) => EditCode(e)}>
        {CreateCodeMirror(query)}
          
        </div>
      </section>

    </>
    return tabs;
  }
  function ShowTabsData(id) {
    let DBviewData = document.getElementById("DBviewData")
    let tabs = document.getElementById("tabDataView" + id)
    if (!tabs) {
      let params = new Map();
      params.set('prefix', 'dbview');
      params.set('comand', 'HandleSQLScript');
      params.set('SectionID', "143");
      params.set('ID', id);
      let otv = XMLrequest(params);
      tabs = document.createElement("div")
      tabs.classList.add("tabs")
      tabs.classList.add("activetabs")
      tabs.id = "tabDataView" + id;
      ReactDOM.render(CreateTabsData(id, otv), tabs)
      if (tabs) {
        DBviewData.appendChild(tabs)
      }
    }
    else {
      tabs.classList.add("activetabs")
    }
  }

  function clickItem(event) {
    let span = event.currentTarget;
    let label = span.parentNode;
    let parent;
    parent = label;
    while (!parent.classList.contains("react-checkbox-tree")) {
      parent = parent.parentNode;
    }
    parent.querySelectorAll('.SelectItemTree').forEach(n => n.classList.remove('SelectItemTree'))
    label.classList.add("SelectItemTree");
    parent = document.getElementById("DBviewData");
    let tabs = parent.querySelector(".tabs.activetabs");
    if (tabs)
      tabs.classList.remove("activetabs");
    let id = span.id.split("_")[1];
    switch (props.CLSID) {
      case "{A759DBA0-9FA2-11D5-B97A-C2A4095B2C3B}":
        {
          ShowTabsData(id);
          break;
        }
    }
  }

  function CreateListTree(idItem) {
    if (idItem) {
      if (props.CLSID === "{A759DBA0-9FA2-11D5-B97A-C2A4095B2C3B}") {
        let params = new Map();
        params.set('prefix', 'dbview');
        params.set('comand', 'GetGroupTree');
        params.set('SectionID', '143');
        params.set('GroupID', idItem);
        params.set('Current', idItem);
        fetchData(params)
      }
    }

    var itemTree = <>
      {data.map((item) => {
        return <li className={item.leaf ? "rct-node rct-node-leaf" : "rct-node rct-node-parent rct-node-collapsed"} id={item["id"]}>
          <span className='rct-text'>
            {!item.leaf ?
              <button aria-label="Toggle" title="Toggle" type="button" className='rct-collapse rct-collapse-btn'>
                <span className='rct-icon rct-icon-expand-close' onClick={(event) => ShowChild(event)} id={"itemBtn_" + item["id"]}></span>
              </button> :
              <></>
            }
            <label>
              {props.multiCheck ?
                <span aria-checked="false" aria-disabled="false" className='rct-checkbox' role="checkbox" tabindex="0">
                  <span className='rct-icon rct-icon-uncheck'></span>
                </span>
                :
                <></>
              }
              <span className='rct-node-icon'>
                <span className={item.leaf ? 'rct-icon rct-icon-leaf' : 'rct-icon rct-icon-parent-close'} ></span>
              </span>
              <span className='rct-title' id={"item_" + item["id"]} onClick={(event) => clickItem(event)}>{item["text"]}</span>
            </label>
          </span>
        </li>
      })}
    </>
    return itemTree
  }

  fetchData()

  return (
    <div id="TreeDBView" className='react-checkbox-tree rct-icons-fa5' style={{ height: `${currentHeight}px`, overflowX: "auto", scrollbarWidth: "none" }}>
      <ol>
        {CreateListTree()}
      </ol>

    </div>
  );
}
