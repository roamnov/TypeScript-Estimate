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
import { tokenProcessingTest } from  '../../TokenProcessing';
import { DialogSlide } from '../../Forms/FormsMainFile';

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
                }, 100);
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
            }, 100);
          }else{
            GetWorkPlaceTools();    
          } 
        
     }, []);
 
    //  React.useEffect(()=>{
    //     tokenProcessing(data)
    //  }, [data])
    
    function BuildFromClicked(json){//MODAL RENDER METHOD+
        switch(json.Token){
            case "ExecuteModalDialog":
                let height,width, Path
                let JSX = props.buildForms(json.jsonData)
                if(JSX.length === 0){
                    JSX = props.buildForms(json.jsonData)
                    height = GetParams(json.jsonData, "Height");
                    width = GetParams(json.jsonData, "Width"); 
                }else{
                    height = GetParams(json.jsonData.Form, "Height");
                    width = GetParams(json.jsonData.Form, "Width"); 
                }
                Path = json.jsonData.Form.Path;
                
                ReactDOM.render(<DialogSlide content={JSX} style={{height: `${height}px`, width: `${width}px`}} Path={Path} /> , document.getElementById('RenderFormsModal'));
                break;
        }
    }

    function GetParams(json, param){
        return json[param] ===undefined?  json[param.toLowerCase()] : json[param];        
    }

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
       
        if(Path !== null){
            handeleExecToolprogram(event)
        }else if(Type === "oproge"){
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
                            <Button id={key} onClick={handleClick} style={{textTransform:"none"}}>
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


    


    async function handeleExecToolprogram (event , type){///tools~ExecToolProgram
        let Path = event.currentTarget.getAttribute("path"), Type, params = new Map();
        Type = event.currentTarget.getAttribute("type");
        params.set('prefix', 'tools');
        params.set("comand", "ExecToolProgram");
        params.set("Path", Path);
        params.set("Type", Type);
        //params.set("Checked", "0") УЗНАТЬ КАК WSM ПОЛУЧАТЬ ////////////////////////////////////////////////////////
        params.set("WSM", "1");
        await axios.get(URL(params)).then((res)=> {
            if(tokenProcessingTest(res.data) !== undefined){
                // props.SetBackValue(tokenProcessingTest(res.data));
                BuildFromClicked(tokenProcessingTest(res.data))
            } 
        })
        // let json = XMLrequest(params);
        // tokenProcessingTest(json)
        
        //setData(res.data) tokenProcessingTest(res)
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
            <Grid id="RenderDefault" > </Grid>
        </Grid>
    )
}

export default SectionToolsJS;