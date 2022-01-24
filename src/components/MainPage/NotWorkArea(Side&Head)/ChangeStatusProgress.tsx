import  React from 'react';
import {  Grid,  LinearProgress } from "@mui/material"
import URL, { XMLrequest } from '../../Url';
import axios from 'axios';
import ReactDOM from 'react-dom';


//
//https://mui.com/components/toggle-button/
//
const ChangeStatusProgressFooter = (Json:any) =>{
    const [Progress, setProgress] = React.useState(0);
    const [data, setData] = React.useState({}); 
    const [Title, setTitle]= React.useState("");

    React.useEffect(()=>{
        tokenProcessing(data)
    }, [data])

    React.useEffect(()=>{
        tokenProcessing(Json.Json)
    }, [Json])

    async function ChangeProgress( RequestID:any){
        let params = new Map, data;
        data = { "Result":"" }
        params.set('prefix', 'project');
        params.set("comand", "ResumeRequest");
        params.set("RequestID", RequestID);
        params.set("WSM", "1");
        await axios.post(URL(params),JSON.stringify(data)).then((res)=> setData(res.data))
    }


    const normalise = (value:any, MAX:any) => ((Number(value) - 0) * 100) / (Number(MAX) - 0); 

    function  tokenProcessing (json: any ){///project~ResumeRequest?LicGUID=D100CAB54337ED32E087B59F6CE41511&RequestID=18892&WSM=1 HTTP/1.1
        if(json.Break !== undefined){
            
            let  Token, RequestID:any;
        
    
            Token = json.Token;
            RequestID= json.Params.RequestID;
            if(Token === "ChangeStatusProgress"){
                let Count,Stop,Title, Index;
                Count = json.Params.Count;
                Stop = json.Params.Stop;
                Title = json.Params.Title;
                Index = json.Params.Index;
                if(isNaN(Index)) Index = 0;
                if (Title !== undefined) setTitle(Title);
                setProgress(normalise(Index,Count))  
                ChangeProgress(RequestID);
                
            }
        }else if(isNaN(Progress)){
            ReactDOM.render(<></> , document.getElementById('footerProgress'));
        }
    }

    return(
        <Grid container sx={{pl:2}} direction="row" justifyContent="flex-start" alignItems="center" style={{width:"400px", height:"20px"}} spacing={1}>
            <Grid item>
                <LinearProgress variant="determinate" value={Progress} style={{height:"10px", width:"100px"}}/>
            </Grid>
            <Grid item>
                {Title}
            </Grid>
        </Grid>
    )
}

export default ChangeStatusProgressFooter
