// import { Button, Checkbox, Grid, Paper, Radio , Typography,CircularProgress, Dialog ,DialogActions, RadioGroup, DialogContent, FormControlLabel, FormControl, FormLabel} from "@mui/material";
import React,{ useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { XMLrequest, get_cookie, ImgBASE64 } from "../Url";
import Box  from "@mui/material/Box";
import { Tabs, TabItem} from 'smart-webcomponents-react/tabs';
import Link from '@mui/material/Link';
import  { tokenProcessingTest } from "../TokenProcessing";
import SectionToolsJS from "../MainPage/Tools/SectionToolsJS";
import Slide from '@mui/material/Slide'
import Draggable from 'react-draggable';
import Editor from "../Editor/Editor";
import EditStyleJson from "./EditStyleB.json"
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import CircularProgress from "@mui/material/CircularProgress";
import Radio from "@mui/material/Radio";
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Checkbox from "@mui/material/Checkbox"
import FormLabel from "@mui/material/FormLabel"
import ManWhoSoldTheWorld from "../MainPage/stimategrid/test";
import AccorionDownIcon from "../../static/images/down.png";
import { Scrollbars } from 'react-custom-scrollbars-2';
import useTheme from "../Hooks/useTheme";
import cn from "classnames"
import Fade from '@mui/material/Fade';


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
    // flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(180deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    backgroundColor:"#ffffff"
  }));


  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
/////////////////////////////////////////////////////////////////////////////////////////////
  export function DialogSlide(props) {
    const [open, setOpen] = useState(true);
    const [heiWid, setHeiWod] = useState({height: "0px", width:"0px"})

  
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
    let LastDrx = get_cookie("LastLogin").split(",");
    const theme = useTheme(); 
    const [dataForms, setDataForms] = useState();
    const [expanded, setExpanded] = React.useState('panel1');
    const [expandedMap, setExpandedMap] = React.useState(new Map);
    const [load, setLoad] = React.useState(true)
    const [transition, setTransition] = React.useState(true)
    const [currentHeight, setCurrentHeight] = useState(window.innerHeight - 189);
    const [subForms, setSubForms] = useState(undefined);
    const [cursor,setCursor] = useState("auto");
    const [radioValues, setRadioValues]= useState({})

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
        setTransition(false)      
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



    function TextFromServerToBrowser(json, keyName){
        let Text, FontStyle, ReferenceLink, FontSize, autoSize, FontColor, Alignment, BorderWidth, FontFamily
        autoSize = GetParams(json,"AutoSize") === "0"? "hidden": "unset"
        FontSize =  GetParams(json,"Font-size");
        Text = GetParams(json,"Text");
        ReferenceLink = GetParams(json,"Reference");
        FontStyle = BackFontweight(GetParams(json,"Font-style"));
        FontColor = BackColor(GetParams(json,"Font-color"))
        Alignment = ConvertAlignment (GetParams(json, "Alignment"));
        BorderWidth =GetParams(json,"BorderWidth");
        BorderWidth = BorderWidth === undefined? undefined:`${Number(BorderWidth)/100*50}px`
        FontFamily = GetParams(json,"Font-name");
        // parseInt(FontSize, 10)*0,13}px`,
        if( ReferenceLink === "1"){
            return(
                    <Typography style={{fontSize: `${FontSize}px`, fontWeight: FontStyle, fontStyle:FontStyle, 
                    textDecoration:FontStyle, overflow: autoSize, color: FontColor , textAlign: Alignment, padding:BorderWidth, overflow: "hidden" ,
                    fontFamily:FontFamily
                    }}> 
                        <Link keyName={keyName}  component="button" variant="body2" underline="hover" onClick={ClickFormElement}>
                            {Text}
                        </Link>
                    </Typography>
                )
        }else{
            return(
                    <Typography onClick={ClickFormElement} keyName={keyName} 
                    style={{fontSize: `${FontSize}px`, fontWeight: FontStyle, fontStyle:FontStyle, textDecoration:FontStyle, 
                    overflow: autoSize, color: FontColor, textAlign: Alignment, padding:BorderWidth , overflow: "hidden", FontFamily:FontFamily, 
                    whiteSpace:"pre-wrap"
                    }}
                    > 
                    
                        {Text}
                    
                        
                    </Typography>
                )
        }
        
           
    }

    const handleChangeAccordion = (panel) => (event, newExpanded) => {
        let ariaexpanded , params = new Map, TokenReturn, json; 
        setExpanded(!expanded);
        setExpandedMap(expandedMap.set(panel, !expandedMap.get(panel)))
        const id = event.currentTarget.getAttribute("keyName")
        let content = document.getElementById(id + "content")
        ariaexpanded = content.style.display ==="inline-block"?"none":"inline-block";
        content.style.display = ariaexpanded
        params.set('prefix', 'forms');
        params.set("comand", "ElementEvent");
        params.set("SectionID", props.id);/////
        params.set("Name", id);
        params.set("Collapsed", ariaexpanded==="inline-block"?"0":"1");
        json = XMLrequest(params);
        CheckAnserOnElementEvent(json);
    };

    function CheckAnserOnElementEvent(json){
        if(!isEmptyObject(json)){
            setTransition(true)
            const TokenReturn = tokenProcessingTest(json, "forms");
            if( TokenReturn !== undefined){
                GetParamDialog(TokenReturn);
            }else if(json.Form !== undefined){
                // CheckAndReturnComponent(json);
                setDataForms(json);
            }  
           setTransition(false) 
        }
    }

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
      
    function ClickFormElement(event,IName, Index){
        let params = new Map, json, Name = null, TokenReturn, el;
        
        // setCursor("wait")
        if(event !== undefined){
            if(event.currentTarget){
                el = event.currentTarget
                Name = event.currentTarget.getAttribute("name");
                Name = Name === null? event.currentTarget.getAttribute("keyName"): Name
                Name = Name === null? event.currentTarget.getAttribute("data-path"): Name
            }else if (event.tagName){
                el = event
                Name = event.getAttribute("name");
                Name = Name === null? event.getAttribute("keyName"): Name
                Name = Name === null? event.getAttribute("data-path"): Name 
            }   
        }
        Name = Name === null? IName: Name
        
        if (Name !== null ){
            params.set('prefix', 'forms');
            params.set("comand", "ElementEvent");
            params.set("SectionID", props.id);/////
            params.set("Name", Name);
            if (el) params.set("Text", el.dataset.value);
            if(Index) params.set("Index", Index)
            params.set("WSM", "1");
            json = XMLrequest(params);
            CheckAnserOnElementEvent(json);
        }

        
        // await axios.get(URL(params)).then((res)=> setData(res.data));
        
    }

    function sortByIndex(arr) {
        arr.sort((a, b) => a.Index > b.Index ? 1 : -1);
      }

    function GridMaker(Path, keyName){
        setTimeout(() => {
            return ManWhoSoldTheWorld(props.id, Path, keyName)
        }, 1000);
    }

    function ConvertAlignment(item){
        switch(item){
            case"центр":
                return "center"
            case"влево":
                return "left"
            case"вправо":
                return "right"
        }
    }
    
    function ConvertBorder(borderInfo , BevelWidth){
        if(borderInfo){
            let borderInfoArr= borderInfo.split(",");
            for(const [key, value] in borderInfoArr){
                switch(value){
                    case "лево":
                        break;
                    case "право":
                        break;
                    case "верх":
                        break;
                    case "низ":
                        break;
                }
            } 
        }
        
    }
// bgcolor(main) - #faf9f5
// splitter color - #dcd8cc
//  selected section - #dcd8cc


    function DeleteActivFrame() {
    
        var frams
        frams = document.querySelectorAll(".Params.ActivParams")
        for (let n = 0; n <= frams.length - 1; n++) {
        let Activ = frams[n]
        let reps = Activ.querySelectorAll(".ActivReport")
        for (let f = 0; f <= reps.length - 1; f++) {
            let rep = reps[f];
            if (rep) {
            rep.classList.remove('ActivReport')
            }
        }
        }
    }
  
  function InsertIdReport(Html) {
    DeleteActivFrame();
    var rep
    Html = String(Html).replaceAll("\'", "\"");
    Html = String(Html).replaceAll("overflow: hidden;", "");
    Html = String(Html).replaceAll(/[\n]+/g, "");
    Html = String(Html).replaceAll(/[\r]+/g, "");
    rep = "<iframe srcdoc ='" + Html + "' style = 'width: 100%; height: 100%; border-width: 0px;' class='ActivReport'></iframe>"
    return rep
  }

  function LinkrefClick(ViewIdent) {
    let frame
    let frams = document.querySelectorAll(`.${"TestForms" + props.id}`);
    for (let n = 0; n<=frams.length - 1; n++){
        frame = frams[n].querySelector("iframe.ActivReport");
        frame.onload = function (ev) { 
        let Test = frame.contentDocument.getElementsByClassName("linkref")
        for (const [key, value] of Object.entries(Test)) {
            if (value.onclick === null) {
                value.onclick = function(event){
                ClickFormElement(event);
                }
            }
        }
        
    }
        let elem = frame.contentDocument.getElementsByClassName("linkref")
        for (const [key, value] of Object.entries(elem)) {
            if (value.onclick === null) {
            value.onclick = function(event){
                ClickFormElement(event);
                }
            }
        }
    }
    }

  function RadioChange(event){
    let Name,index
    const  value = event.target.value.split(",")
    Name = value[0]
    index = value[1]
    console.log(Name,index )
    ClickFormElement(undefined,Name,index)
    // const newJsonForRadio = Object.assign({[Name]:event.target.value},radioValues)

    }

    function ShouldUseFullScreen(Anchors){
        let w,h
        w = Anchors.includes("лево,право")
        h = Anchors.includes("верх,низ")
        return {w:w,h:h}
    }

    function CalculateSize(pw,cw){
        let oneprecent = Number(pw) / 100 * 1
        return `${Number(cw)/oneprecent}%`
    }

    function CalculateMargin(cols,target, width, left){
        let TargetSolo=Number(target.split(":")[0]), count = 1, elemWidthPrecent ,LeftPx = 0, RightPx = 0, RightPrecent, LeftPrecent, elemPX;
        let ColsArrayWithPrecent = cols.split(";");
        const widthprecent = width / 100;
        for(const[key,value] of Object.entries(ColsArrayWithPrecent)){
            if(value.substring(2,3) !== "%"){
                if(TargetSolo === count){
                    elemWidthPrecent = `${Number(value) / widthprecent}%`;
                    elemPX = Number(value) / 2
                }else{
                    if(count < TargetSolo){
                        LeftPx += Number(value) /2
                    }else{
                        RightPx += Number(value) /2
                    }
                }
                count +=1
            }
        }
        if(RightPx>0){
            elemPX+= RightPx;
        }else if(LeftPx > 0){
            elemPX-= LeftPx;
        }
        LeftPrecent = `calc(${ColsArrayWithPrecent[0]} - ${elemPX}px)`
        RightPrecent = `calc(${ColsArrayWithPrecent[ColsArrayWithPrecent.length - 1]} - ${elemPX}px)`
        // console.log(elemWidthPrecent, LeftPrecent, RightPrecent)
        // console.log(ColsArrayWithPrecent, TargetSolo, width) 
        return {ml:LeftPrecent , mr:RightPrecent, w:elemWidthPrecent}
    }

    function CheckAndReturnComponent(json, SubLabel, keyName, RCDATAFormParent, widthFromParent,ColsFromParent){
        let ReturnComponent =[],Enabled, Height, Left, Top, Name, Width,  RCDATA, Text, Visability, Right,Bottom, BGColor, returnSub=[],style, Anchors;
        Left = GetParams(json, "Left");
        Top = GetParams(json, "Top");
        Height = GetParams(json, "Height");
        Width = GetParams(json, "Width");
        Name = GetParams(json, "Name");
        Enabled = GetParams(json, "Enabled") === "1"?false:true;
        Visability = GetParams(json, "Visible");
        Visability = Visability ==="1"?"visible": Visability === undefined?"visible":"hidden" ;
        BGColor = BackColor(GetParams(json, "Back-color"));
        Anchors = json.Anchors;
        switch(json.Type){
            case "TImage":

                RCDATA = GetParams(json,"RCDATA");
                if(SubLabel === "TCategoryPanel"){
                    let LocalTop = RCDATAFormParent?Number(Top) + 56:Top
                    ReturnComponent.push(
                    <Grid keyName={keyName} style={{ position:"absolute" ,left:`${Left}px`, top:`${LocalTop}px`, visibility:Visability }}>
                        <img style={{width: `${Width}px`,height:`${Height}px`}} src={`data:image/png;base64,${RCDATA}`} />
                    </Grid>
                    ) 
                }else{
                  ReturnComponent.push(
                    <Grid keyName={keyName} style={{ position:"absolute" ,left:`${Left}px`, top:`${Top}px`, visibility:Visability }}>
                        <img style={{width: `${Width}px`,height:`${Height}px`}} src={`data:image/png;base64,${RCDATA}`} />
                    </Grid>
                    )  
                }
                
                break;

            case "TButton":
                Text = GetParams(json,"Text");
                const rcdataIcon = json.RCDATA
                let icon = <img  src={`data:image/png;base64,${rcdataIcon}`} />
                let sxStyle = Text ===""?{ "& .MuiButton-startIcon": { margin: "0px" }}:{}
                if(SubLabel === "TCategoryPanel"){
                    let LocalTop = RCDATAFormParent?Number(Top) + 52:Top
                    ReturnComponent.push(
                        <Button keyName={keyName} disabled={Enabled} name={Name} secid={props.id} onClick={ClickFormElement} variant="outlined" 
                        sx={sxStyle}
                            startIcon={rcdataIcon === undefined?undefined:icon}
                            style={{
                            color: Enabled? BackColor(json["Font-color"]): "grey" ,backgroundColor:BackColor(json["Back-color"]),
                            minWidth: "1px", width: `${Width}px`,height:`${Height}px`,position:"absolute", left:`${Left}px`, top:`${LocalTop}px`, 
                            textTransform:"none" , visibility:Visability
                            }}>
                            
                            {TextFromServerToBrowser(json)}  
                            {SubDataProcessing(json)}  
                        </Button>
                    )
                }else{
                    ReturnComponent.push(
                        <Button keyName={keyName} disabled={Enabled} name={Name} secid={props.id} onClick={ClickFormElement} variant="outlined" 
                        sx={sxStyle}
                            startIcon={rcdataIcon === undefined?undefined:icon}
                            style={{
                            color: Enabled? BackColor(json["Font-color"]): "grey" ,backgroundColor:BackColor(json["Back-color"]),
                            minWidth: "1px", width: `${Width}px`,height:`${Height}px`, position:"absolute", left:`${Left}px`, top:`${Top}px`, 
                            textTransform:"none" , visibility:Visability
                            }}>
                            
                            {TextFromServerToBrowser(json)}  
                            {SubDataProcessing(json)}  
                        </Button>
                    )
                }
                
                
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
                let EditStyle, EditStyleCompleteInt = 0, PickListEditor,list="";
                Text = GetParams(json,"Text")
                // console.log(GetParams(json, "EditStyle"))
                EditStyle = GetParams(json, "EditStyle");
                PickListEditor = GetParams(json, "PickList");
                
                try{
                    EditStyle = EditStyle === undefined? EditStyle: EditStyle.split(",");
                    PickListEditor = PickListEditor.split("\r\n")
                    PickListEditor.pop();
                    for (const [key, value] of Object.entries(PickListEditor)){
                        list += `${value},`
                    }
                    list = list === ""? list:list.substring(0, list.length - 1)
                }catch{

                }
                
                if(EditStyle !== undefined){
                   for (const [keyEdit, valueEdit] of Object.entries(EditStyle)) {
                    for (const [keyJson, value] of Object.entries(EditStyleJson)) {
                        if(valueEdit === keyJson){
                            EditStyleCompleteInt =EditStyleCompleteInt+ value
                        }
                    }
                } 
                }
                
                
                ReturnComponent.push(
                    <Grid keyName={keyName} style={{position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px`, visibility:Visability  }}>
                        {/*
                        
                        <TextField variant="standard"  defaultValue={Text} style={{ width: `${Width}px`,height:`${Height}px` }} />
                        */ }
                        <Editor list={list} name={keyName} value={Text} EditStyle={EditStyleCompleteInt} style={{ width: `${Width}px`,height:`${Height}px` }} onDropDownList={ClickFormElement} />
                    </Grid>
                    
                )
                break;

            case "TSectionPanel":// WITH SUB
                if(json.align){
                    Width= "100%"
                    Height = "100%"
                }else{
                    Width= `${Width}px`
                    Height = `${Height}px`
                }
                style={position:"absolute",left:`${Left}px`, top:`${Top}px`, width: Width,height:Height, visibility:Visability, backgroundColor: BGColor }

                if(json.CLSID === "{408E20A3-4BE3-4DCD-98BD-2613A8968783}") {//content
                    let content = InsertIdReport(json.content)
                    if(Left === undefined && Top=== undefined){
                        delete style.left
                        delete style.top
                        delete style.position
                    }
                    ReturnComponent.push(
                        <Grid id={`gridpanel`+props.id + keyName} keyName={keyName} style={style}>
                            <div dangerouslySetInnerHTML={{ __html: content }} style={{height:"inherit"}} onLoadCapture={LinkrefClick}>
                                
                            </div>
                        </Grid>
                    )
                    break;
                }else if(json.CLSID ==="{295EA015-4573-4AD9-922A-A14CE0FD9C78}"){//grid
                        try{
                        let Path = json.Params.Path
                        if(Path !== undefined){
                            let params = new Map
                            params.set('prefix','programs'); 
                            params.set('comand','GetTableLayout');
                            params.set ('ObjType',"0");
                            params.set("Path",Path )
                            params.set("SectionID", props.id) 
                            XMLrequest(params)
                            ReturnComponent.push(
                                <Grid id={`gridpanel`+props.id } keyName={keyName} style={{position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: Width,height:Height, visibility:Visability, backgroundColor: BGColor }}>
                                    <Paper  elevation={2}>
                                    {GridMaker(Path, keyName)} 
                                    </Paper>
                                </Grid>
                            )
                            break;
                        }
                        

                        
                        // GET /programs~GetTableLayout?LicGUID=72D72A7946ED30AB0808358980788EDA&ObjType=0&Path={7FEC323D-E184-4147-8F44-352DD337B515}&SectionID=482 HTTP/1.0
                        // POST /programs~HandleTable?LicGUID=72D72A7946ED30AB0808358980788EDA&Path={7FEC323D-E184-4147-8F44-352DD337B515}&SectionID=482 HTTP/1.0
                    }catch(err){
                        // console.log(err)
                    } 
                }

            
                
                // console.log(json)
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
                style ={position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${FixedWidth}px`,height:`${Height}px`,  visibility:Visability }
                Anchors = json.Anchors;
                Anchors = ShouldUseFullScreen(Anchors);
                Right = Anchors.w ?`${Left}px`:`${0}px`;
                Height = Anchors.h ?"95%":`${Height}px`;
                Width =  `${Width}px`
                if(json.Align === "целиком"){
                    Width = "100%"
                    Height = "95%"
                }
                if(ColsFromParent){
                    const jm= CalculateMargin(ColsFromParent,json.Target,widthFromParent, Number(Left));
                    style = Object.assign(style, { right:jm.mr, left:jm.ml})
                    // delete style.width
                } 
                if(Anchors.w && !ColsFromParent){
                    delete style.width
                    style = Object.assign(style,{right:Right})
                }
                if(SubLabel === "TCategoryPanel"){
                    let LocalTop = RCDATAFormParent?Number(Top) + 57:Top
                    style=Object.assign(style, {top:`${LocalTop}px`,})
                    console.log()
                    ReturnComponent.push(
                        <Grid keyName={keyName} style={style}>
                            {TextFromServerToBrowser(json, keyName)}                             
                        </Grid>
                    )  
                }else{
                    ReturnComponent.push(
                        <Grid keyName={keyName} style={style}>
                            {TextFromServerToBrowser(json, keyName)}
                        </Grid>
                    )   
                }
                
                break;

            case "TCategoryPanelGroup"://WITH SUB
                RCDATA = GetParams(json,"RCDATA"); 
                ReturnComponent.push(
                    <Grid keyName={keyName} style={{position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:"90%", overflowY:"auto", overflowX:"hidden", visibility:Visability, 
                    // backgroundColor: BGColor
                     }}>
                         <Scrollbars autoHide>
                             {SubDataProcessing(json,null, RCDATA)}
                         </Scrollbars>
                        
                        
                    </Grid>
                )
                break;

            case "TCategoryPanel"://WITH SUB
                let Caption, name = keyName, fs, Collapsed
                if(json.Caption){
                    Caption= json.Caption
                }else{
                    Caption = json.caption; 
                }
                if(json.click$name){
                    name = json.click$name
                }
                Collapsed = json.Collapsed === undefined? json.collapsed === undefined?true :false:false 
                let BoolOpen = expandedMap.get(Caption);
                if( Collapsed){
                    expandedMap.set(Caption, true)
                    BoolOpen = expandedMap.get(Caption);
                }else{
                    expandedMap.set(Caption, false)
                    BoolOpen = expandedMap.get(Caption);
                }
                let HadImg = RCDATAFormParent?true:false
                Width = Width === undefined? "100%": `${Width}px`
                style ={ width: Width,height:`${Height}px`, display:BoolOpen? "inline-block":"none" , backgroundColor:"#ffffff", padding:0}
                fs = BackFontweight(json["Font-style"])
                ReturnComponent.push(
                    <Accordion expanded={BoolOpen} onChange={handleChangeAccordion(Caption)} keyName={keyName} style={{marginBottom:"2%"}}>
                        <AccordionSummary  keyName={keyName}  style={{backgroundColor:"#edeae2"}} expandIcon={<img src={AccorionDownIcon}/> }>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" keyName={keyName}>
                                <Grid item style={{position:"relative", left:"-16px"}} keyName={keyName}>
                                    <img  src={`data:image/png;base64,${json["RCDATA"] === undefined?RCDATAFormParent:json["RCDATA"]}`} />
                                </Grid>
                                <Grid item keyName={keyName}>
                                    <Typography keyName={keyName} style={{ fontWeight: fs, fontStyle:fs, textDecoration:fs,}} >{Caption}</Typography>
                                </Grid>
                            </Grid>
                        </AccordionSummary>
                        <AccordionDetails keyName={keyName+"content"} id={keyName+"content"} bool={"false"} style={style}>
                            {SubDataProcessing(json,"TCategoryPanel",HadImg)} 
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
                    <Tabs keyName={keyName} class="Tabs" selectedIndex={0} 
                    style={{ position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px`,
                     display:Visability, backgroundColor: BGColor }} >
                        {SubDataProcessing(SortedTabs, "TTabbedPages")} 
                    </Tabs>
                )
                break;

            case "TTabPagePanel"://WITH SUB
                Text = GetParams(json,"Text");
                Text = Text === undefined? GetParams(json,"Title"): Text;
                ReturnComponent.push(
                   <TabItem keyName={keyName} label={Text} style={{ position:"absolute" ,left:`${Left}px`,  width: `${Width}px`,height:`${Height}px`, display:Visability, backgroundColor: BGColor}}>
                       {SubDataProcessing(json, "TTabPagePanel")} 
                    </TabItem> 
                )
                
                break;

            case "TGradientPanel"://WITH SUB
                let BorderRadius = json.BevelEdges
                let BorderStyle = json.BorderStyle;
                BorderStyle = BorderStyle ==="линия"?true:false
                // ConvertBorder(BorderRadius, GetParams(json,"BevelWidth"))
                let Radius = json.Radius
                Text = GetParams(json,"Text");
                Text = Text.substr(0, 8)
                let BevelWidth= GetParams(json,"BevelWidth");
                
                BevelWidth = BevelWidth=== undefined?0:Number(BevelWidth)
                BevelWidth = Number(Radius) > 0? BevelWidth : 0
                Anchors = ShouldUseFullScreen(Anchors);
                // console.log(Number(Top) , Number(Height))
                Right = Anchors.w ?`${Left}px`:`${0}px`;
                Bottom = Anchors.h ?`${Number(Top) + Number(Height)}px`:`${0}px`;
                Height = `${Height}px`
                console.log(Bottom)
                Width =  `${Width}px`
                if(json.Align === "целиком"){
                    Width = "100%"
                    Height = "95%"
                }
                
                style = {position:"absolute" ,left:`${Left}px`, top:`${Top}px`,height: Height, width: Width,
                overflowY:"auto", overflowX:"hidden", display:Visability, backgroundColor: BGColor, borderRadius:`${Radius}px`, 
                overflow:"hidden", borderColor:"#cbcbca", borderStyle:"solid", borderWidth:`${BevelWidth}px`}
                
                if(Anchors.w){
                    delete style.width
                    style = Object.assign(style,{right:Right})
                }
                if(Anchors.h){
                    
                    // delete style.height
                    // style = Object.assign(style,{bottom:Bottom})
                }
                if(json.RadioButton1){
                    let counterOfRadio= 0, defaultValueOfRadio = Name+ ","
                    for(const [key,value] of Object.entries(json)){
                        if(key.substring(0,11) === "RadioButton"){
                            if(value.Checked === "1"){
                                defaultValueOfRadio += counterOfRadio ;
                            }
                            counterOfRadio+=1;
                        }
                    }
                    ReturnComponent.push(
                        <Grid keyName={keyName}   style={style}>
                            
                            <FormControl >
                                    <RadioGroup  onChange={RadioChange} defaultValue={defaultValueOfRadio} value={radioValues[Name]}>
                                        
                                       {SubDataProcessing(json)}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    )
                }else if(SubLabel === "TCategoryPanel"){
                    ReturnComponent.push(
                        <Grid keyName={keyName}  
                        style = {{height: Height, width: Width,
                            left:`${Left}px`, top:`${Top}px`, position:"relative",
                        overflowY:"auto", overflow:"hidden",}} 
                        >
                            {SubDataProcessing(json,  "TCategoryPanel")}
                           
                        </Grid>
                        ) 
                }else{
                   ReturnComponent.push(
                    <Grid keyName={keyName}  style={style}>
                        {SubDataProcessing(json)}
                        {json.ShowCaption === "0"?<></>:TextFromServerToBrowser(json, keyName)}
                    </Grid>
                    ) 
                }
                
                break;

            case "TBevel"://WITH SUB
                style = {position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,
                height:`${Height}px`, overflowY:"auto", overflowX:"hidden", display:Visability, 
                backgroundColor: BGColor }

                if(ColsFromParent){
                    const jm= CalculateMargin(ColsFromParent,json.Target,widthFromParent, Number(Left));
                    style = Object.assign(style, {left:jm.ml , right:jm.mr })
                }    
                ReturnComponent.push(
                    <Grid keyName={keyName} style={style}>
                        <div style={{height:"2px", backgroundColor: "#cbcbca", borderRadius:"1px", marginTop:`${Number(Height*0.5)}px`}}>
                            {/* {SubDataProcessing(json)} */}
                        </div>
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

            case "TRadioButton":
                Text = GetParams(json, "Text")
                let RadioValue= json.Parent +","+ `${Number(keyName.substring(11,12))-1}`
                ReturnComponent.push(
                    <FormControlLabel value={RadioValue} control={<Radio 
                        sx={{
                            '& .MuiSvgIcon-root': {
                              fontSize: 18,
                              color: "#4d4d4d",
                                '&.Mui-checked': {
                                color: "#4d4d4d",
                                },
                            },
                          }}
                    />} label={Text}
                    style={{position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px`,}}
 
                    />
                )
                break;

            case "TListBox":

                break
            case "TMarkingPanel":
                let WidthPrecent = CalculateSize(widthFromParent,Width )
                style = {position:"absolute" ,left:`${Left}px`, right:`${Left}px`,  top:`${Top}px`,height:`${Height}px`,
                overflowY:"auto", overflowX:"hidden", visibility:Visability, backgroundColor: BGColor }

                ReturnComponent.push(
                    <Grid keyName={keyName} style={style} >
                        {SubDataProcessing(json,"TMarkingPanel",null,json.Cols)}
                    </Grid>
                )
                break;
            
        }
        
        return ReturnComponent;
    }

function ChangeTabs(event){
    setTimeout(() => {
        let main = document.getElementsByClassName("Tabs")
        let Tabs, tabsHeader, span
        for (const [keyOfTabs, valueOfTabs] of Object.entries(main)){
            Tabs = valueOfTabs
            if(!Tabs.getAttribute("styled")){
                Tabs.setAttribute("styled", "true")
                for (const [key, value] of Object.entries(Tabs["_tabLabelContainers"])) {
                    value.style.BorderRadius = "0px"
                    value.classList.add("Borders");
                    value.classList.add("selectedTabItem[selected]");
                    if(Number(key) === 0){
                        value.classList.add("WithoutLeftBorder");
                    }else{
                        value.classList.add("LeftBorder");
                    }
                    if(Tabs["_tabLabelContainers"].length -1 === Number(key)){
                        value.classList.add("RightBorder");
                    }else{
                        value.classList.add("WithoutRightBorder");
                    }
                } 
                tabsHeader = Tabs.children[0].children[0];
                tabsHeader.style.backgroundColor = "#ffffff"
                tabsHeader.classList.add("disableBorder");
                Tabs.children[0].children[0].children[0].classList.add("SmartCustom");
                console.log(Tabs.children[0].children[0].children[0])
                span = Tabs.children[0].children[0].children[0].getElementsByTagName("span")[0]
                span.classList.add("selectionBarCustom")
                Tabs.children[0].children[1].style.overflowY = "scroll" //Это где данные отображаются 
                Tabs.children[0].children[1].classList.add("headerSmartCustom"); 
            }
            
        }
        
    }, 100);
}



function FormDataProcessing(json) {
        if(dataForms !== undefined){
            let val, returnAll=[]
            json = json.Form;
            for(const [key, value] of Object.entries(json)) {
                val = value
                if(val.Type !==undefined ){
                    try{
                        returnAll.push( CheckAndReturnComponent(value, false, key))
                    }catch(err){
                        console.log(err)
                    }
                                         
                }
            }

            return(
                <div  className={"TestForms"+props.id}  style={{position:"relative", height: "100%", width:"100%"}} onLoad={ChangeTabs}>
                    {returnAll}
                </div>
            )
            
        }
        
    }

    function SubDataProcessing(json, subElement, RCDATA,Cols){
        if(dataForms !== undefined){
            let val, returnAll=[]
            //json = json.Form;
            for(const [key, value] of Object.entries(json)) {
                val = value
                if(val.Type !==undefined ){
                    returnAll.push( CheckAndReturnComponent(value, subElement, key, RCDATA, json.Width,Cols)) 
                }
            } 
            return returnAll 
        }
        
    }

    function Load (){
        return(
            <Grid container direction="row" justifyContent="center" alignItems="center" style={{ height: `${currentHeight}px` }}>
                <Grid item>
                    <div>
                        <CircularProgress
                            className={
                                cn("circularProgress",{light: theme === "light"})
                            } 
                        />
                    </div>
                </Grid>
            </Grid>
            
        ) 
    }


        return(
        <>
            <SectionToolsJS ID={props.id} SetBackValue={setSubForms}  buildForms ={FormDataProcessing}/>
            <Fade in={!transition}>
                <Grid id={"mainForms" + props.id} style={{position:"relative", height: "100%", width:"100%", backgroundColor:"s", cursor: cursor}}>
                    
                        {load?<Load/> :FormDataProcessing(dataForms)}
                   
                </Grid>
             </Fade>
            
            <Grid id="RenderFormsModal">

            </Grid>
        </>
            
        )  
    
}