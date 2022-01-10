import axios from "axios";
import { useEffect, useState } from "react";
import {createRecordSource} from "./CreateRecordSource"
import URL, { XMLrequest } from "../../Url";

const GridStimate =(gridPanel)=>{
    //console.log("GridStimate")
    const [data, setData] = useState();
    

    let source ;
    source = new createRecordSource();

    source.onHandleRequest = function(request){
        let params = new Map();
        params.set('prefix','dbview'); 
        params.set('comand','handleTable');
        params.set('id',"134");
        
        return XMLrequest(params,request);
    }/**/
    
    source.close();
    source.open();

}

export default GridStimate;