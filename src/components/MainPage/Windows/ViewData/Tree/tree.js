import * as React from 'react';
import ReactDOM from 'react-dom';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import IconButton from '@mui/material/IconButton';
import './tree.css';
import { XMLrequest } from '../../../../Url';
import { useState, useEffect } from 'react';
import DropList from '../../../../DropList/DropList';
import ManWhoSoldTheWorld from '../../../stimategrid/test';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { Button } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';

export default function Tree(props) {
  let data;


  const [currentHeight, setCurrentHeight] = React.useState(window.innerHeight - 205);

  const handleResize = () => {
    setCurrentHeight(window.innerHeight - 205);
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  const [code, setCode] = useState(``);
  const [id, setId] = useState();
  function fetchData() {
    let params = new Map();
    params.set('prefix', 'dbview');
    params.set('comand', 'GetGroupTree');
    data = XMLrequest(params)["Tree"]["items"]
  }

  function CreateTabsView(id, query) {
    let container = document.createElement("div")
    container.setAttribute("id", "DBviewTabs" + id);
    container.classList.add("DBviewTabs");
    container.classList.add("ActivTabs");
    setId(id);
    let templatetabs = <> <input type="radio" name={"DBviewTabButton" + id} id={"DBviewTabButtonGrid" + id} checked />
      <label for={"DBviewTabButtonGrid" + id}>Данные</label>
      <div id="DBviewTabGrid" class="ContentTab">
        <div id={"gridpanel" + id} style = {{position: "absolute"}} >
          
        </div>
      </div>
      <input type="radio" name={"DBviewTabButton" + id} id={"DBviewTabButtonQwery" + id} />
      <label for={"DBviewTabButtonQwery" + id}>SQL-скрипт</label>
      <div id="DBviewTabQwery" class="ContentTab">
        <div id="TabQwery">
          <div id="ConnectionId">
            <DropList text="Подключение" width="200px" />
          </div>
          <Button variant="contained" endIcon={<SendIcon />} onClick={() => {ManWhoSoldTheWorld(id);}}>
            Открыть
          </Button>
          <div>
            <CodeEditor
              value={query.content}
              language="sql"
              placeholder="Please enter SQL code."
              padding={5}
              //minHeight={windowInnerHeight}
              style={{
                fontSize: 12,
                backgroundColor: "#f5f5f5",
                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
              }}
            />
          </div>
        </div>

      </div>
    </>


    ReactDOM.render(templatetabs, container)
    return container;
  }
  function clickitems(el) {
    var b = el.target;
    var parent = b.parentNode;
    var otv;
    let prevEl;
    while (!parent.classList.contains("tree")) {
      parent = parent.parentNode;
    }
    prevEl = parent.querySelectorAll('.active');
    prevEl = prevEl[0];
    console.clear();
    parent.querySelectorAll('.active').forEach(n => n.classList.remove('active'))
    b.classList.add("active");

    if (props.CLSID === "{A759DBA0-9FA2-11D5-B97A-C2A4095B2C3B}") {//http://localhost:1316/mobile~dbview/HandleSQLScript?LicGUID=9E69A024498237DD3D5485809E3167AD&ID=${id}
      let params = new Map();
      let DBviewData = document.getElementById("DBviewData");
      let DBviewTabs = document.getElementById("DBviewTabs" + b.id)
      if (DBviewTabs) {
        DBviewData.querySelectorAll('.ActivTabs').forEach(n => n.classList.replace('ActivTabs', 'noActivTabs'))
        DBviewTabs.classList.remove('noActivTabs')
        DBviewTabs.classList.add("ActivTabs")
      }
      else {
        params.set('prefix', 'dbview');
        params.set('comand', 'HandleSQLScript');
        params.set('SectionID', b.id);
        params.set('ID', b.id);
        otv = XMLrequest(params);
        if (otv) {
          //setCode(otv.content)
          DBviewData.querySelectorAll('.ActivTabs').forEach(n => n.classList.replace('ActivTabs', 'noActivTabs'))
          let container = CreateTabsView(b.id, otv)
          DBviewData.appendChild(container)
        }
      }
    }
  }

  function ShowChild(el) {
    //el.stopPropagation();
    var b = el.currentTarget.parentNode;
    var s = b.querySelector("ul")
    if (s) {
      if (s.style.display == "block" || s.style.display == "") {
        s.style.display = "none";
        b.classList.remove("openlist")
      }
      else {
        s.style.display = "block"
        b.classList.add("openlist")
      }
    }
    else {
      var ul = document.createElement("ul");
      ul.classList.add("ul-item-list")
      var otv;
      var leaf = b.getAttribute("leaf");

      if (leaf == 0) {
        let params = new Map();
        params.set('prefix', 'dbview');
        params.set('comand', 'GetGroupTree');
        params.set('SectionID', '143');
        params.set('GroupID', b.id);
        params.set('Current', b.id);
        otv = XMLrequest(params)["Tree"]["items"]
        ReactDOM.render(otv.map((item) => {
          var li = <li className={item.leaf ? "tree-leaf-1" : "tree-leaf-0"} style={!item.leaf ? { position: "relative", left: "-22px" } : { position: "relative", display: "flex" }}
            id={item.id} leaf={item.leaf ? "1" : "0"}>
            {!item.leaf ?
              <IconButton disableRipple={true} disableFocusRipple={true} edge='start' onClick={(event) => ShowChild(event)} style={{
                position: "relative", top: "-2px", background: "transparent", "padding-top": "0px", "padding-bottom": "0px"
              }}>

                <ArrowRightIcon /><div id="FolderIcon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                    <path fill="#dbb065" d="M1.5 35.5L1.5 4.5 11.793 4.5 14.793 7.5 38.5 7.5 38.5 35.5z" />
                    <path fill="#967a44" d="M11.586,5l2.707,2.707L14.586,8H15h23v27H2V5H11.586 M12,4H1v32h38V7H15L12,4L12,4z" />
                    <g>
                      <path fill="#f5ce85" d="M1.5 35.5L1.5 9.5 12.151 9.5 15.151 7.5 38.5 7.5 38.5 35.5z" />
                      <path fill="#967a44" d="M38,8v27H2V10h10h0.303l0.252-0.168L15.303,8H38 M39,7H15l-3,2H1v27h38V7L39,7z" />
                    </g>
                  </svg>
                </div>
              </IconButton> : <div id="FolderIcon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                  <path fill="#dcd5f2" d="M6,27.5c-0.827,0-1.5-0.673-1.5-1.5v-5c0-0.426,0.189-0.836,0.519-1.124L5.449,19.5l-0.431-0.376 C4.689,18.836,4.5,18.426,4.5,18v-6c0-0.426,0.189-0.836,0.519-1.124L5.449,10.5l-0.431-0.376C4.689,9.836,4.5,9.426,4.5,9V4 c0-0.827,0.673-1.5,1.5-1.5h18c0.827,0,1.5,0.673,1.5,1.5v5c0,0.426-0.189,0.836-0.519,1.124L24.551,10.5l0.431,0.376 C25.311,11.164,25.5,11.574,25.5,12v6c0,0.426-0.189,0.836-0.519,1.124L24.551,19.5l0.431,0.376 C25.311,20.164,25.5,20.574,25.5,21v5c0,0.827-0.673,1.5-1.5,1.5H6z" />
                  <path fill="#8b75a1" d="M24,3c0.551,0,1,0.449,1,1v5c0,0.385-0.218,0.634-0.348,0.747L23.791,10.5l0.861,0.753 C24.782,11.366,25,11.615,25,12v6c0,0.385-0.218,0.634-0.348,0.747L23.791,19.5l0.861,0.753C24.782,20.366,25,20.615,25,21v5 c0,0.551-0.449,1-1,1H6c-0.551,0-1-0.449-1-1v-5c0-0.385,0.218-0.634,0.348-0.747L6.209,19.5l-0.861-0.753 C5.218,18.634,5,18.385,5,18v-6c0-0.385,0.218-0.634,0.348-0.747L6.209,10.5L5.348,9.747C5.218,9.634,5,9.385,5,9V4 c0-0.551,0.449-1,1-1H24 M24,2H6C4.895,2,4,2.895,4,4v5c0,0.601,0.27,1.133,0.69,1.5C4.27,10.867,4,11.399,4,12v6 c0,0.601,0.27,1.133,0.69,1.5C4.27,19.867,4,20.399,4,21v5c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2v-5 c0-0.601-0.27-1.133-0.69-1.5C25.73,19.133,26,18.601,26,18v-6c0-0.601-0.27-1.133-0.69-1.5C25.73,10.133,26,9.601,26,9V4 C26,2.895,25.105,2,24,2L24,2z" />
                  <path fill="#7c6394" d="M9.005 17.601c.27.149.739.26 1.109.26.609 0 .919-.32.919-.76 0-.49-.3-.729-.869-1.1-.92-.56-1.27-1.27-1.27-1.879 0-1.079.72-1.979 2.119-1.979.449 0 .869.119 1.06.239l-.21 1.13c-.19-.12-.479-.23-.85-.23-.56 0-.83.34-.83.7 0 .399.2.609.92 1.049.899.54 1.22 1.22 1.22 1.93 0 1.229-.91 2.038-2.219 2.038-.54 0-1.06-.14-1.29-.27L9.005 17.601zM17.022 20.039c-.569-.24-1.219-.58-1.729-.88-.15-.08-.261-.14-.311-.14-1.319 0-2.118-1.27-2.118-3.468 0-1.81.729-3.429 2.238-3.429 1.629 0 2.069 1.789 2.069 3.328 0 1.669-.37 2.698-1.01 3.049v.05c.43.189.899.34 1.319.5L17.022 20.039zM15.813 15.512c0-1.26-.19-2.249-.77-2.249-.55 0-.83 1.01-.82 2.278-.02 1.369.23 2.339.83 2.339C15.583 17.88 15.813 16.91 15.813 15.512zM18.104 12.203h1.31v5.627h1.719v1.109h-3.028V12.203z" />
                </svg>
              </div>}

            <span onClick={(event) => clickitems(event)} id={item.id}>{item.text}</span>
          </li>
          return (li)
        }), ul)
      }
      b.appendChild(ul)
    }
  }
  fetchData()
  return (
    <div style={{}}>
      <ul class='tree' style={{ height: `${currentHeight}px`, overflow: "scroll", overflowX: "hidden", scrollbarWidth: "none" }} >
        {data.map((item) => {
          return <li
            id={item["id"]}
            className={item.leaf ? "tree-leaf-1" : "tree-leaf-0"}
            leaf={item["leaf"] ? "1" : "0"}

          >

            {!item.leaf ?
              <IconButton disableRipple={true} edge='start' onClick={(event) => ShowChild(event)} style={{ position: "relative", top: "-2px", background: "transparent", "padding-top": "0px", "padding-bottom": "0px" }}>
                <ArrowRightIcon /><div id="FolderIcon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                    <path fill="#dbb065" d="M1.5 35.5L1.5 4.5 11.793 4.5 14.793 7.5 38.5 7.5 38.5 35.5z" />
                    <path fill="#967a44" d="M11.586,5l2.707,2.707L14.586,8H15h23v27H2V5H11.586 M12,4H1v32h38V7H15L12,4L12,4z" />
                    <g>
                      <path fill="#f5ce85" d="M1.5 35.5L1.5 9.5 12.151 9.5 15.151 7.5 38.5 7.5 38.5 35.5z" />
                      <path fill="#967a44" d="M38,8v27H2V10h10h0.303l0.252-0.168L15.303,8H38 M39,7H15l-3,2H1v27h38V7L39,7z" />
                    </g>
                  </svg>
                </div>
              </IconButton> : <div id="FolderIcon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                  <path fill="#dcd5f2" d="M6,27.5c-0.827,0-1.5-0.673-1.5-1.5v-5c0-0.426,0.189-0.836,0.519-1.124L5.449,19.5l-0.431-0.376 C4.689,18.836,4.5,18.426,4.5,18v-6c0-0.426,0.189-0.836,0.519-1.124L5.449,10.5l-0.431-0.376C4.689,9.836,4.5,9.426,4.5,9V4 c0-0.827,0.673-1.5,1.5-1.5h18c0.827,0,1.5,0.673,1.5,1.5v5c0,0.426-0.189,0.836-0.519,1.124L24.551,10.5l0.431,0.376 C25.311,11.164,25.5,11.574,25.5,12v6c0,0.426-0.189,0.836-0.519,1.124L24.551,19.5l0.431,0.376 C25.311,20.164,25.5,20.574,25.5,21v5c0,0.827-0.673,1.5-1.5,1.5H6z" />
                  <path fill="#8b75a1" d="M24,3c0.551,0,1,0.449,1,1v5c0,0.385-0.218,0.634-0.348,0.747L23.791,10.5l0.861,0.753 C24.782,11.366,25,11.615,25,12v6c0,0.385-0.218,0.634-0.348,0.747L23.791,19.5l0.861,0.753C24.782,20.366,25,20.615,25,21v5 c0,0.551-0.449,1-1,1H6c-0.551,0-1-0.449-1-1v-5c0-0.385,0.218-0.634,0.348-0.747L6.209,19.5l-0.861-0.753 C5.218,18.634,5,18.385,5,18v-6c0-0.385,0.218-0.634,0.348-0.747L6.209,10.5L5.348,9.747C5.218,9.634,5,9.385,5,9V4 c0-0.551,0.449-1,1-1H24 M24,2H6C4.895,2,4,2.895,4,4v5c0,0.601,0.27,1.133,0.69,1.5C4.27,10.867,4,11.399,4,12v6 c0,0.601,0.27,1.133,0.69,1.5C4.27,19.867,4,20.399,4,21v5c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2v-5 c0-0.601-0.27-1.133-0.69-1.5C25.73,19.133,26,18.601,26,18v-6c0-0.601-0.27-1.133-0.69-1.5C25.73,10.133,26,9.601,26,9V4 C26,2.895,25.105,2,24,2L24,2z" />
                  <path fill="#7c6394" d="M9.005 17.601c.27.149.739.26 1.109.26.609 0 .919-.32.919-.76 0-.49-.3-.729-.869-1.1-.92-.56-1.27-1.27-1.27-1.879 0-1.079.72-1.979 2.119-1.979.449 0 .869.119 1.06.239l-.21 1.13c-.19-.12-.479-.23-.85-.23-.56 0-.83.34-.83.7 0 .399.2.609.92 1.049.899.54 1.22 1.22 1.22 1.93 0 1.229-.91 2.038-2.219 2.038-.54 0-1.06-.14-1.29-.27L9.005 17.601zM17.022 20.039c-.569-.24-1.219-.58-1.729-.88-.15-.08-.261-.14-.311-.14-1.319 0-2.118-1.27-2.118-3.468 0-1.81.729-3.429 2.238-3.429 1.629 0 2.069 1.789 2.069 3.328 0 1.669-.37 2.698-1.01 3.049v.05c.43.189.899.34 1.319.5L17.022 20.039zM15.813 15.512c0-1.26-.19-2.249-.77-2.249-.55 0-.83 1.01-.82 2.278-.02 1.369.23 2.339.83 2.339C15.583 17.88 15.813 16.91 15.813 15.512zM18.104 12.203h1.31v5.627h1.719v1.109h-3.028V12.203z" />
                </svg>
              </div>}
            <span onClick={(event) => clickitems(event)} id={item["id"]}> {item["text"]}</span>
          </li>
        })}
      </ul>
    </div>
  );
}
