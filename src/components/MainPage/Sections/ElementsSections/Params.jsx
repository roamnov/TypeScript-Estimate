import { Input, TextField, Typography } from "@material-ui/core";
import { Box, IconButton } from "@mui/material";
import { Splitter, SplitterItem, SplitterBar } from 'smart-webcomponents-react/splitter';
import Editor from "../../../Editor/Editor";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Split from 'react-split'
import React from "react";
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
        let ValParam = document.getElementById("item_params_reports" + props.SectionID + "_" + props.id).querySelector(`div[data-id='Value_${NameParam.dataset.id}']`)
        let ValNextEl = ValParam.nextElementSibling;
        let params = new Map();
        params.set('prefix', 'programs');
        params.set('comand', 'ParamCollapsed');
        params.set('ID', NameParam.dataset.id);
        params.set('Path', props.data.Path);
        if (NameParam.dataset.collapsed === "1") {
            params.set('Collapsed', "0");
            NameParam.dataset.collapsed = 0;
            el.style.transform = "rotate(90deg)"
            while (lvl < NextLvl) {
                NextEl.style.display = "flex"
                NextEl = NextEl.nextElementSibling;
                NextLvl = Number(NextEl.dataset.level);
                ValNextEl.style.display = "flex"
                ValNextEl = ValNextEl.nextElementSibling;
            }
        }
        else {
            NameParam.dataset.collapsed = 1;
            params.set('Collapsed', "1");
            el.style.transform = ""
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
    function onDropDownList (el) {
        let res = new Map();
        let params = new Map();
        params.set('prefix', 'programs');
        params.set('comand', 'GetParamValues');
        params.set('ID', el.dataId);
        params.set('Path', props.data.Path);
        let otv = XMLrequest(params).Items
        for (let i = 0; i<=otv.length - 1; i = i + 1)
        {
            let item = otv[i];
            if (item.id)
            {
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
    function CreateNameParams() {
        var display = []
        for (let i = 0; i <= data.length - 1; i = i + 1) {
            let item = data[i];
            let Options = (item.Options & ParamSetOption_Disabled) || (item.Options & ParamSetOption_Hidden) ? "none" : "flex";
            let level = Number(item.Level);
            let levelNext
            if (data[i + 1])
                levelNext = Number(data[i + 1].Level);
            if (!level) {
                level = 0;
            }
            let padding = level * 12;
            display.push(<Box style={{
                display: Options,
                overflow: "hidden",
                whiteSpace: "nowrap",
                height: "24px",
                borderBottom: "1px solid",
                paddingLeft: padding
            }}
                data-level={level ? level : '0'}
                data-collapsed={props.Options & ParamSetOption_Collapsed ? 1 : 0}
                data-id={item.ID}>
                <Box style={{ height: "24px", width: "24px" }} >
                    {level < levelNext ? <IconButton style={props.Options & ParamSetOption_Collapsed ? { padding: "0px" } : { padding: "0px", transform: "rotate(90deg)" }} onClick={(e) => ShowHideParams(e)}>
                        <ArrowRightIcon />
                    </IconButton> :
                        <Box style={{ height: "24px", width: "24px" }}>
                        </Box>}
                </Box>
                <Box style={{
                    display: "flex",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    height: "24px",
                    borderBottom: "1px solid",
                    paddingTop: "5px"
                }}
                >
                    {item.Name}
                </Box>
            </Box>)
        }
        let p = <>{display.map((i) => { return i })}</>
        return p
    }
    return (
        <Split className="wrap" sizes={[50, 50]}>
            <Box>{CreateNameParams()}</Box>
            <Box>
                {data.map((item) => {
                    var display = (item.Options & ParamSetOption_Disabled) || (item.Options & ParamSetOption_Hidden) ? "none" : "flex"
                    return <Box data-id={"Value_" + item.ID} data-level={item.Level ? item.Level : '0'} style={{ display: display, overflow: "hidden", whiteSpace: "nowrap", width: "calc(100% + 5px)" }}>
                        <Editor value={item.Value ? item.Value : ""}
                            EditStyle={item.EditStyle} style={{ height: "24px" }}
                            mask={item.EditMask}
                            id={item.ID}
                            CLSID={item.CLSID}
                            Path={props.data.Path}
                            ObjRef={item.ObjRef}
                            EditVal={item.EditVal}
                            SectionID={props.SectionID}
                            setdata={SetData}
                            onDropDownList = {onDropDownList}
                            ReportID={props.id}
                            CheckState = {item.CheckState}
                            MultiCheckSet = {item.MultiCheckSet}
                            Type = "ParamItem"
                        />
                    </Box>
                })}

            </Box>
        </Split>

    )
}