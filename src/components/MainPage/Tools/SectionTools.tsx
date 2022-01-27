import  React from 'react';
import {  Backdrop,  Box,  Button, Grid, IconButton, LinearProgress, Modal, Step, StepLabel, Stepper, TextField, Tooltip } from "@mui/material"
import URL, { XMLrequest } from '../../Url';

import { ImgURL } from "../../Url";
import ModalContainer from '../../Containers/ModalContainer';
import items from "./Items.json"
import AlertMini from '../../AlertMini';
import { SectionToolsToFooter } from '../../ComponentInterface';
import ReactDOM from 'react-dom';
import ModalProgress from '../../Containers/ModalProgress';
import axios from 'axios';
import ChangeStatusProgressFooter from '../NotWorkArea(Side&Head)/ChangeStatusProgress';


//
//https://mui.com/components/toggle-button/
//
const SectionTools = (props:SectionToolsToFooter) =>{
    const [Program, setProgram] = React.useState([<></>]);
    const [data, setData] = React.useState({});

    //const [requestId,setRequestId] = React.useState();
    const [menuBar, setMenuBar] = React.useState([]);
    const [inputText, setInputText] = React.useState();
    const [buttons, setButtons] = React.useState([]);
    const [value, setValue] = React.useState();
    

    React.useEffect(() => {
       GetSectionTools();
    }, [])

    React.useEffect(()=>{
        tokenProcessing(data)
    }, [data])

    const GetSectionTools =  () =>{
        let params = new Map(), json;
        params.set('prefix','tools');
        params.set('comand','GetSectionTools');
        params.set('SectionID', '143');
        json = XMLrequest(params)
        setButtons(json["Buttons"]);
        setMenuBar(json["MenuBar"])
    }

    const InputChange = (event:any)=>{
        console.log(inputText)
        setInputText(event.target.value)
    }

    function InputTextChange(event: any, RequestID:any){
        let params = new Map, data, json, ClickedButton= event.target.value ,inputResult = event.target.form[0]["value"];
        //const data1 = new FormData(event.currentTarget);

        if (ClickedButton === 2){
            data = { "Result": ""}
        }else{
            data = {  "Text":inputResult, "Result": 1 }
        }
            
        params.set('prefix', 'project');
        params.set("comand", "ResumeRequest");
        params.set("RequestID",RequestID );
        params.set("WSM", "1");
        json = XMLrequest(params,  data);
        tokenProcessing(json);
    }

    function handleClickMessageBox (event: any, RequestID:any, emptyReq?: boolean, requestData?:any){//MessageBox
        let params = new Map, data, json, DlgResValue,  clickValue = event.target.value;
        setValue(clickValue);
        
     
            for (const [key, value] of Object.entries(items.DlgRes)) {
                if (key === clickValue) DlgResValue = value;
           }
        
        data = { "Result": DlgResValue }
        params.set('prefix', 'project');
        params.set("comand", "ResumeRequest");
        params.set("RequestID",RequestID );
        params.set("WSM", "1");
        json = XMLrequest(params,  data);
        tokenProcessing(json);
    }
    

    function EmptyRequest(RequestID:string){
        let params = new Map, data, json:object;
        data = { "Result":"" }
        params.set('prefix', 'project');
        params.set("comand", "ResumeRequest");
        params.set("RequestID",RequestID );
        params.set("WSM", "1");
        json = XMLrequest(params,  data);
        setData(json);
        //tokenProcessing(json);
    }


    function  tokenProcessing (json: any){///project~ResumeRequest?LicGUID=D100CAB54337ED32E087B59F6CE41511&RequestID=18892&WSM=1 HTTP/1.1
        if(json.Break !== undefined){
            
            let returnJSX= [], returnSmth = [], Token,Module, RequestID:any,andResult,jsonResponse;
        
            Module = json.Module;
            Token = json.Token;
            RequestID= json.Params.RequestID;

            switch (Token){
                case "MessageBox":
                    let Message, Buttons, DlgType;
                    Message = json.Params.Message;
                    Buttons = json.Params.Buttons;
                    DlgType = json.Params.DlgType;
                    for (const [key, value] of Object.entries(items.Buttons)) {
                    
                        andResult = value & Buttons;
                        
                        if (andResult!==0){
                            returnSmth.push(<Button value={key} onClick={(e)=>handleClickMessageBox(e,RequestID)}>{key}</Button>)
                        }
                    }

                    for (const [key, value] of Object.entries(items.DlgType)) {
                        if (value === DlgType){
                            DlgType = key;
                        }
                    }

                    returnJSX.push(  <ModalContainer dlgType={DlgType} content={Message} buttons={returnSmth} /> )
                    setProgram(returnJSX);
                    break;

                case "ChangeStatusProgress":
                    ReactDOM.render(<ChangeStatusProgressFooter Json={json} /> , document.getElementById('footerProgress'));
                    break;

                case "InputText":
                    let Caption, Title;
                    Caption = json.Params.Caption;
                    Title = json.Params.Title;
    
                    returnSmth.push(
                        <Grid component={"form"} container direction="column"  justifyContent="center"  alignItems="flex-end" spacing={2}>
                            <Grid item>
                                <TextField  id="input-text" name="input-text" label={Title} variant="outlined" fullWidth onChange={InputChange} />
                                
                            </Grid>
                            <Grid item>
                                <Button value={1} onClick={(e)=>InputTextChange(e,RequestID)} > Ок</Button>
                                <Button value={2} onClick={(e)=>InputTextChange(e,RequestID)}> Отмена</Button>
                            </Grid>
                        </Grid>
                    )
    
                    returnJSX.push(
                        <ModalContainer dlgType={Caption}  content={returnSmth} /> 
                    )
                    setProgram(returnJSX);
                    break;

                case "ShowProgressDialog":
                    ReactDOM.render(<ModalProgress open={true}  Json={json} /> , document.getElementById('testR'));
                    break;

                case "SetProgressLabel":
                    EmptyRequest(RequestID);
                    break;

            }

        }
        else{
            setProgram([<></>]);
        }
        
        
    }


    async function handeleExecToolprogram (event:any , type?:string){///tools~ExecToolProgram
        let Path = event.currentTarget.getAttribute("id"),  params = new Map(), json, Type, Module, Token, Break;
        Path = event.currentTarget.getAttribute("id");
        params.set('prefix', 'tools');
        params.set("comand", "ExecToolProgram");
        params.set("Path", Path);
        params.set("Type", type);
        //params.set("Checked", "0") УЗНАТЬ КАК WSM ПОЛУЧАТЬ ////////////////////////////////////////////////////////
        params.set("WSM", "1");
        await axios.get(URL(params)).then((res)=> setData(res.data))
        //json = XMLrequest(params);
        //setData(json);
    }
    
    const RenderButtons=(ButtonsLocal: any)=>{
        //console.log(ButtonsLocal)
        if(ButtonsLocal !== undefined){
            let items = [], Path, Type:string;
            for (const [key, value] of Object.entries(ButtonsLocal)) {
                //console.log(value)
                Path = backValue(value, 'Path');
                Type = backValue(value, 'Type');
                items.push(
                    <Tooltip  title={key} arrow>
                            <IconButton id={Path}  color='primary'  component="span" onClick={(e: any) => handeleExecToolprogram(e,Type)} >
                     
                                {ImgURL(backValue(value, 'Image'))}
                             
                            </IconButton>
                    </Tooltip>
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
           <div id="testR">
         
           </div>
           <div id="testG">

           </div>
            {RenderButtons(buttons)}
            {Program}
        </Grid>
    )
}

export default SectionTools;



function getAttribute(arg0: string): any {
    throw new Error('Function not implemented.');
}
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