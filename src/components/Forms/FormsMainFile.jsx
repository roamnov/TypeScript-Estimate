// import { Button, Checkbox, Grid, Paper, Radio , Typography,CircularProgress, Dialog ,DialogActions, RadioGroup, DialogContent, FormControlLabel, FormControl, FormLabel} from "@mui/material";
import React,{ useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { XMLrequest, get_cookie } from "../Url";
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
      transform: 'rotate(90deg)',
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
    const [dataForms, setDataForms] = useState();
    const [dataFormsUpd, setdataFormsUpd] = useState();
    const [expanded, setExpanded] = React.useState('panel1');
    const [expandedMap, setExpandedMap] = React.useState(new Map);
    const [load, setLoad] = React.useState(true)
    const [currentHeight, setCurrentHeight] = useState(window.innerHeight - 189);
    const [subForms, setSubForms] = useState(undefined);
    const [currentDrx, setCurrentDrx] = useState(LastDrx === undefined? "": LastDrx[0]);
    const [cursor,setCursor] = useState("auto");

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



    function TextFromServerToBrowser(json, keyName){
        let Text, FontStyle, ReferenceLink, FontSize, autoSize, FontColor, Alignment, BorderWidth
        autoSize = GetParams(json,"AutoSize") === "0"? "hidden": "unset"
        FontSize =  GetParams(json,"Font-size");
        Text = GetParams(json,"Text");
        ReferenceLink = GetParams(json,"Reference");
        FontStyle = BackFontweight(GetParams(json,"Font-style"));
        FontColor = BackColor(GetParams(json,"Font-color"))
        Alignment = ConvertAlignment (GetParams(json, "Alignment"));
        BorderWidth =GetParams(json,"BorderWidth");
        BorderWidth = BorderWidth === undefined? undefined:`${Number(BorderWidth)/100*50}px`
        // parseInt(FontSize, 10)*0,13}px`,
        if( ReferenceLink === "1"){
            return(
                    <Typography style={{fontSize: `${FontSize}px`, fontWeight: FontStyle, fontStyle:FontStyle, textDecoration:FontStyle, overflow: autoSize, color: FontColor , textAlign: Alignment, padding:BorderWidth, overflow: "hidden" }}> 
                        <Link keyName={keyName}  component="button" variant="body2" underline="hover" onClick={ClickFormElement}>
                            {Text}
                        </Link>
                    </Typography>
                )
        }else{
            return(
                    <Typography onClick={ClickFormElement} keyName={keyName} style={{fontSize: `${FontSize}px`, fontWeight: FontStyle, fontStyle:FontStyle, textDecoration:FontStyle, overflow: autoSize, color: FontColor, textAlign: Alignment, padding:BorderWidth , overflow: "hidden"}}> 
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
      
    async function ClickFormElement(event){
        let params = new Map, json, Name, TokenReturn;
        // setCursor("wait")
        Name = event.currentTarget.getAttribute("name");
        Name = Name === null? event.currentTarget.getAttribute("keyName"): Name
        params.set('prefix', 'forms');
        params.set("comand", "ElementEvent");
        params.set("SectionID", props.id);/////
        params.set("Name", Name);
        params.set("WSM", "1");
        json = XMLrequest(params);
        // await axios.get(URL(params)).then((res)=> setData(res.data));
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

    function GridMaker(Path){
        setTimeout(() => {
            return ManWhoSoldTheWorld(props.id, Path)
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
                if(SubLabel === "TCategoryPanel"){
                    ReturnComponent.push(
                    <Grid keyName={keyName} style={{ position:"absolute" ,left:`${Left}px`, top:`${Number(Top) + 38}px`, visibility:Visability }}>
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
                if(SubLabel === "TCategoryPanel"){
                    ReturnComponent.push(
                        <Button keyName={keyName} disabled={Enabled} name={Name} secid={props.id} onClick={ClickFormElement} variant="outlined" 
                        style={{
                        color: Enabled? BackColor(json["Font-color"]): "grey" ,backgroundColor:BackColor(json["Back-color"]),
                        minWidth: "1px", width: `${Width}px`,height:`${Height}px`,position:"absolute", left:`${Left}px`, top:`${Number(Top) + 40}px`, 
                        textTransform:"none" , visibility:Visability
                        }}>
                            
                            {TextFromServerToBrowser(json)}  
                            {SubDataProcessing(json)}  
                        </Button>
                    )
                }else{
                    ReturnComponent.push(
                        <Button keyName={keyName} disabled={Enabled} name={Name} secid={props.id} onClick={ClickFormElement} variant="outlined" 
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
                let EditStyle, EditStyleCompleteInt = 0;
                Text = GetParams(json,"Text")
                // console.log(GetParams(json, "EditStyle"))
                EditStyle = GetParams(json, "EditStyle");
                try{
                    EditStyle = EditStyle === undefined? EditStyle: EditStyle.split(",");
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
                        <Editor value={Text} EditStyle={EditStyleCompleteInt} style={{ width: `${Width}px`,height:`${Height}px` }}/>
                    </Grid>
                    
                )
                break;

            case "TSectionPanel":// WITH SUB
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
                        <Grid id={`gridpanel`+props.id} keyName={keyName} style={{position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px`, visibility:Visability, backgroundColor: BGColor }}>
                            <Paper  elevation={2}>
                               {GridMaker(Path)} 
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
                if(SubLabel === "TCategoryPanel"){
                    ReturnComponent.push(
                        <Grid keyName={keyName} style={{ visibility:Visability, width: `${FixedWidth}px`,height:`${Height}px`,position:"absolute" ,left:`${Left}px`, top:`${Number(Top) + 40}px`, } }>
                            {TextFromServerToBrowser(json, keyName)}                             
                        </Grid>
                    )  
                }else{
                    ReturnComponent.push(
                        <Grid keyName={keyName} style={{position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${FixedWidth}px`,height:`${Height}px`,  visibility:Visability }}>
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
                let Caption
                if(json.Caption){
                    Caption= json.Caption
                }else{
                    Caption = GetParams(json,"Сaption"); 
                }
                
                let BoolOpen = expandedMap.get(Caption);
                let TestVisability  = BoolOpen? "inline-block":"none" 
                ReturnComponent.push(
                    <Accordion expanded={BoolOpen} onChange={handleChangeAccordion(Caption)} keyName={keyName} >
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" style={{backgroundColor:"#edeae2"}}>
                            <Typography>{Caption}</Typography>
                        </AccordionSummary>
                        <AccordionDetails  style={{ width: `${Width}px`,height:`${Height}px`, display:TestVisability, backgroundColor:"#ffffff"}}>
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
                let BorderRadius = json.BevelEdges
                
                // ConvertBorder(BorderRadius, GetParams(json,"BevelWidth"))
                let Radius = json.Radius
                Text = GetParams(json,"Text");
                Text = Text.substr(0, 8)
                let BevelWidth= GetParams(json,"BevelWidth");
                BevelWidth = BevelWidth=== undefined?0:Number(BevelWidth)
                ReturnComponent.push(
                    <Grid keyName={keyName} 
                        style={{position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px`, 
                        overflowY:"auto", overflowX:"hidden", display:Visability, backgroundColor: BGColor, borderRadius:`${Radius}px`, 
                        overflow:"hidden", borderColor:"#cbcbca", borderStyle:"solid", borderWidth:`${BevelWidth}px` }}>
                        {SubDataProcessing(json)}
                        {Text === "Gradient"?<></>:TextFromServerToBrowser(json, keyName)}
                    </Grid>
                )
                break;

            case "TBevel"://WITH SUB
                    
                ReturnComponent.push(
                    <Grid keyName={keyName} style={{position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px`, overflowY:"auto", overflowX:"hidden", display:Visability, backgroundColor: BGColor }}>
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
                ReturnComponent.push(
                    <FormControlLabel value={Text} control={<Radio />} label={Text} />
                )
                break;

            case "TListBox":

                break
            case "TMarkingPanel":

                ReturnComponent.push(
                    <Grid keyName={keyName} style={{position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px`, overflowY:"auto", overflowX:"hidden", visibility:Visability, backgroundColor: BGColor }}>
                        {SubDataProcessing(json)}
                    </Grid>
                )
                break;
            
        }
        return ReturnComponent;
    }

function FormDataProcessing(json) {
        if(dataForms !== undefined){
            let val, returnAll=[]
            json = json.Form;
            for(const [key, value] of Object.entries(json)) {
                val = value
                if(val.Type !==undefined ){
                    returnAll.push( CheckAndReturnComponent(value, false, key))                     
                }
            }
            // setCursor("auto") 
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
            <Grid id="mainForms" style={{position:"absolute", height: "100%", width:"100%", backgroundColor:"s", cursor: cursor}}>
                {FormDataProcessing(dataForms)}
            </Grid>
            <Grid id="RenderFormsModal">

            </Grid>
        </Grid>
            
        )  
    }
}