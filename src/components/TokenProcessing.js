import ReactDOM from 'react-dom';
import ChangeStatusProgressFooter from './MainPage/NotWorkArea(Side&Head)/ChangeStatusProgress';
import ModalContainer from './Containers/ModalContainer';
import ModalProgress from './Containers/ModalProgress';
import ModalSelectListIndex from './Containers/ModalSelectListIndex';
import { XMLrequest } from './Url';
import Button  from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField  from '@mui/material/TextField';
import { download } from './MainPage/Tools/Tools';
import * as mime from 'react-native-mime-types';
import items from "./MainPage/Tools/Items.json"
// import { ModalProgressContainer } from './Containers/ModalProgressContainer';



function buildFileSelector(Type,RequestID){
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('accept', Type);
    fileSelector.setAttribute("reqId", RequestID)
    fileSelector.onchange = function(e){
        let params = new Map, data, json, ReqID = e.currentTarget.getAttribute("reqId"), rcdata;
        params.set('prefix', 'project');
        params.set("comand", "ResumeRequest");
        params.set("RequestID",ReqID);
        params.set("WSM", "1");
        let file = e.target.files[0]
        data = {"FileName":file.name, Result: "1"  }
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload=(event)=>{
            rcdata = event.target.result.split(",")
            // setSelectedFile({name:file.name , RCDATA: rcdata[1] });
            selestedFile= {name:file.name , RCDATA: rcdata[1] }
            json = XMLrequest(params, data);
            tokenProcessingTest(json);
            //return json
        }
    }
    fileSelector.click();
  }



const InputChange = (event)=>{
    //setInputText(event.target.value)
}

function InputTextChange(event, RequestID){
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
    tokenProcessingTest(json);
}

function handleClickMessageBox (event, RequestID, emptyReq, requestData){//MessageBox
    let params = new Map, data, json, DlgResValue,  clickValue = event.target.value;
    
    
 
        for (const [key, value] of Object.entries(items.DlgRes)) {
            if (key === clickValue) DlgResValue = value;
       }
    
    data = { "Result": DlgResValue }
    params.set('prefix', 'project');
    params.set("comand", "ResumeRequest");
    params.set("RequestID",RequestID );
    params.set("WSM", "1");
    json = XMLrequest(params,  data);
    tokenProcessingTest(json);
}


function EmptyRequest(RequestID, func){
    let params = new Map, data, json;
    data = { "Result":"" }
    params.set('prefix', 'project');
    params.set("comand", "ResumeRequest");
    params.set("RequestID",RequestID );
    params.set("WSM", "1");
    json = XMLrequest(params,  data);
   // setData(json);
    tokenProcessingTest(json,func);
}




var selestedFile    
export function  tokenProcessingTest (json, func){
    if(json.Break !== undefined){
        let returnJSX= [], returnSmth = [], Token,Module, RequestID,andResult;
      
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

                // returnJSX.push(  <ModalContainer dlgType={DlgType} content={Message} buttons={returnSmth} /> )
                //setProgram(returnJSX);
                let docs = document.getElementById('footerProgress')
                docs.innerHTML = "";
                ReactDOM.render(<ModalContainer dlgType={DlgType} content={Message} buttons={returnSmth}  />, document.getElementById('footerProgress'));
                break;

            case "ChangeStatusProgress":
                ReactDOM.render(<ChangeStatusProgressFooter Json={json} setReturnValue={func} /> , document.getElementById('footerProgress'));
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
                            <Button value={1} onClick={(e)=>InputTextChange(e,RequestID)} >Ок</Button>
                            <Button value={2} onClick={(e)=>InputTextChange(e,RequestID)}> Отмена</Button>
                        </Grid>
                    </Grid>
                )

                // returnJSX.push(
                //     <ModalContainer dlgType={Caption}  content={returnSmth} /> 
                // )
                ReactDOM.render(<ModalContainer dlgType={Caption}  content={returnSmth} /> , document.getElementById('footerProgress'));
                break;

            case "ShowProgressDialog":
                let Path = json.Params.Path;
                let doc = document.getElementById('RenderModal')
                doc.innerHTML = "";
                let sas = true
                if(sas === true){
                    // return <ModalProgress open={true}  Json={json} path={Path} />
                    // let test =  ModalProgressContainer( true ,json, Path)
                    // console.log(test)
                }else{
                   
                }
                 ReactDOM.render(<ModalProgress open={true}  Json={json} path={Path} setReturnValue={func} /> , document.getElementById('RenderModal'));
                break;

            case "SetProgressLabel":
                EmptyRequest(RequestID);
                break;

            case "SelectFile":
                let  Filter
                Filter = json.Params.Filter
                
                if(Filter === undefined){
                    Filter= "file"
                    buildFileSelector(Filter, RequestID) 
                }else{
                    Filter = Filter.split("*") 
                    buildFileSelector(Filter[1], RequestID) 
                }   
                                                          
                    
                break;

            case "GetFileStream":
                let FileName= json.Params.FileName, data, params = new Map
                if(FileName === selestedFile.name){
                    params.set('prefix', 'project');
                    params.set("comand", "ResumeRequest");
                    params.set("RequestID",RequestID );
                    params.set("WSM", "1");
                    data = {RCDATA: selestedFile.RCDATA}
                    
                    tokenProcessingTest(XMLrequest(params,data));
                }
                
                break;

            case "ShellExecute":
                let RCDATA =""
                let FileNameShell = json.Params.FileName;
                FileNameShell = FileNameShell.split("\\")
                RCDATA = json.RCDATA
                let mimeType = mime.lookup(FileNameShell.slice(-1)[0]) 
                RCDATA = "data:"+ mimeType+";base64,"+ RCDATA
                //triggerBase64Download(RCDATA, FileNameShell.slice(-1)[0])
                download(RCDATA, FileNameShell.slice(-1)[0],mimeType )                    
                break;
            case "SelectListIndex":
                ReactDOM.render(<ModalSelectListIndex Json={json} /> , document.getElementById('RenderModal'));
                
                break;
            case "GetDirectory":
                EmptyRequest(RequestID, func);
                break;
            case "OutPutText":
                
                break;
            case "PutFileStream":
                EmptyRequest(RequestID, func);
                break;
                
        }

    }
    else{
        let docs = document.getElementById('footerProgress')
        docs.innerHTML = "";
        ReactDOM.render(<></>, document.getElementById('footerProgress'));
        if(json.ViewIdent) func(json);
    }
    
    
}



