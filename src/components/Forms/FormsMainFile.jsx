import { Button, Checkbox, Grid, Paper, Radio , Typography,CircularProgress, Dialog ,DialogActions, RadioGroup, DialogContent, FormControlLabel, FormControl, FormLabel} from "@mui/material";
import React,{Children, useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps} from '@mui/material/AccordionSummary';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { XMLrequest } from "../Url";
import { Tabs, TabItem, TabItemsGroup } from 'smart-webcomponents-react/tabs';
import Link from '@mui/material/Link';
import  { tokenProcessingTest } from "../TokenProcessing";
import SectionToolsJS from "../MainPage/Tools/SectionToolsJS";
import Slide from '@mui/material/Slide'
import Draggable from 'react-draggable';
import Editor from "../Editor/Editor";
import EditStyleJson from "./EditStyleB.json"


function PaperComponent(props) {
    return (
      <Draggable
      cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));


  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
/////////////////////////////////////////////////////////////////////////////////////////////
  export function DialogSlide(props) {
    const [open, setOpen] = React.useState(true);
    const [heiWid, setHeiWod] = React.useState({height: "0px", width:"0px"})

  
    useEffect(()=>{
        if(props !== undefined){
            setOpen(true)
            setHeiWod(props.style)
            
        }
    },[props])

    

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        
        <Dialog
          PaperProps={{
              sx:{
                  width: heiWid.width,
                  height: heiWid.height
              }
          }}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          PaperComponent={PaperComponent}
        > 
          <DialogContent>
            {props.content}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose}>Agree</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

//////////////////////////////////////////////////////////////////////////////////////

export default function FormsMainFile(props){
    const [dataForms, setDataForms] = useState();
    const [dataFormsUpd, setdataFormsUpd] = useState();
    const [expanded, setExpanded] = React.useState('panel1');
    const [expandedMap, setExpandedMap] = React.useState(new Map);
    const [load, setLoad] = React.useState(true)
    const [currentHeight, setCurrentHeight] = useState(window.innerHeight - 189);
    const [subForms, setSubForms] = useState(undefined);
    

    const handleResize = () => {
        setCurrentHeight(window.innerHeight - 189);
    }
    useEffect(() => {
        window.addEventListener("resize", handleResize, false);
        
    }, []);

    useEffect(()=>{
        GetSectionForms();
    },[]);

    useEffect(()=>{
        if(subForms !== undefined){
            BuildFromClicked();
        }
    },[subForms])

    

    const GetSectionForms=()=>{//GET /forms~GetSectionForm?LicGUID=8C5F5163443EBAC78D42B78939951952&SectionID=482 HTTP/1.0
        let params = new Map, json;
        params.set('prefix', 'forms');
        params.set("comand", "GetSectionForm");
        params.set("SectionID", props.id);/////
        json = XMLrequest(params);
        setDataForms(json);
        setLoad(false);        
    }

    const GetParamDialog = (Path) =>{
        let params = new Map, json;
        params.set('prefix', 'programs');
        params.set("comand", "GetParamDialog");
        params.set("GroupID", "0");///// ПРОВЕРИТЬ
        params.set("Path", Path);
        params.set("NeedRefresh", "1");
        json = XMLrequest(params);
        setSubForms(json)
    }

    function GetParams(json, param){
        return json[param] ===undefined?  json[param.toLowerCase()] : json[param];        
    }


    function isEmptyObject(obj) {
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                return false;
            }
        }
        return true;
        
    }
    

    function BuildFromClicked(json){//MODAL RENDER METHOD+
        switch(subForms.Token){
            case "ExecuteModalDialog":
                let height,width, Path
                let JSX = FormDataProcessing(subForms.jsonData)
                if(JSX.length === 0){
                    JSX = SubDataProcessing(subForms.jsonData)
                    height = GetParams(subForms.jsonData, "Height");
                    width = GetParams(subForms.jsonData, "Width"); 
                }else{
                    height = GetParams(subForms.jsonData.Form, "Height");
                    width = GetParams(subForms.jsonData.Form, "Width"); 
                }
                Path = subForms.jsonData.Form.Path;
                
                ReactDOM.render(<DialogSlide content={JSX} style={{height: `${height}px`, width: `${width}px`}} Path={Path} /> , document.getElementById('RenderFormsModal'));
                break;
        }
    }

    function AssignObjectsForMenuBar(){
        
        if(isEmptyObject(dataFormsUpd)){
            let MenuBar = {}
            MenuBar = Object.assign({}, dataForms )
            

            return MenuBar
        }else{
            let KeysDefaut, KeysSections,MenuBar = {}, SameMenus ={}
            const test = Object.assign({}, dataForms)
             
            MenuBar = Object.assign({}, dataForms)
            
            SameMenus  = Object.assign({}, dataForms)  
            KeysDefaut = Object.keys(MenuBar);
            KeysSections = Object.keys(dataFormsUpd);
            for (const  valueDefaut of KeysDefaut) {
                for (const  valueSection of KeysSections) {
                    if (valueDefaut === valueSection){
                        SameMenus[valueDefaut] = Object.assign(SameMenus[valueDefaut],dataFormsUpd[valueDefaut] ,dataForms[valueDefaut])
                        
                        
                    }
                }
            }
           
            MenuBar = Object.assign(MenuBar,dataFormsUpd)
            MenuBar = Object.assign(MenuBar,SameMenus)
           

            return MenuBar
        }
         
    }

    function TextFromServerToBrowser(json, keyName){
        let Text, FontStyle, ReferenceLink, FontSize, autoSize, FontColor
        autoSize = GetParams(json,"AutoSize") === "0"? "hidden": "unset"
        FontSize =  GetParams(json,"Font-size");
        Text = GetParams(json,"Text");
        ReferenceLink = GetParams(json,"Reference");
        FontStyle = BackFontweight(GetParams(json,"Font-style"));
        FontColor = BackColor(GetParams(json,"Font-color"))
        if( ReferenceLink === "1"){
            return(
                    <Typography style={{fontSize: `${parseInt(FontSize, 10)*0,13}px`, fontWeight: FontStyle, fontStyle:FontStyle, textDecoration:FontStyle, overflow: autoSize, color: FontColor }}> 
                        <Link keyName={keyName}  component="button" variant="body2" underline="hover" onClick={ClickFormElement}>
                            {Text}
                        </Link>
                    </Typography>
                )
        }else{
            return(
                    <Typography onClick={ClickFormElement} keyName={keyName} style={{fontSize: `${parseInt(FontSize, 10)*0,13}px`, fontWeight: FontStyle, fontStyle:FontStyle, textDecoration:FontStyle, overflow: autoSize, color: FontColor }}> 
                        {Text}
                    </Typography>
                )
        }
        
           
    }

    const handleChangeAccordion =
    (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
      setExpandedMap(expandedMap.set(panel, !expandedMap.get(panel)))
    };


    function BackColor(color){
        if (color === undefined) return "rgb(240,240,240)"
        let colorArr = color.split(":")
        if(colorArr[1] === undefined){
            switch (color){
                case "Черный":
                    return "black"
                case "Бордовый":
                    return "rgb(124,10,2)"
                case "Зеленый":
                    return "green"
                case "Коричневый":
                    return "brown"
                case "Темно-синий":
                    return "darkblue"
                case "Пурпурный":
                    return "purple"
                case "Тёмно-зеленый":
                    return "darkgreen"
                case "Серый":
                    return "gray"
                case "Светло-серый":
                    return "lightgray"
                case "Красный":
                    return "red"
                case "Светло-зеленый":
                    return "lightgreen"
                case "Желтый":
                    return "yellow"
                case "Голубой":
                    return "rgb(0, 191, 255)"
                case "Фиолетовый":
                    return "rgb(138, 43, 226)"
                case "Светло-голубой":
                    return "aqua"
                case "Белый":
                    return "white"
                case "Подсказка":
                    return "rgb(245, 245, 220)"
                case "":
                    break 
            }
        }else{
            return `rgb(${colorArr[0]},${colorArr[1]},${colorArr[2]})`
        }

        
    }

    function BackFontweight(FS){
        switch(FS){
            case "жирный":
                return "bold"
            case "курсив":
                return "italic"
            case "подчеркнутый":
                return "underline"

            
        }
    }
    
    function roughScale(x, base) {
        const parsed = parseInt(x, base);
        if (isNaN(parsed)) { return 0; };
        return parsed ;
      }
      
    function ClickFormElement(event){
        let params = new Map, json, Name, TokenReturn;
        Name = event.currentTarget.getAttribute("name");
        Name = Name === null? event.currentTarget.getAttribute("keyName"): Name
        params.set('prefix', 'forms');
        params.set("comand", "ElementEvent");
        params.set("SectionID", props.id);/////
        params.set("Name", Name);
        params.set("WSM", "1");
        json = XMLrequest(params);
        TokenReturn = tokenProcessingTest(json, "forms");
        if( TokenReturn !== undefined){
            GetParamDialog(TokenReturn);
        }else if(json.Form !== undefined){
            // CheckAndReturnComponent(json);
            setDataForms(json);
        }
    }

    function sortByIndex(arr) {
        arr.sort((a, b) => a.Index > b.Index ? 1 : -1);
      }
    
    function CheckAndReturnComponent(json, SubLabel, keyName){
        let ReturnComponent =[],Enabled, Height, Left, Top, Name, Width,  RCDATA, Text, Visability, Corners, BGColor, returnSub=[];
        Left = GetParams(json, "Left");
        Top = GetParams(json, "Top");
        Height = GetParams(json, "Height");
        Width = GetParams(json, "Width");
        Name = GetParams(json, "Name");
        Enabled = GetParams(json, "Enabled") === "1"?false:true;
        Visability = GetParams(json, "Visible");
        Visability = Visability ==="1"?"visible": Visability === undefined?"visible":"hidden" ;
        BGColor = BackColor(GetParams(json, "Back-color"));
        switch(json.Type){
            case "TImage":
                RCDATA = GetParams(json,"RCDATA");
                ReturnComponent.push(
                    <Grid keyName={keyName} style={{ position:"absolute" ,left:`${Left}px`, top:`${Top}px`, visibility:Visability }}>
                        <img style={{width: `${Width}px`,height:`${Height}px`}} src={`data:image/png;base64,${RCDATA}`} />
                    </Grid>
                )
                break;

            case "TButton":
                Text = GetParams(json,"Text");
                
                ReturnComponent.push(
                    <Button keyName={keyName} disabled={Enabled} name={Name} secid={props.id} onClick={ClickFormElement} variant="outlined" style={{color: BackColor(json["Font-color"]),backgroundColor:BackColor(json["Back-color"]) ,position:"absolute", minWidth: "1px", width: `${Width}px`,height:`${Height}px`,left:`${Left}px`, top:`${Top}px`, textTransform:"none" , visibility:Visability}}>
                        
                        {TextFromServerToBrowser(json)}  
                        {SubDataProcessing(json)}  
                    </Button>
                )
                
                break;

            case "TSectionCheckBox":
                Text = GetParams(json,"Text")
                ReturnComponent.push(
                    <Grid keyName={keyName} style={{whiteSpace:"nowrap"}}  >
                        <FormControlLabel keyName={keyName} style={{width:"max-content" ,  position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px`, visibility:Visability}} control={<Checkbox defaultChecked />} label={TextFromServerToBrowser(json, keyName)} />
                    </Grid>
                )
                break;

            case "TSectionEditor":
                let EditStyle, EditStyleCompleteInt = 0;
                Text = GetParams(json,"Text")
                EditStyle = GetParams(json, "EditStyle").split(",");
                
                for (const [keyEdit, valueEdit] of Object.entries(EditStyle)) {
                    for (const [keyJson, value] of Object.entries(EditStyleJson)) {
                        if(valueEdit === keyJson){
                            EditStyleCompleteInt =EditStyleCompleteInt+ value
                        }
                    }
                }
                
                ReturnComponent.push(
                    <Grid keyName={keyName} style={{position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px`, visibility:Visability  }}>
                        {/*
                        
                        <TextField variant="standard"  defaultValue={Text} style={{ width: `${Width}px`,height:`${Height}px` }} />
                        */ }
                        <Editor EditStyle={EditStyleCompleteInt} style={{ width: `${Width}px`,height:`${Height}px` }}/>
                    </Grid>
                    
                )
                break;

            case "TSectionPanel":// WITH SUB
                ReturnComponent.push(
                    <Grid keyName={keyName} style={{position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px`, visibility:Visability, backgroundColor: BGColor }}>
                        <Paper elevation={2}>
                           {SubDataProcessing(json)} 
                        </Paper>
                    </Grid>
                )
                break;

            case "TLabel":
                let FixedWidth = roughScale(Width, 10) + 8
                if(SubLabel === "TCategoryPanel"){
                    ReturnComponent.push(
                        <Grid keyName={keyName} style={{paddingLeft:`${Left}px` , visibility:Visability } }>
                            {TextFromServerToBrowser(json, keyName)}                             
                        </Grid>
                    )  
                }else{
                    ReturnComponent.push(
                        <Grid keyName={keyName} style={{position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${FixedWidth}px`,height:`${Height}px`, whiteSpace: "nowrap", visibility:Visability }}>
                            {TextFromServerToBrowser(json, keyName)}
                        </Grid>
                    )   
                }
                
                break;

            case "TCategoryPanelGroup"://WITH SUB

                ReturnComponent.push(
                    <Grid keyName={keyName} style={{position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px`, overflowY:"auto", overflowX:"hidden", visibility:Visability, backgroundColor: BGColor }}>
                        {SubDataProcessing(json)}
                    </Grid>
                )
                break;

            case "TCategoryPanel"://WITH SUB
                let Caption = GetParams(json,"caption");
                let BoolOpen = expandedMap.get(Caption);
                ReturnComponent.push(
                    <Accordion expanded={BoolOpen} onChange={handleChangeAccordion(Caption)} keyName={keyName}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography>{Caption}</Typography>
                        </AccordionSummary>
                        <AccordionDetails  style={{ width: `${Width}px`,height:`${Height}px`, display:Visability}}>
                            {SubDataProcessing(json,"TCategoryPanel")} 
                        </AccordionDetails>
                    </Accordion> 
                )
                break;

            case "TTabbedPages"://WITH SUB
                let SortedTabs = [];
                for(const [key, value] of Object.entries(json)) {
                    if(typeof(value) === "object"){
                        SortedTabs.push(value)
                    }
                }
                sortByIndex(SortedTabs)
                ReturnComponent.push(
                    <Tabs keyName={keyName} class="Tabs" selectedIndex={0} style={{ position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px`, display:Visability, backgroundColor: BGColor }} >
                        {SubDataProcessing(SortedTabs, "TTabbedPages")} 
                    </Tabs>
                )
                break;

            case "TTabPagePanel"://WITH SUB
                Text = GetParams(json,"Text");
                Text = Text === undefined? GetParams(json,"Title"): Text;
                ReturnComponent.push(
                   <TabItem keyName={keyName} label={Text} style={{ position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px`, display:Visability, backgroundColor: BGColor }}>
                       {SubDataProcessing(json, "TTabPagePanel")} 
                    </TabItem> 
                )
                
                break;

            case "TGradientPanel"://WITH SUB
                ReturnComponent.push(
                    <Grid keyName={keyName} style={{position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px`, overflowY:"auto", overflowX:"hidden", display:Visability, backgroundColor: BGColor }}>
                        {SubDataProcessing(json)}
                    </Grid>
                )
                break;

            case "TBevel"://WITH SUB
                ReturnComponent.push(
                    <Grid keyName={keyName} style={{position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px`, overflowY:"auto", overflowX:"hidden", display:Visability, backgroundColor: BGColor }}>
                        {SubDataProcessing(json)}
                    </Grid>
                )
                break;

            case "TRadioGroup":
                let PickList, Columns
                PickList = GetParams(json, "PickList").split("\r\n");
                Text = GetParams(json, "PickList").split("\r\n");
                Columns = GetParams(json,"Columns");
                
                for(let key of PickList){
                    if(key !== ""){
                        returnSub.push(
                            <FormControlLabel value={key} control={<Radio />} label={key} />
                        )
                    }
                }
                ReturnComponent.push(
                    <FormControl style={{position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px`,}}>
                        <FormLabel >{Text[0]}</FormLabel>
                            <RadioGroup
                                row={Columns === "1"?false:true}
                                name="controlled-radio-buttons-group"
                                
                                // onChange={handleChange}
                            >
                                
                                {returnSub}
                        </RadioGroup>
                    </FormControl>
                )

                break;

            case "TListBox":

                break
            
        }
        return ReturnComponent;
    }

function FormDataProcessing(json) {
        if(dataForms !== undefined){
            let val, returnAll=[]
            json = json.Form;
            console.log(json.hasOwnProperty("пДействия"))
            for(const [key, value] of Object.entries(json)) {
                val = value
                if(val.Type !==undefined ){
                    returnAll.push( CheckAndReturnComponent(value, false, key))                     
                }
            } 
            return returnAll 
        }
        
    }

    function SubDataProcessing(json, subElement){
        if(dataForms !== undefined){
            let val, returnAll=[]
            //json = json.Form;
            for(const [key, value] of Object.entries(json)) {
                val = value
                if(val.Type !==undefined ){
                    returnAll.push( CheckAndReturnComponent(value, subElement, key)) 
                }
            } 
            return returnAll 
        }
        
    }

    if(load === true){
        return(
            <Grid container direction="row" justifyContent="center" alignItems="center" style={{ height: `${currentHeight}px` }}>
                <Grid item>
                    <div>
                        <CircularProgress />
                    </div>
                </Grid>
            </Grid>
            
        ) 
    }else{
        return(
        <Grid >
            <SectionToolsJS ID={props.id} SetBackValue={setSubForms}  buildForms ={FormDataProcessing}/>
            <Grid id="mainForms" style={{position:"absolute", height: "100%", width:"100%"}}>
                {FormDataProcessing(dataForms)}
            </Grid>
            <Grid id="RenderFormsModal">

            </Grid>
        </Grid>
            
        )  
    }
}