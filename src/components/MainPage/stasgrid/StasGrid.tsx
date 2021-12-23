import { Grid } from "@material-ui/core";
import {useState, useEffect} from "react"
import { XMLrequest } from "../../Url";


export function SGrid(){
    const [GetFieldsData, setGetFieldsData] = useState([]);
    useEffect(() => {
       PostGetFields({
        command:"getFields"
       })
       
    }, [])


    const PostGetFields=(PostData:any)=>{
        let params = new Map();
        params.set('prefix','dbview'); 
        params.set('comand','handleTable');
        params.set('id',"164");
        setGetFieldsData(XMLrequest(params,PostData))
    
    }


    const backFields =() =>{
        let params = new Map();
        params.set('prefix','dbview'); 
        params.set('comand','handleTable');
        params.set('id',"164");
        
        let arr = [],Name,Width, json = XMLrequest(params,{command:"getFields"})["Fields"];
        for (const [key, value] of Object.entries(json)) {
            Name = json[key]["Name"]
            Width = json[key]["Width"]
            console.log(Name )
            arr.push(<td style={{width:`${Width}0px`, textAlign:"center"}}>{Name}</td>)
            //console.log(value)
        }
        return arr
    
    }
        
    console.log(GetFieldsData)

    return(
        <div style={{position: 'relative', left: '0px', top: '0px', width: '100%', height:`100%`}}>
            <table>
                <tr>
                {backFields()}  
                </tr>
            
            </table>
        </div>
    )}
