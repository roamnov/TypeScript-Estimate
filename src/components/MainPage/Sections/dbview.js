import * as React from 'react';
import ReactDOM from 'react-dom';
import ResizePanel from '../ResizebleComponent/ResizebleComponent';
import Tree from '../Windows/ViewData/Tree/tree';
import { Button } from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';
import ManWhoSoldTheWorld from '../stimategrid/test'
import {clickTab} from '../Windows/ViewData/Tree/tree'
import {SelectIconSave} from '../../../components/MainPage/MainFile'
export default function SectionsDBview(props) {
    function OpenData()
    {
        let tree = document.getElementById("TreeDBView");
        if (tree) {
            let SelectItemTree = tree.querySelector(".SelectItemTree");
            if (SelectItemTree) {
                let span = SelectItemTree.querySelector("span.rct-title")
                if (span) {
                    let idItem = span.id.split("_")[1]
                    if (idItem) {
                        clickTab(document.getElementById("tab1_"+idItem))
                        ManWhoSoldTheWorld(idItem)
                    }
                }
            }
        }
    }
  
    let DBview = <div id="SectionsDBview" >
        <div style = {{height: "45px"}}>
            <Tooltip title="Показать данные" >
                <Button variant="outlined" size="small" onClick={() => OpenData()}>
                    Открыть
                </Button>
                
            </Tooltip>
        </div>
        <div style={{display: "flex"}}>
            <div id="DBviewTree">
                <Tree CLSID={props.CLSID} multiCheck={false} />
            </div>
            <div id="DBviewData" >

            </div>
        </div>
    </div >
    return (DBview);
}