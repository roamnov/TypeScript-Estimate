@@ -1,137 +1,138 @@
import * as React from 'react';
import ReactDOM from 'react-dom';
export default function Editor(props) {
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
      let indexVal =div.getAttribute("indexval")
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
  DropList = <div className="basic-single css-b62m3t-container" style={props.style}>
    <span id="react-select-3-live-region" className="css-7pg0cj-a11yText">
    </span>
    <span aria-live="polite" aria-atomic="false" aria-relevant="additions text" className="css-7pg0cj-a11yText">
    </span>
    <div className="select__control css-1s2u09g-control">
      <div className="select__value-container css-1d8n9bt">
        <div className="select__placeholder css-14el2xx-placeholder" id="react-select-3-placeholder">
          {props.caption}
        </div>
        <input
          id="react-select-3-input"
          tabindex="0"
          inputmode="none"
          aria-autocomplete="list"
          aria-expanded="false"
          aria-haspopup="true"
          aria-controls="react-select-3-listbox"
          aria-owns="react-select-3-listbox"
          role="combobox"
          aria-readonly="true"
          aria-describedby="react-select-3-placeholder"
          className="css-1hac4vs-dummyInput"
          value="" />
      </div>
      <div className="select__indicators css-1wy0on6">
        {props.EditStyle ?
          <span className="select__indicator-separator css-1okebmr-indicatorSeparator">
          </span>
          : <></>
        }
        {props.EditStyle & EditStyle_PickList ?
          <div className="select__indicator select__dropdown-indicator css-tlfecz-indicatorContainer" aria-hidden="true" onClick={(event) => onDropDownList(event)}>
            <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-8mmkcg">
              <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z">
              </path>
            </svg>
          </div>
          : <></>
        }
      </div>
    </div>
    <input name="color" type="hidden" value="" />
  </div>
  return DropList
}