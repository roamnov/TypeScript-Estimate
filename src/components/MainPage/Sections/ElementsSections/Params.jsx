import { Input, TextField, Typography } from "@material-ui/core";
import { Box, IconButton } from "@mui/material";
import { Splitter, SplitterItem, SplitterBar } from 'smart-webcomponents-react/splitter';
import Editor from "../../../Editor/Editor";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Split from 'react-split'
import React from "react";
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
    function CreateNameParams() {
        var display = []
        for (let i = 0; i <= data.length - 1; i = i + 1) {
            let item = data[i];
            let Options = (item.Options & ParamSetOption_Disabled)|| (item.Options & ParamSetOption_Hidden) ? "none" : "flex";

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
                paddingLeft: padding}} 
            data-level = {level ? level :''}>
                <Box style={{height: "24px", width: "24px" }} >
                    {level < levelNext ? <IconButton style={{ padding: "0px" }}>
                        <ArrowRightIcon />
                    </IconButton> : <Box style={{height: "24px", width: "24px" }}></Box>}

                </Box>
                <Box style={{
                    display: Options,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    height: "24px",
                    borderBottom: "1px solid",
                    paddingTop: "5px"
                }}>
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
                    var display = (item.Options & ParamSetOption_Disabled)|| (item.Options & ParamSetOption_Hidden) ? "none" : "flex"
                    return <Box style={{ display: display, overflow: "hidden", whiteSpace: "nowrap" }}>
                        <Editor value={item.Value ? item.Value : ""} 
                        EditStyle={item.EditStyle} style={{ height: "24px" }} 
                        mask={item.EditMask} 
                        id = {item.ID} 
                        CLSID = {item.CLSID} 
                        Path = {props.data.Path}
                        ObjRef = {item.ObjRef}
                        EditVal = {item.EditVal}
                        />
                    </Box>
                })}

            </Box>
        </Split>

    )
}