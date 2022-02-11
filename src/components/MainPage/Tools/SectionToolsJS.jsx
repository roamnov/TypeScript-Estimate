import  React from 'react';
import {  Backdrop,  Box,  Button, Grid, IconButton, TextField, Menu, MenuItem, Tooltip } from "@mui/material"
import URL, { XMLrequest } from '../../Url';
import { NestedMenuItem } from "./NestedMenuOrigin/NestedMenuItem";
import { ImgURL } from "../../Url";
import ModalContainer from '../../Containers/ModalContainer';
import items from "./Items.json"
import ReactDOM from 'react-dom';
import ModalProgress from '../../Containers/ModalProgress';
import axios from 'axios';
import ChangeStatusProgressFooter from '../NotWorkArea(Side&Head)/ChangeStatusProgress';


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
    

    const [dataButtonsDefault, setDataButtonsDefault] = React.useState([]);
    const [open1, setOpen1] = React.useState(false);
    const [menuBarDefault, setMenuBarDefault] = React.useState();
    const [ID, setID] = React.useState();
    const [AssMass, setAssMass] = React.useState(new Map());
    const [anchorElAss, setAnchorElAss] = React.useState(new Map());

    React.useEffect(() => {
       GetWorkPlaceTools();
    }, []);


    React.useEffect(() => {
        if(props.ID !== undefined){
            GetSectionTools();
        }
     }, [props.ID])
 
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
        //Rec(json["MenuBar"]);
    } 
    
    function AssignObjectsForMenuBar(){
        let KeysDefaut, KeysSections,MenuBar, Test 
        MenuBar = Object.assign({}, menuBarDefault)
        KeysDefaut = Object.keys(MenuBar);
        KeysSections = Object.keys(menuBarSection);
        for (const  valueDefaut of KeysDefaut) {
            
            for (const  valueSection of KeysSections) {
                if (valueDefaut === valueSection){

                }
            }
        }
        Test = menuBarDefault + menuBarSection;
        MenuBar = Object.assign(MenuBar,menuBarSection)
        console.log(Test)
        return MenuBar 
    }

    function CreateMap(List){
        for (const [key, value] of Object.entries(List)) {
            setAnchorElAss(anchorElAss.set(key,null));
            setAssMass(AssMass.set(key,false));
            
        }
    }

    
    function RecItems(jsonItems, CurrentID ){
        
        if ( jsonItems !== undefined){
            let DeepFirst, Token, keyS= 0, ArrItems, openSet, Path;
            let assemblyLists = [];

            for (const [key, value] of Object.entries(jsonItems)) {
                //console.log(value)
                keyS = Number(key)+ 1;
                Token = jsonItems[key]["Token"];
                Path = jsonItems[key]["Path"];
                DeepFirst = value;
                
                ArrItems = Object.keys(DeepFirst);
                
                if (ArrItems[1]=== "Token" || Path !==undefined ){//это то что будет внутри item
                    assemblyLists.push(
                        <Grid key={key}>
                            <MenuItem  onClick={handleClose} >
                            {key}
                            </MenuItem>  
                        </Grid>
                        
                    )
                    
                }else{// это item который будет распахиваться
                    openSet = AssMass.get(CurrentID);
                    assemblyLists.push(
                        <Grid key={key}>
                            <NestedMenuItem   onClick={handleClose} label={key}  parentMenuOpen={openSet}  >
                                {RecItems(DeepFirst, CurrentID)}  
                            </NestedMenuItem>
                        </Grid>
                        
                    )
                    
                }
            }
            return assemblyLists 
        }
    }


    
    function Rec(jsonItems){
        if ( jsonItems !== undefined){
            
            let DeepFirst, Token, keyS= 0, ArrItems, openSet, anchorElset, Path;
            let assemblyLists = [];

            for (const [key, value] of Object.entries(jsonItems)) {
                keyS = Number(key)+ 1;
                Token = jsonItems[key]["Token"];
                DeepFirst = value;
                ArrItems = Object.keys(DeepFirst);
            
                
                if (ArrItems[1]=== "Token"){//это то что будет внутри item
                    
                }else{// это item который будет распахиваться
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


    function  tokenProcessing (json){///project~ResumeRequest?LicGUID=D100CAB54337ED32E087B59F6CE41511&RequestID=18892&WSM=1 HTTP/1.1
        if(json.Break !== undefined){
            
            let returnJSX= [], returnSmth = [], Token,Module, RequestID,andResult,jsonResponse;
        
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
                    ReactDOM.render(<ModalProgress open={true}  Json={json} /> , document.getElementById('RenderModal'));
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


    async function handeleExecToolprogram (event , type){///tools~ExecToolProgram
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
    
    const RenderButtons=(ButtonsLocal, WichButton)=>{
        
        if(ButtonsLocal !== undefined && WichButton === "SectionTools"){
            let items = [], Path, Type;
            
            items.push(<Grid item>{props.defaultButton}</Grid> )
            for (const [key, value] of Object.entries(ButtonsLocal)) {
                //console.log(value)
                Path = backValue(value, 'Path');
                Type = backValue(value, 'Type');
                items.push(
                    <Grid item>    
                        <Tooltip  title={key} arrow>
                                <IconButton id={Path}  color='primary'  component="span" onClick={(e) => handeleExecToolprogram(e,Type)} >
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
                                <IconButton id={Token}  color='primary'  component="span" onClick={(e) => handeleExecToolprogram(e)} >
                        
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
                    
                </Grid>
            </Grid>

            <Grid item> 
                <Grid container direction="row"  justifyContent="flex-start" alignItems="center" >
                    {Rec(AssignObjectsForMenuBar())}
                    {}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SectionToolsJS;



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