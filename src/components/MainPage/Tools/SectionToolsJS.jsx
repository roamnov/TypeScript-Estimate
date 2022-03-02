import  React from 'react';
import { Button, Grid, IconButton, TextField, Menu, MenuItem, Tooltip } from "@mui/material"
import URL, { XMLrequest } from '../../Url';
import { NestedMenuItem } from "./NestedMenuOrigin/NestedMenuItem";
import { ImgURL } from "../../Url";
import ModalContainer from '../../Containers/ModalContainer';
import items from "./Items.json"
import Reference from "./Reference.json"
import ReactDOM from 'react-dom';
import ModalProgress from '../../Containers/ModalProgress';
import axios from 'axios';
import ChangeStatusProgressFooter from '../NotWorkArea(Side&Head)/ChangeStatusProgress';
import DialogContainer from '../../Containers/DialogContainer';
import { CurrentVersion } from '../../SetHost';
import { triggerBase64Download } from 'common-base64-downloader-react';
import { download } from './Tools';
import * as mime from 'react-native-mime-types';
import ModalSelectListIndex from "./../../Containers/ModalSelectListIndex.jsx"


//
//https://mui.com/components/toggle-button/
//
const SectionToolsJS = (props) =>{
    const [Program, setProgram] = React.useState([<></>]);
    const [data, setData] = React.useState({});

    //const [requestId,setRequestId] = React.useState();
    const [menuBarSection, setMenuBarSection] = React.useState([]);
    const [inputText, setInputText] = React.useState();
    const [buttonsSection, setButtonsSection] = React.useState([]);
    const [value, setValue] = React.useState();
    const [selestedFile, setSelectedFile] = React.useState();
 

    const [dataButtonsDefault, setDataButtonsDefault] = React.useState();
    const [open1, setOpen1] = React.useState(false);
    const [menuBarDefault, setMenuBarDefault] = React.useState(undefined);
    const [ID, setID] = React.useState();
    const [AssMass, setAssMass] = React.useState(new Map());
    const [anchorElAss, setAnchorElAss] = React.useState(new Map());

    React.useEffect(() => {
        
        if(props.ID !== undefined){
            
            if (navigator.userAgent.includes('Firefox')) {
                setTimeout(() => {
                    GetSectionTools();   
                }, 500);
              }else{
                GetSectionTools();  
              } 
        }else{
            
        }
     }, [props.ID])


     React.useEffect(() => {
        
        if (navigator.userAgent.includes('Firefox')) {
            setTimeout(() => {
                GetWorkPlaceTools();    
            }, 500);
          }else{
            GetWorkPlaceTools();    
          } 
        
     }, []);
 
     React.useEffect(()=>{
        tokenProcessing(data)
     }, [data])
    
    const handleClick = (event) =>{
        setOpen1(!open1)
        const id =event.currentTarget.getAttribute("id");
        setAssMass(AssMass.set(id,true));
        setAnchorElAss(anchorElAss.set(id,event.currentTarget));
        setID(id);        
    }

    const handleClose = (event) => {
        setOpen1(!open1)
        const id = event.currentTarget.getAttribute("id")
        setAssMass(AssMass.set(ID,false))
        setAnchorElAss(anchorElAss.set(ID,null));
    };

    const handleClickItemMenu = (event)=>{
        let JSXInfoAboutClickedItem = [];
        setOpen1(!open1)
        const id = event.currentTarget.getAttribute("id");
        const Path = event.currentTarget.getAttribute("path")
        const Token = event.currentTarget.getAttribute("token")
        const Params = event.currentTarget.getAttribute("params")
        const Type = event.currentTarget.getAttribute("type")
        setAssMass(AssMass.set(ID,false))
        setAnchorElAss(anchorElAss.set(ID,null));
        JSXInfoAboutClickedItem.push(
            <>
            {Path === null?<></>:<>Path: {Path}</>}
            <br/>
            {Token === null?<></>:<>Token: {Token}</>}
            <br/>
            {Params === null?<></>:<>Params: {Params}</>}
            </>
        )
        if(Path !== undefined){
            handeleExecToolprogram(event)
        }else{
            ReactDOM.render(<DialogContainer title={id} contentText={JSXInfoAboutClickedItem} />,document.getElementById('RenderModalSub'))
        }
        
           //setDid(<DialogContainer title={id} contentText={JSXInfoAboutClickedItem} />)
    
        
    }

    const GetSectionTools =  () =>{
        let params = new Map(), json;
        params.set('prefix','tools');
        params.set('comand','GetSectionTools');
        params.set('SectionID', props.ID);
        json = XMLrequest(params)
        setButtonsSection(json["Buttons"]);
        setMenuBarSection(json["MenuBar"])
    }

    const GetWorkPlaceTools = ( ) =>{
        let params = new Map, json;
        params.set('prefix','config'); 
        params.set('comand','GetWorkPlaceTools');
        json = XMLrequest(params)
        setDataButtonsDefault(json["Buttons"]["Button"]);
        setMenuBarDefault(json["MenuBar"]);
        CreateMap(json["MenuBar"]);
        
    } 

    
    function AssignObjectsForMenuBar(){
        
        if(isEmptyObject(menuBarSection)){
            let MenuBar = {}
            MenuBar = Object.assign({}, menuBarDefault, Reference )
            

            return MenuBar
        }else{
            let KeysDefaut, KeysSections,MenuBar = {}, SameMenus ={}
            const test = Object.assign({}, menuBarDefault)
             
            MenuBar = Object.assign({}, menuBarDefault)
            
            SameMenus  = Object.assign({}, menuBarDefault)  
            KeysDefaut = Object.keys(MenuBar);
            KeysSections = Object.keys(menuBarSection);
            for (const  valueDefaut of KeysDefaut) {
                for (const  valueSection of KeysSections) {
                    if (valueDefaut === valueSection){
                        SameMenus[valueDefaut] = Object.assign(SameMenus[valueDefaut],menuBarSection[valueDefaut] ,menuBarDefault[valueDefaut])
                        
                        
                    }
                }
            }
           
            MenuBar = Object.assign(MenuBar,menuBarSection)
            MenuBar = Object.assign(MenuBar,SameMenus, Reference)
           

            return MenuBar
        }
         
    }

   

    function CreateMap(List){
        for (const [key, value] of Object.entries(List)) {
            setAnchorElAss(anchorElAss.set(key,null));
            setAssMass(AssMass.set(key,false));
            
        }
       
    }

    
    function isEmptyObject(obj) {
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                return false;
            }
        }
        return true;
    }
    
    function RecItems(jsonItems, CurrentID ){
        
        if ( jsonItems !== undefined){
            let DeepFirst, Token, Params, ArrItems, openSet, Path , Image;
            let assemblyLists = [];
            

            for (const [key, value] of Object.entries(jsonItems)) {
                Token = jsonItems[key]["Token"];
                Path = jsonItems[key]["Path"];
                Image = jsonItems[key]["Image"];
                Params = jsonItems[key]["Params"];
                DeepFirst = value;
                
                
                ArrItems = Object.keys(DeepFirst);
                
                if (Token !== undefined || Path !==undefined ){//это то что будет внутри item
                    let prS = Image === undefined? 0.5:0.2 
                    let Type = jsonItems[key]["Type"];
                    assemblyLists.push(
                        <Grid key={key}>
                            <MenuItem  token={Token} params={Params} path={Path} type={Type} id={key}  onClick={handleClickItemMenu} style={{height:"25px", marginLeft:2}}>
                                <Grid sx={{pr:prS, pt:0.5}}>
                                    {Image === undefined?<div style={{paddingLeft:"13px"}}></div> :ImgURL(Image, "16px", "16px" )}
                                </Grid>
                                {key}
                            </MenuItem>  
                        </Grid>
                        
                    )
                    
                }else{// это item который будет распахиваться
                    openSet = AssMass.get(CurrentID);
                    if(key !== "Image" && key !== "-"){
                        assemblyLists.push(
                            <Grid key={key}>
                                <NestedMenuItem style={{paddingLeft:"10px", height:"25px", marginLeft:2}}  leftIcon={Image === undefined?<div style={{paddingLeft:"16px"}}></div> :ImgURL(Image, "16px", "16px",7,3 ,-5)}  label={key}  parentMenuOpen={openSet}  >
                                    {RecItems(DeepFirst, CurrentID)}  
                                </NestedMenuItem>
                            </Grid> )
                    }
                }
            }
            return assemblyLists 
        }
    }


    
    function Rec(jsonItems){
        if ( jsonItems !== undefined){
            // console.log(jsonItems)
            let DeepFirst, ArrItems, openSet, anchorElset, Token;
            let assemblyLists = [];
            //CreateMap(jsonItems)
            for (const [key, value] of Object.entries(jsonItems)) {
                Token = jsonItems[key]["Token"];
                DeepFirst = value;
                ArrItems = Object.keys(DeepFirst);
                // console.log(key + "----------------------------------")
                
                if (Token === undefined){//это то что будет внутри item
                    openSet = AssMass.get(key);
                    anchorElset = anchorElAss.get(key);
                    
                    assemblyLists.push(
                        <Grid item  key={key}>
                            <Button id={key} onClick={handleClick}>
                                {key}
                            </Button>
                            <Menu id={key} anchorEl={anchorElset} open={openSet} onClose={handleClose} >
                                    {RecItems(DeepFirst, key)}
                            </Menu>
                        </Grid>
                    )
                }
            }
            return assemblyLists 
        }
    }


    

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
                setSelectedFile({name:file.name , RCDATA: rcdata[1] });
                json = XMLrequest(params, data)
                setData(json);
            }
        }
        fileSelector.click();
      }

    

    const InputChange = (event)=>{
        setInputText(event.target.value)
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
        tokenProcessing(json);
    }

    function handleClickMessageBox (event, RequestID, emptyReq, requestData){//MessageBox
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
    

    function EmptyRequest(RequestID){
        let params = new Map, data, json;
        data = { "Result":"" }
        params.set('prefix', 'project');
        params.set("comand", "ResumeRequest");
        params.set("RequestID",RequestID );
        params.set("WSM", "1");
        json = XMLrequest(params,  data);
        setData(json);
        //tokenProcessing(json);
    }

    function dataURLtoFile(dataurl, filename) {
 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }


    function  tokenProcessing (json){///project~ResumeRequest?LicGUID=D100CAB54337ED32E087B59F6CE41511&RequestID=18892&WSM=1 HTTP/1.1
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
                                <Button value={1} onClick={(e)=>InputTextChange(e,RequestID)} >Ок</Button>
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
                    let Path = json.Params.Path;
                    let doc = document.getElementById('RenderModal')
                    doc.innerHTML = "";
                    ReactDOM.render(<ModalProgress open={true}  Json={json} path={Path} /> , document.getElementById('RenderModal'));
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
                        setData(XMLrequest(params,data))
                    }
                    
                    break;
                case "ShellExecute":
                    let RCDATA =""
                    let FileNameShell = json.Params.FileName;
                    FileNameShell = FileNameShell.split("\\")
                    RCDATA = json.RCDATA
                    let mimeType = mime.lookup(FileNameShell.slice(-1)[0]) 
                    console.log(mime.lookup("xls"))
                    RCDATA = "data:"+ mimeType+";base64,"+ RCDATA
                    //triggerBase64Download(RCDATA, FileNameShell.slice(-1)[0])
                    download(RCDATA, FileNameShell.slice(-1)[0],mimeType )                    
                    break;
                case "SelectListIndex":
                    ReactDOM.render(<ModalSelectListIndex Json={json} /> , document.getElementById('RenderModal'));
                    
                    break;
                    
            }

        }
        else{
            setProgram([<></>]);
        }
        
        
    }


    async function handeleExecToolprogram (event , type){///tools~ExecToolProgram
        let Path = event.currentTarget.getAttribute("path"), Type, params = new Map();
        Type = event.currentTarget.getAttribute("type");
        params.set('prefix', 'tools');
        params.set("comand", "ExecToolProgram");
        params.set("Path", Path);
        params.set("Type", Type);
        //params.set("Checked", "0") УЗНАТЬ КАК WSM ПОЛУЧАТЬ ////////////////////////////////////////////////////////
        params.set("WSM", "1");
        await axios.get(URL(params)).then((res)=> setData(res.data))
       
        //json = XMLrequest(params);
        //setData(json);
    }
    
    const RenderButtons=(ButtonsLocal, WichButton)=>{
        
        if(ButtonsLocal !== undefined && WichButton === "SectionTools"){
            let items = [], Path, Type;
            
            items.push(<Grid item>{props.defaultButton}</Grid> )
            for (const [key, value] of Object.entries(ButtonsLocal)) {
                Path = backValue(value, 'Path');
                Type = backValue(value, 'Type');
                items.push(
                    <Grid item>    
                        <Tooltip  title={key} arrow>
                                <IconButton path={Path} type={Type}  color='primary'  component="span" onClick={handeleExecToolprogram} >
                                    {ImgURL(backValue(value, 'Image'))}
                                </IconButton>
                        </Tooltip>
                    </Grid>
                    )
                }
              return items
            }else if( ButtonsLocal !== undefined && WichButton === "WorkPlace"){

                let items = [], Token,  Hint;
                Hint = ButtonsLocal.Hint;
                Token = ButtonsLocal.Token;
                items.push(
                    <Grid item>    
                        <Tooltip  title={Hint} arrow>
                                <IconButton path={Token}  color='primary'  component="span" onClick={(e) => handeleExecToolprogram(e)} >
                        
                                    {ImgURL(ButtonsLocal.Image)}
                                
                                </IconButton>
                        </Tooltip>
                    </Grid>
                    )
                return items    
            }
        }

    const backValue = (value, param)=>{
        return value[param]
    }
    

    return(
        <Grid  container  direction="row"  justifyContent="flex-start" alignItems="center" sx={{pl:2}} >
           <div id="RenderModal">  </div>
           <div id="RenderModalSub"> </div>
           <Grid id="RenderDefault"> </Grid>

           <Grid item> 
                <Grid container  direction="row"  justifyContent="flex-start" alignItems="center" >
                    {RenderButtons(dataButtonsDefault, "WorkPlace")}
                    {RenderButtons(buttonsSection, "SectionTools")}
                    {Program}
                    {}
                </Grid>
            </Grid>

            <Grid item> 
                <Grid container direction="row"  justifyContent="flex-start" alignItems="center" >
                    {Rec(AssignObjectsForMenuBar())}                   
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SectionToolsJS;
