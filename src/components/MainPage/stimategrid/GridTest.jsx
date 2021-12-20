import axios from "axios";
import { useEffect, useState } from "react";
import {createRecordSource} from "./CreateRecordSource"
import URL from "../../Url";

const GridStimate =()=>{
    //console.log("GridStimate")
    const [data, setData] = useState();
    let params = new Map();
    params.set('prefix','dbview'); 
    params.set('comand','handleTable');
    params.set('id',"134");
    

    let source ;
    source = new createRecordSource();

    source.onHandleRequest = function(request){
        let params = new Map();
        let res;
        params.set('prefix','dbview'); 
        params.set('comand','handleTable');
        params.set('id',"134");
        console.log(request["command"])
        return axios.post(URL(params),JSON.stringify(request)).then(response => response.data
        ).catch((error)=>{
            
            return error
        })
        console.log(res)
        //console.log(stas)
        //return res
    }/**/
    
    source.close();
    source.open();

}

export default GridStimate;