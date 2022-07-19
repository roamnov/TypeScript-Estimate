import { Input, TextField, Typography } from "@material-ui/core";
import { Box, IconButton } from "@mui/material";
import { Splitter, SplitterItem, SplitterBar } from 'smart-webcomponents-react/splitter';
import Editor from "../../../Editor/Editor";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Split from 'react-split'
import React from "react";
import ReactDOM from 'react-dom';
import { XMLrequest } from '../../../Url';
export default function Params(props) {
    const [data, SetData] = React.useState(props.data.Items)
    //var data = props.data.Items;
    const ParamSetOption_Disabled = 1;
    const ParamSetOption_InConfig = 2;
    const ParamSetOption_Calculated = 4;
    const ParamSetOption_Detalization = 8;
    const ParamSetOption_Markable = 16;
    const ParamSetOption_Collapsed = 32;
    const ParamSetOption_Reference = 64;
    const ParamSetOption_RedNegative = 128;
    const ParamSetOption_Inspector = 256;
    const ParamSetOption_Grid = 512;
    const ParamSetOption_Sortable = 1024;
    const ParamSetOption_Filterable = 2048;
    const ParamSetOption_Override = 4096;
    const ParamSetOption_Hidden = 8192;
    const ParamSetOption_History = 16384;
    const ParamSetOption_CanGroup = 32768;
    const ParamSetOption_Fixed = 65536;
    const ParamSetOption_NotEdit = 131072;
    function ShowHideParams(e) {
        let el = e.currentTarget;

        let NameParam = el.parentNode.parentNode;
        let lvl = Number(NameParam.dataset.level)
        let NextEl = NameParam.nextElementSibling;
        let NextLvl = Number(NextEl.dataset.level);
        // let ValParam = document.getElementById("item_params_reports" + props.SectionID + "_" + props.id)
        /*  if (!ValParam)
              ValParam = document.getElementById("params_" + props.SectionID + "_" + props.id)
  
          ValParam = ValParam.querySelector(`div[data-id='Value_${NameParam.dataset.id}']`)*/

        let ValNextEl = NameParam.nextElementSibling;
        let params = new Map();
        params.set('prefix', 'programs');
        params.set('comand', 'ParamCollapsed');
        params.set('ID', NameParam.dataset.id);
        params.set('Path', props.data.Path);
        if (NameParam.dataset.collapsed === "1") {
            params.set('Collapsed', "0");
            NameParam.dataset.collapsed = 0;
            el.style.transform = "rotate(0deg)"
            while ((NextLvl - lvl) === 1) {
                NextEl.style.display = ""
                NextEl = NextEl.nextElementSibling;
                NextLvl = Number(NextEl.dataset.level);
                ValNextEl.style.display = ""
                ValNextEl = ValNextEl.nextElementSibling;
            }
        }
        else {
            NameParam.dataset.collapsed = 1;
            params.set('Collapsed', "1");
            el.style.transform = "rotate(-90deg)"
            while (lvl < NextLvl) {
                NextEl.style.display = "none"
                NextEl = NextEl.nextElementSibling;
                NextLvl = Number(NextEl.dataset.level);
                ValNextEl.style.display = "none"
                ValNextEl = ValNextEl.nextElementSibling;
            }
        }
        XMLrequest(params)
    }
    function onDropDownList(el) {
        let res = new Map();
        let params = new Map();
        params.set('prefix', 'programs');
        params.set('comand', 'GetParamValues');
        params.set('ID', el.dataId);
        params.set('Path', props.data.Path);
        let otv = XMLrequest(params).Items
        for (let i = 0; i <= otv.length - 1; i = i + 1) {
            let item = otv[i];
            if (item.id) {
                res.set(otv[i].id, otv[i].text)
            }
            else
                res.set(i, otv[i])
        }
        /*  for (var key in otv) {
              //if (otv.hasOwnProperty(key)) {
                if (otv[key].id)
                res.set(otv[key].id, otv[key].text)
                else
                res.set(0, otv[key])
              
            }*/
        return res
    }

    function onEdit(ev, TextChanged) {
        let el
        if (ev.type == "change") {
            el = ev.currentTarget
        }
        else {
            el = ev;
            TextChanged = 0
        }
        if (el) {
            let val
            val = el.value;
            if (el.type == 'date') {
                val = val.split("-");
                val = val[2] + "." + val[1] + "." + val[0]
            }
            let params = new Map();
            params.set('prefix', 'programs');
            params.set('comand', 'SetParamProperty');
            params.set('ID', el.dataset.id);
            params.set('Path', props.data.Path);
            //  if (TextChanged)
            params.set('TextChanged', "1")
            //  else
            //     params.set('TextChanged', "0")
            params.set('WSM', "1");
            if (val !== "")
                params.set('Value', val);
            if (el.dataset.checkstate)
                params.set('CheckState', el.dataset.checkstate)
            if (el.dataset.objref)
                params.set('ObjRef', el.dataset.objref)
            else
                params.set('ObjRef', 0)
            let otv = XMLrequest(params);
            if (otv) {
                //  el.value = otv.Values[0].Value;
                // el.setAttribute("data-objref", otv.Values[0].ObjRef)
                //  el.setAttribute("data-id", otv.Values[0].ID)
                if (otv.NeedRefresh) {
                    let params = new Map();
                    params.set('prefix', 'reports');
                    params.set('comand', 'GetReportParams');
                    params.set('ReportID', props.id);
                    params.set('SectionID', props.SectionID);
                    params.set('NeedRefresh', 1);
                    let data = XMLrequest(params);
                    SetData(data.Items)
                }
                else return val

            }

        }
    }
    var tMouse = {
        // isMouseDown
        // tMouse.target
        // tMouse.targetWidth
        // targetPosX
    };
    //  window.addEventListener("mousemove", MouseMove);
    // window.addEventListener("mouseup", MouseUp);
    function MouseDown(e) {

        tMouse.isMouseDown = true;
        let element = e.target.parentElement.parentElement.parentElement.parentElement;
        tMouse.parent = element
        element = element.querySelector("td")
        tMouse.target = element;
        tMouse.targetWidth = element.clientWidth;
        tMouse.targetPosX = element.getBoundingClientRect().x;
    }
    function MouseMove(e) {
        if (tMouse.target || tMouse.isMouseDown) {
            let size = (e.clientX - tMouse.targetWidth) - tMouse.targetPosX;
            let width = tMouse.targetWidth + size
            let widthTable = tMouse.parent.getBoundingClientRect().width
            let proc = (width / widthTable) * 100
            let proc2 = 100 - proc
            if ((proc < 30))
                proc = 30
            else if (proc2 < 30)
                proc = 70
            tMouse.target.style.width = proc + "%";
            tMouse.target.nextElementSibling.style.width = 100 - proc + "%"
        }
    }
    function MouseUp(e) {
        tMouse = {}
    }

    function CreateEdit(event, item) {
        HiddenEdit(event.target.parentNode.parentNode.parentNode, event.target)
        let container = document.createElement("div")
        let val = item.EditVal ? item.EditVal : item.value
        if (item.EditStyle == 2) {
            val = val.split(".")
            if (val.length) {
                val = val[2] + "-" + val[1] + "-" + val[0]
            }
            else
                val = item.EditVal ? item.EditVal : item.value
        }
        let edit = <Editor value={val}
            EditStyle={item.EditStyle}
            style={{ height: "24px" }}
            mask={item.EditMask}
            id={item.ID}
            CLSID={item.CLSID}
            Path={props.data.Path}
            ObjRef={item.ObjRef}
            EditVal={item.EditVal}
            SectionID={props.SectionID}
            //  setdata={SetData}
            onDropDownList={onDropDownList}
            // onEdit={onEdit}
            ReportID={props.id}
            CheckState={item.CheckState}
            MultiCheckSet={item.MultiCheckSet}
            Type="ParamItem"
        />
        ReactDOM.render(edit, container)
        event.target.innerHTML = ""

        event.target.appendChild(container.children[0])
        let input = event.target.querySelector("input")
        input.style.border = "none"
        input.style.borderRadius = "";
        input.style.transition = ""
        input.focus()
    }
    function HiddenEdit(parent, td) {
        let edit = parent.querySelectorAll(".text-field__icon")
       
        for (let n = 0; n <= edit.length - 1; n++) {
            let el = edit[n];
            let val = td.innerHTML
            let inp = el.querySelector("input")
            let otv = onEdit(inp)//.dispatchEvent(new Event('change'))

            if (otv) el.parentNode.innerHTML = otv
            else
            
            el.remove()
        }

    }
    return (
        <table onMouseMove={MouseMove}
            onMouseUp={MouseUp}
            id={"params_" + props.SectionID + "_" + props.id}
            style={{ borderSpacing: '0px', tableLayout: "fixed", width: "100%" }}>
            <tbody>
                {data.map((item, i) => {
                    var display = (item.Options & ParamSetOption_Disabled) || (item.Options & ParamSetOption_Hidden) ? "none" : ""
                    let level = Number(item.Level);
                    let levelNext
                    if (data[i + 1])
                        levelNext = Number(data[i + 1].Level);
                    if (!level) {
                        level = 0;
                    }
                    let padding = level * 24;
                    return (
                        <tr style={{ display: display }}
                            data-level={level ? level : '0'}
                            data-collapsed={item.Options & ParamSetOption_Collapsed ? 1 : 0}
                            data-id={item.ID}>
                            <td data-level={level ? level : '0'}
                                data-collapsed={item.Options & ParamSetOption_Collapsed ? 1 : 0}
                                data-id={item.ID}
                                style={{ borderBottom: "1px solid", position: "relative", whiteSpace: "nowrap", paddingLeft: padding ? padding : 12 }}>
                                <span
                                    style={{
                                        display: "block",
                                        position: "relative",
                                        textOverflow: "clip",
                                        overflow: "hidden"
                                    }}>
                                    {item.Name}
                                </span>
                                {level < levelNext ?
                                    <img onClick={(e) => ShowHideParams(e)} style={{ transform: item.Options & ParamSetOption_Collapsed ? "rotate(-90deg)" : "", height: "10px", width: "10px", position: "absolute", left: level * 12, top: "calc(50% - 5px)" }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAv0lEQVQ4jd3QsUrDYBQF4C8UxK5FXAM+hXN8AqmLD2AdKmbJUOjsHOzcB3ERwU1XsW8iYgd1uYGQ/oHMOfDD4d5z7rn3Z1Q4RTFAV4QWTFrmLc5whF2P+QqXuMYzviDDC/LgmxCmzJvQ5OHJmg2OcY5XPGGBGT6iP8cF7vGHG3ziLWsl3OIED5FS4x0/Yb7DLyrsY5sDlFgFb4bUwUWvTP5OZ5N1ol7FCYPQHdJrzlLFQIlp8G88Dk1vYxlvzPgH4I0f/Ofj0OAAAAAASUVORK5CYII="></img>
                                    : <></>}
                                <div style={{ width: "3px", height: "100%", position: "absolute", right: "0px", backgroundColor: "#d3d3d3", top: "0px", cursor: "col-resize" }}
                                    onMouseDown={MouseDown}
                                >
                                </div>
                            </td>
                            <td
                                style={{ borderBottom: "1px solid", position: "relative", whiteSpace: "nowrap", width: "50%" }}
                                onClick={(e) => CreateEdit(e, item)}
                            >
                                {item.Value ? item.Value : ""}
                            </td>
                        </tr>
                    )


                })
                }
            </tbody>
        </table>
    )
}