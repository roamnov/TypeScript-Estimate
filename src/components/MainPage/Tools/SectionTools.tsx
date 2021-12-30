import  React, { useEffect } from 'react';
import {  Backdrop, Button, Grid, IconButton, LinearProgress, Tooltip, } from "@mui/material"
import URL, { XMLrequest } from '../../Url';
import axios from 'axios';
import { ImgURL } from "../../Url";
import { ButtonForST } from './ComponentsForSectionToolsButtons';
import ModalContainer from '../../Containers/ModalContainer';
import items from "./Items.json"
import AlertMini from '../../AlertMini';
import { SectionToolsToFooter } from '../../ComponentInterface';



//
//https://mui.com/components/toggle-button/
//
const SectionTools = (props:SectionToolsToFooter) =>{
    const [testProgramButton, setTestProgramButton] = React.useState([<></>]);
    const [requestId,setRequestId] = React.useState();
    const [menuBar, setMenuBar] = React.useState([]);
    const [buttons, setButtons] = React.useState([]);
    const [value, setValue] = React.useState();
    const [progress, setProgress] = React.useState<number>(0);
    let IndexS = 0;

    React.useEffect(() => {
       GetSectionTools();
    }, [])
    
    React.useEffect(() => {
        console.log(value);
    }, [])
  


    const GetSectionTools = async () =>{
        let params = new Map(), json;
        params.set('prefix','tools');
        params.set('comand','GetSectionTools');
        params.set('SectionID', '143');
        json = XMLrequest(params)
        setButtons(json["Buttons"]);
        setMenuBar(json["MenuBar"])
    }

    function ChangeStatusProgress( RequestID:any){
        let params = new Map, data, json, progr:number;
        data = { "Result":"" }
        params.set('prefix', 'project');
        params.set("comand", "ResumeRequest");
        params.set("RequestID",RequestID );
        params.set("WSM", "1");
        json = XMLrequest(params,  data);
     /**/
        while(json.Break !== undefined){

            
            progr = Number(json.Params.Index);
            console.log(json);
            setProgress(progr);
            IndexS = progr;
            props.setChildren(progr);
          
            json = XMLrequest(params,  data);
        }
        
        
        //tokenProcessing(json)
    }

    function handleClick (event: any, RequestID:any, emptyReq?: boolean, requestData?:any){//MessageBox
        let params = new Map, data, json, DlgResValue,  clickValue = event.target.value;
        setValue(clickValue);
        
     
            for (const [key, value] of Object.entries(items.DlgRes)) {
                if (key === clickValue) DlgResValue = value;
           }
        
        
        console.log(DlgResValue)
        data = { "Result": DlgResValue }
        params.set('prefix', 'project');
        params.set("comand", "ResumeRequest");
        params.set("RequestID",RequestID );
        params.set("WSM", "1");
        json = XMLrequest(params,  data);
        tokenProcessing(json)
    }
    

    function  tokenProcessing (json: any ){///project~ResumeRequest?LicGUID=D100CAB54337ED32E087B59F6CE41511&RequestID=18892&WSM=1 HTTP/1.1
        if(json.Break !== undefined){
            
            let returnJSX= [], returnSmth = [], Token,Module, RequestID:any,andResult, params = new Map, data, jsonResponse;
        
            Module = json.Module;
            Token = json.Token;
            RequestID= json.Params.RequestID;
            setRequestId(RequestID);
            //console.log(RequestID)
            if ( Token === "MessageBox"){
                let Message, Buttons, DlgType;
                Message = json.Params.Message;
                Buttons = json.Params.Buttons;
                DlgType = json.Params.DlgType;
                for (const [key, value] of Object.entries(items.Buttons)) {
                
                    andResult = value & Buttons;
                    
                    if (andResult!==0){
                        returnSmth.push(<Button value={key} onClick={(e)=>handleClick(e,RequestID, false)}>{key}</Button>)
                    }
                }

                for (const [key, value] of Object.entries(items.DlgType)) {
                    if (value === DlgType){
                        DlgType = key;
                    }
                }

                returnJSX.push(  <ModalContainer dlgType={DlgType} text={Message} buttons={returnSmth} /> )
                setTestProgramButton(returnJSX);
            }else if(Token === "ChangeStatusProgress"){
                let Count,Stop,Title, Index;
                Count = json.Params.Count;
                Stop = json.Params.Stop;
                Title = json.Params.Title;
                Index = json.Params.Index;
                //props.setChildren(json);
                returnJSX.push(
                    <div style={{width:"13%"}}>
                        
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={true}
                            
                            >
                                <LinearProgress variant="determinate" value={IndexS} />
                        </Backdrop>
                    </div>

                )
                //setTestProgramButton(returnJSX);
                ChangeStatusProgress(RequestID);
                
            }
        }else{
            setTestProgramButton([<></>]);
        }
        
        
    }


    const handeleExecToolprogram =(event:any , type?:string)=>{///tools~ExecToolProgram
        let Path = event.currentTarget.getAttribute("id"),  params = new Map(), json, Type, Module, Token, Break;
        Path = event.currentTarget.getAttribute("id");
        Type = event.currentTarget.parentElement.id;
        params.set('prefix', 'tools');
        params.set("comand", "ExecToolProgram")
        params.set("Path", Path)
        params.set("Type", type)
        //params.set("Checked", "0")
        params.set("WSM", "1")
        json = XMLrequest(params);
        tokenProcessing(json)
        
    }
    
    const RenderButtons=(ButtonsLocal: any)=>{
        if(typeof ButtonsLocal !== undefined){
            let items = [], Path, Type:string;
            for (const [key, value] of Object.entries(ButtonsLocal)) {
                //console.log(value)
                Path = backValue(value, 'Path');
                Type = backValue(value, 'Type');
                items.push(
                 
                      
                            <IconButton id={Path}  color='primary'  component="span" onClick={(e: any) => handeleExecToolprogram(e,Type)} >
                     
                                {ImgURL(backValue(value, 'Image'))}
                             
                            </IconButton>
                       
 
                    )
                }
              return items
            }
        }

    const backValue = (value:any, param:string)=>{
        return value[param]
    }
    

    return(
        <Grid sx={{pl:2}} justifyContent="center">
           
            {RenderButtons(buttons)}
            {testProgramButton}
        </Grid>
    )
}

export default SectionTools;


/* <button onClick={GetSectionTools}> НАЖМИ ДЛЯ ЗАПРОСА</button>
React.useEffect(() => {
        console.log(buttons)
        console.log(menuBar)
    }, [menuBar])

React.useEffect(() => {
        let params = new Map();
        params.set('prefix','tools');
        params.set('comand','GetSectionTools');
        params.set('SectionID', '143');
        axios.get(URL(params)).then((response) =>{
            setButtons(response.data["Buttons"]);
            setMenuBar(response.data["MenuBar"])
      
        })
    }, [])


<Toolbar />
          <ButtonGroup size="small" variant="text" aria-label="text button group">
            <Button >Настройки</Button>
            <Button>Сервис</Button>
            <Button>Справочники</Button>
        </ButtonGroup>
        <img src={palochka} />
        <HomeIcon  />
        <FolderIcon />
        <TouchAppIcon/>
        <DescriptionIcon />
        <RequestPageIcon />
        <SaveAltIcon/>
*/