import * as React from 'react';
import ReactDOM from 'react-dom';
import ResizePanel from '../ResizebleComponent/ResizebleComponent';
import Tree from '../Windows/ViewData/Tree/tree';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function SectionsDBview(props) {
    let DBview = <div id="SectionsDBview" >
        <div id="DBviewTree">
            <Tree CLSID={props.CLSID} />
        </div>
        <div id="DBviewData" >
           
        </div>
    </div >
    return (DBview);
}