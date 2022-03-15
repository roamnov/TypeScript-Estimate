import { Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography,CircularProgress } from "@mui/material";
import React,{Children, useEffect, useState} from "react";
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps} from '@mui/material/AccordionSummary';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { XMLrequest } from "../Url";
import { Tabs, TabItem, TabItemsGroup } from 'smart-webcomponents-react/tabs';
import Link from '@mui/material/Link';
import  { tokenProcessingTest } from "../TokenProcessing";

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

//////////////////////////////////////////////////////////////////////////////////////

export default function FormsMainFile(props){
    const [dataForms, setDataForms] = useState();
    const [expanded, setExpanded] = React.useState('panel1');
    const [expandedMap, setExpandedMap] = React.useState(new Map);
    const [load, setLoad] = React.useState(true)
    const [currentHeight, setCurrentHeight] = useState(window.innerHeight - 189);
    
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
       // if(dataForms !== undefined){
        //     FormDataProcessing(dataForms)
        // }
    },[dataForms])

    const GetSectionForms=()=>{//GET /forms~GetSectionForm?LicGUID=8C5F5163443EBAC78D42B78939951952&SectionID=482 HTTP/1.0
        let params = new Map, json;
        params.set('prefix', 'forms');
        params.set("comand", "GetSectionForm");
        params.set("SectionID", props.id);/////
        json = XMLrequest(params);
        setDataForms(json);
        setLoad(false);        
    }

    function GetParams(json, param){
        return json[param] ===undefined?  json[param.toLowerCase()] : json[param];        
    }

    function TextFromServerToBrowser(json){
        let Text, FontStyle, ReferenceLink, FontSize, autoSize
        autoSize = GetParams(json,"AutoSize") === "0"? "hidden": "unset"
        FontSize =  GetParams(json,"Font-size");
        Text = GetParams(json,"Text");
        ReferenceLink = GetParams(json,"Reference");
        FontStyle = BackFontweight(GetParams(json,"font-style"));
        if( ReferenceLink === "1"){
            return(
                    <Typography style={{fontSize: `${parseInt(FontSize, 10)*0,13}px`, fontWeight: FontStyle, fontStyle:FontStyle, textDecoration:FontStyle, overflow: autoSize }}> 
                        <Link href="#"  component="button" variant="body2" underline="hover">
                            {Text}
                        </Link>
                    </Typography>
                )
        }else{
            return(
                    <Typography style={{fontSize: `${parseInt(FontSize, 10)*0,13}px`, fontWeight: FontStyle, fontStyle:FontStyle, textDecoration:FontStyle, overflow: autoSize }}> 
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
        let colorArr = color.split(":")
        if (color === undefined) return "rgb(240,240,240)"
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
        if (isNaN(parsed)) { return 0; }
        return parsed ;
      }
      
    function ClickButton(event){
        let params = new Map, json;
        const Name = event.currentTarget.getAttribute("name");
        params.set('prefix', 'forms');
        params.set("comand", "ElementEvent");
        params.set("SectionID", props.id);/////
        params.set("Name", Name);
        params.set("WSM", "1");
        json = XMLrequest(params);
        tokenProcessingTest(json);
    }
    
    function CheckAndReturnComponent(json, SubLabel){
        let ReturnComponent =[],Enabled, Height, Left, Top, Name, Width,  RCDATA, Text, FontSize, FontStyle, ReferenceLink
        Left = GetParams(json, "Left");
        Top = GetParams(json, "Top");
        Height = GetParams(json, "Height")
        Width = GetParams(json, "Width")
        Name = GetParams(json, "Name")
        switch(json.Type){
            case "TImage":
                RCDATA = GetParams(json,"RCDATA")
                ReturnComponent.push(
                    <Grid  style={{ position:"absolute" ,left:`${Left}px`, top:`${Top}px`}}>
                         <img style={{width: `${Width}px`,height:`${Height}px`}} src={`data:image/png;base64,${RCDATA}`} />
                    </Grid>
                )
                break;

            case "TButton":
                Text = GetParams(json,"Text")
                
                ReturnComponent.push(
                    <Button name={Name} secid={props.id} onClick={ClickButton} variant="contained" style={{color: BackColor(json["Font-color"]),backgroundColor:BackColor(json["Back-color"]) ,position:"absolute", minWidth: "1px", width: `${Width}px`,height:`${Height}px`,left:`${Left}px`, top:`${Top}px`, textTransform:"none"}}>
                        {Text}
                        {SubDataProcessing(json)}  
                    </Button>
                )
                
                break;

            case "TSectionCheckBox":
                Text = GetParams(json,"Text")
                ReturnComponent.push(
                    <Grid style={{ position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px`}}  >
                        <FormControlLabel style={{width:"max-content"}} control={<Checkbox defaultChecked />} label={Text} />
                    </Grid>
                )
                break;

            case "TSectionEditor":
                Text = GetParams(json,"Text")
                ReturnComponent.push(
                    <Grid style={{position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px`  }}>
                        <TextField variant="standard"  defaultValue={Text} style={{ width: `${Width}px`,height:`${Height}px` }} />
                    </Grid>
                    
                )
                break;

            case "TSectionPanel":// WITH SUB
                ReturnComponent.push(
                    <Grid style={{position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px` }}>
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
                        <Grid style={{paddingLeft:`${Left}px`  } }>
                               {TextFromServerToBrowser(json)}                             
                        </Grid>
                    )  
                }else{
                    ReturnComponent.push(
                        <Grid style={{position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${FixedWidth}px`,height:`${Height}px`, whiteSpace: "nowrap" }}>
                            {TextFromServerToBrowser(json)}
                        </Grid>
                    )   
                }
                
                break;

            case "TCategoryPanelGroup"://WITH SUB

                ReturnComponent.push(
                    <Grid style={{position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px`, overflowY:"auto", overflowX:"hidden" }}>
                        {SubDataProcessing(json)}
                    </Grid>
                )
                break;

            case "TCategoryPanel"://WITH SUB
                let Caption = GetParams(json,"caption")
                let BoolOpen = expandedMap.get(Caption)
                ReturnComponent.push(
                    <Accordion expanded={BoolOpen} onChange={handleChangeAccordion(Caption)}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography>{Caption}</Typography>
                        </AccordionSummary>
                        <AccordionDetails  style={{ width: `${Width}px`,height:`${Height}px`}}>
                            {SubDataProcessing(json,"TCategoryPanel")} 
                        </AccordionDetails>
                    </Accordion> 
                )
                break;

            case "TTabbedPages"://WITH SUB
                ReturnComponent.push(
                    <Tabs class="Tabs" selectedIndex={0} style={{ position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px` }} >
                        {SubDataProcessing(json, "TTabbedPages")} 
                    </Tabs>
                )
                break;

            case "TTabPagePanel"://WITH SUB
                Text = GetParams(json,"Text")
                ReturnComponent.push(
                   <TabItem label={Text} style={{ position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px` }}>
                       {SubDataProcessing(json, "TTabPagePanel")} 
                    </TabItem> 
                )
                
                break;

            case "TGradientPanel"://WITH SUB
                ReturnComponent.push(
                    <Grid style={{position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px`, overflowY:"auto", overflowX:"hidden" }}>
                        {SubDataProcessing(json)}
                    </Grid>
                )
                break;

            case "TBevel"://WITH SUB
                ReturnComponent.push(
                    <Grid style={{position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px`, overflowY:"auto", overflowX:"hidden" }}>
                        {SubDataProcessing(json)}
                    </Grid>
                )
                break;
            
        }
        return ReturnComponent;
    }

    function FormDataProcessing(json){
        if(dataForms !== undefined){
            let val, returnAll=[]
            json = json.Form;
            for(const [key, value] of Object.entries(json)) {
                val = value
                if(val.Type !==undefined ){
                    returnAll.push( CheckAndReturnComponent(value, false))                     
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
                    returnAll.push( CheckAndReturnComponent(value, subElement)) 
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
            <Grid id="mainForms" style={{position:"absolute"}}>
                {FormDataProcessing(dataForms)}
            </Grid>
        )  
    }
    
}