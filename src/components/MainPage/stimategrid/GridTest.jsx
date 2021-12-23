import axios from "axios";
import { useEffect, useState } from "react";
import {createRecordSource} from "./CreateRecordSource";
import URL, { XMLrequest } from "../../Url";
import {createGrid} from "./CreateGrid";

const GridStimate =( ID)=>{
    //console.log("GridStimate")
    //const [data, setData] = useState();
    

    let source, grid , stas =document.getElementById("gridPanel");
    source = new createRecordSource();

    source.onHandleRequest = function(request){
        let params = new Map();
        params.set('prefix','dbview'); 
        params.set('comand','handleTable');
        params.set('id',ID);
        
        return XMLrequest(params,request);
    }/**/
    stas.grid = new createGrid(stas);
    stas.grid.defaultColumns = true;
    grid = stas.grid;

    grid.setSource(null);
    source.close();
    source.open();
    grid.setSource(source);
    grid.refreshSource();

}

export default GridStimate;