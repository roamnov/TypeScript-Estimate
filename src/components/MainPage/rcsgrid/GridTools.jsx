
'use strict';
import  {get_cookie, XMLrequest} from "../../Url"
import Editor from "../../Editor/Editor";
import * as React from 'react';
import ReactDOM from 'react-dom';
import {createGrid, createRecordSource} from "./rcsgrid"


const ManWhoSoldTheWorld = (IDbd, Path)=>{

var dataId = 0, source = null, grid = null;

function Init(testID, PathIn) {
    //initGrid(document.getElementById("gridPanel"));
    
    function initGrid(gridPanel, testBD, PathInInit) {
        

        source = new createRecordSource();
       
        source.onHandleRequest = function(request) {
            let params = new Map();
            if(PathInInit === undefined){
                params.set('prefix','dbview'); 
                params.set('comand','handleTable');
                params.set('id',testBD);
            }else{
                params.set('prefix','programs'); 
                params.set('comand','HandleTable');
                params.set("Path",PathInInit);
                params.set('SectionID',testBD);
            }
            
            return XMLrequest(params, request);
        };

        gridPanel.grid = new createGrid(gridPanel);
        gridPanel.grid.defaultColumns = true;
        grid = gridPanel.grid;

        grid.setSource(null);
        source.close();
        source.open();
        grid.setSource(source);
        grid.refreshSource();    
    }

    //let json = Stimate.synchRequest('project/enter', {configName: 'webtools_hidden.drx', userName: 'webadmin'}); 
    //json = Stimate.synchRequest('dbview/uploadfile', {fileName: 'D:\\Temp\\table.trs'});
    //if (json) dataId = json.ID;
    var grP = document.getElementById("gridpanel"+IDbd)
    if(grP){
        grP.innerHTML = ""
        initGrid(grP, testID, PathIn);
    }
    
}
return(
    <>
    {Init(IDbd, Path)}
    </>
)
}
export default ManWhoSoldTheWorld;