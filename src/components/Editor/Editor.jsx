import * as React from 'react';
import ReactDOM from 'react-dom';
import { IconButton, Box } from "@material-ui/core";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TextField from '@mui/material/TextField';
import { MaskedTextBox } from 'smart-webcomponents-react/maskedtextbox';
import { Input } from 'smart-webcomponents-react/input';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { DateTimePicker } from 'smart-webcomponents-react/datetimepicker';
import { XMLrequest } from '../Url';
export default function Editor(props) {
  const [blur, setBlur] = React.useState();
  let DropList, list;
  const EditStyle_PickList = 1;
  const EditStyle_Calendar = 2;
  const EditStyle_Check = 4;
  const EditStyle_UpDown = 8;
  const EditStyle_Ellipsis = 16;
  const EditStyle_CheckList = 32;
  const EditStyle_ReadOnly = 64;
  const EditStyle_EditList = 128;
  const EditStyle_ColorBox = 256;
  const EditStyle_AutoList = 512;
  const EditStyle_Password = 1024;

  function HoverItem(e) {
    let div = e.currentTarget;
    div.classList.remove("css-yt9ioa-option")
    div.classList.add("select__option--is-focused")
    div.classList.add("select__option--is-selected")
    div.classList.add("css-9gakcf-option")
  }
  function NoHoverItem(e) {
    let div = e.currentTarget;
    div.classList.add("css-yt9ioa-option")
    div.classList.remove("select__option--is-focused")
    div.classList.remove("select__option--is-selected")
    div.classList.remove("css-9gakcf-option")
  }
  function ClickListMenu(e) {
    let div = e.currentTarget;
    let parent;
    parent = div;
    while (!parent.classList.contains("basic-single")) {
      parent = parent.parentNode;
    }
    let lbl = parent.querySelector("#react-select-3-placeholder")
    if (lbl) {
      lbl.innerText = div.innerText;
      let indexVal = div.getAttribute("indexval")
      if (props.onCloseUpList)
        props.onCloseUpList(indexVal)
    }
    let list = parent.querySelector("div.select__menu")
    if (list) {
      list.remove();
    }
  }

  function onDropDownList(e) {
    function CreateList(items) {
      let itemList
      let it = [];
      for (let pair of items) {
        it.push(<div className="select__option css-yt9ioa-option" aria-disabled="false" id={"react-select-53-option-" + pair[0]} tabindex="-1" onMouseOver={(ev) => { HoverItem(ev) }}
          onMouseOut={(ev) => { NoHoverItem(ev) }} onClick={(e) => ClickListMenu(e)} indexval={pair[0]}>
          {pair[1]}
        </div>)
      }
      itemList = <>{it.map((item) => { return item })}</>
      return itemList
    }
    let div = e.currentTarget;
    if (props.GetObjectValues) {
      list = props.GetObjectValues()
      let DropListmenu
      if (list) {
        DropListmenu = <div className="select__menu-list css-11unzgr">
          {
            CreateList(list)
          }
        </div>
      }
      let divList = document.createElement("div")
      divList.classList.add("select__menu")
      divList.classList.add("css-26l3qy-menu")
      ReactDOM.render(DropListmenu, divList);
      let parent;
      parent = div;
      while (!parent.classList.contains("basic-single")) {
        parent = parent.parentNode;
      }
      if (parent) {
        parent.appendChild(divList);
      }
    }
  }

  if (props.list) {
    list = props.list.split(',')
  }
  function EnterValue(ev) {
    if (ev.keyCode == 13) {
      let el = ev.currentTarget;
      let val = el.dataset.value;
      let params = new Map();
      params.set('prefix', 'programs');
      params.set('comand', 'SetParamProperty');
      params.set('ID', el.dataId);
      params.set('Path', el.dataPath);
      params.set('TextChanged', "1");
      params.set('WSM', "1");
      params.set('Value', val);
      params.set('CheckState', 0);
      params.set('ObjRef', el.dataObjref);
      let otv = XMLrequest(params);
      if (otv) {


      }
    }
  }
  function EditFocus(e) {
    let el = e.currentTarget;
    setBlur(e.currentTarget)
    let val = el.dataEditval;
    if (val) el.value = val
  }
  function SetValueEdit (e) {
    let el = blur;
    let val = el.dataValue;
    if (val) el.value = val
  }

  DropList = props.EditStyle & EditStyle_Calendar ? <Box data-id={props.id} style={{ position: "relative", width: "100%", ...props.style }}>
    <Input style={{ width: "100%", height: "100%" }} type="date" value={props.value} />
  </Box> :
    <Box style={{ position: "relative", width: "100%", ...props.style }}>
      <Box data-id={props.id} >
        {props.mask ?
          <MaskedTextBox data-id={props.id} onKeyDown={(ev) => EnterValue(ev)} style={{ height: props.style.height, padding: "0px", width: "100%" }} value={props.caption ? props.caption : props.value ? props.value : ""} mask={props.mask} /> :
          <Input data-path={props.Path}
            data-id={props.id}
            data-objref={props.ObjRef}
            data-editval={props.EditVal}
            onKeyDown={(ev) => EnterValue(ev)}
            onClick={(e) => EditFocus(e)}
            onBlur ={(e) =>SetValueEdit(e)}
            value={props.caption ? props.caption : props.value ? props.value : ""}
            data-value={props.caption ? props.caption : props.value ? props.value : ""}
            style={{ height: props.style.height, padding: "0px", width: "100%" }} >
          </Input>
        }
      </Box>
      <Box style={{ position: "absolute", top: "0px", right: "0px" }}>
        <div className="select__indicators css-1wy0on6">
          {props.EditStyle ?
            <span className="select__indicator-separator css-1okebmr-indicatorSeparator"></span>
            : <></>
          }
          {props.EditStyle & EditStyle_Ellipsis ?
            <div aria-hidden="true" onClick={(event) => onDropDownList(event)}>
              <IconButton style={{ padding: "0px" }}><MoreHorizIcon style={{ position: "relative", top: "3px" }} /></IconButton>
            </div>
            : <></>
          }
          {props.EditStyle & EditStyle_PickList ?
            <div aria-hidden="true" onClick={(event) => onDropDownList(event)}>
              <IconButton style={{ padding: "0px" }}><ArrowDropDownIcon /></IconButton>
            </div>
            : <></>
          }
          {props.EditStyle & EditStyle_UpDown ?
            <div className="select__indicator select__dropdown-indicator css-tlfecz-indicatorContainer" aria-hidden="true" onClick={(event) => onDropDownList(event)}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <IconButton style={{ padding: "0px", height: "12px" }}><ArrowDropUpIcon style={{ position: "relative", top: "2px", height: "100%" }} viewBox="6 5 12 12" /></IconButton>
                <IconButton style={{ padding: "0px", height: "12px" }}><ArrowDropDownIcon style={{ position: "relative", top: "-1px", height: "100%" }} viewBox="6 5 12 12" /></IconButton>
              </div>
            </div> :
            <></>
          }

        </div>
      </Box>
    </Box>
  return DropList
}