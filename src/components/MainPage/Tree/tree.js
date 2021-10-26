import * as React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DescriptionIcon from '@mui/icons-material/Description';
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import './tree.css';
import URL from '../../Url';

function clickitems(el) {
  var b = el.target;
  var parent = b.parentNode;
  var id = parent.id;
  var otv;
  while (!parent.classList.contains("tree")) {
    parent = parent.parentNode;
  }
  parent.querySelectorAll('.active').forEach(n => n.classList.remove('active'))
  b.classList.add("active");
  if (id) {//http://localhost:1316/mobile~dbview/HandleSQLScript?LicGUID=9E69A024498237DD3D5485809E3167AD&ID=${id}
    axios.get(URL('HandleSQLScript','143','dbview')).then((response) => {
      otv = response.data.content;
    })
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
    if (leaf == 0)
      axios.get(`http://localhost:1317/mobile~dbview/GetGroupTree?LicGUID=9E69A024498237DD3D5485809E3167AD&ObjType=0&SectionID=143&Info=0&UsedDate=0&GroupID=${b.id}&Current=${b.id}`).then((response) => {
        otv = response.data["Tree"]["items"]
        ReactDOM.render(otv.map((item) => {
          var li = <li className={item.leaf ? "tree-leaf-1" : "tree-leaf-0"} style={!item.leaf ? { position: "relative", left: "-22px" } : { position: "relative", display: "flex" }}
            id={item.id} leaf={item.leaf ? "1" : "0"}>
            {!item.leaf ?
              <IconButton disableRipple={true} disableFocusRipple={true} edge='start' onClick={(event) => ShowChild(event)} style={{ position: "relative", top: "-2px", background: "transparent" }}>
                <ArrowRightIcon /><FolderOpenIcon />
              </IconButton> : <DescriptionIcon />}

            <span onClick={(event) => clickitems(event)}>{item.text}</span>
          </li>
          return (li)
        }), ul)
      })
    b.appendChild(ul)
  }
}


export default function Tree() {

  var data = data[0]["Tree"]["items"];
  return (
    <ul className='tree'>
      {data.map((item) => {
        return <li
          id={item["id"]}
          className={item.leaf ? "tree-leaf-1" : "tree-leaf-0"}
          leaf={item["leaf"] ? "1" : "0"}>
          {!item.leaf ?
            <IconButton disableRipple={true} edge='start' onClick={(event) => ShowChild(event)} style={{ position: "relative", top: "-2px", background: "transparent" }}>
              <ArrowRightIcon /><FolderOpenIcon />
            </IconButton> : <DescriptionIcon />}
          <span onClick={(event) => clickitems(event)}> {item["text"]}</span>
        </li>
      })}
    </ul>
  );
}
