//import ResizePanel from "react-resize-panel";
import Tree from '../Windows/ViewData/Tree/tree';
import Button from "@mui/material/Button"
import Tooltip from '@mui/material/Tooltip';
import ManWhoSoldTheWorld from '../stimategrid/test'
import { clickTab } from '../Windows/ViewData/Tree/tree'
import SectionToolsJS from '../Tools/SectionToolsJS';
import Split from 'react-split'
import { Splitter, SplitterItem } from 'smart-webcomponents-react/splitter';



export default function SectionsDBview(props) {
    function OpenData(ev) {
        let tree = document.querySelector("#DBviewTree smart-tree");
        let tabs
        if (tree) {
            let SelectItemTree = tree.querySelector(".ActivTree");
            if (SelectItemTree) {
                    let idItem = SelectItemTree.id.split("_")[1]
                    if (idItem) {
                        tabs = document.getElementById("tabDataView"+idItem)
                        tabs = tabs.querySelector("smart-tabs")
                        tabs.select(0)
                       // clickTab(document.getElementById("tab1_" + idItem))
                        ManWhoSoldTheWorld(idItem)
                    }
                }
            }
        
    }

    let defaultButton = <Tooltip title="Показать данные" >
        <Button variant="outlined" style={{ textTransform:"none"}} size="small" onClick={(ev) => OpenData(ev)}>
            Открыть
        </Button>
    </Tooltip>
    
    let DBview = <div id="SectionsDBview" >
        <div style={{ height: "45px" }}>

            <SectionToolsJS WorkPlaceTools={props.WorkPlaceTools} ID={props.id} defaultButton={defaultButton} />
        </div>
        <div style = {{height: "100%", position: "relative"}}>
            <Splitter style = {{width: "100%", height: "100%"}}>
                <SplitterItem size="40%" collapsible id="item_DBviewTree">
                    <div id="DBviewTree" >
                        <Tree CLSID={props.CLSID} multiCheck={false} SectionID = {props.id} Module = "DBView"/>
                    </div>
                </SplitterItem>
                <SplitterItem size="60%" id="item_DBviewData" style = {{ height: "auto"}}>
                    <div id="DBviewData" style = {{height: "100%"}}>
                    </div>
                </SplitterItem>
            </Splitter>
        </div>
    </div >
    return (DBview);
}