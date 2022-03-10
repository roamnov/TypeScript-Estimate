import { Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import React,{Children, useEffect, useState} from "react";
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps} from '@mui/material/AccordionSummary';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { XMLrequest } from "../Url";
import { Tabs, TabItem, TabItemsGroup } from 'smart-webcomponents-react/tabs';

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
        
    }

    function GetParams(json, param){
        return json[param] ===undefined?  json[param.toLowerCase()] : json[param];        
    }

    function TextFromServerToBrowser(text, size, Reference){

        return(
                    <Typography style={{fontSize: `${parseInt(size, 10)*0,15}px`, }}> 
                        {text}
                    </Typography>
                )
           
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
        }
    }
    
    function roughScale(x, base) {
        const parsed = parseInt(x, base);
        if (isNaN(parsed)) { return 0; }
        return parsed ;
      }
      
    
    function CheckAndReturnComponent(json, SubLabel){
        let ReturnComponent =[],Enabled, Height, Left, Top, Name, Width,  RCDATA, Text, FontSize, FontStyle, ReferenceLink
        Left = GetParams(json, "Left");
        Top = GetParams(json, "Top");
        Height = GetParams(json, "Height")
        Width = GetParams(json, "Width")
        switch(json.Type){
            case "TImage":
                RCDATA = GetParams(json,"RCDATA")
                ReturnComponent.push(
                    <Grid  style={{ position:"absolute" ,left:`${Left}px`, top:`${Top}px`}}>
                         <img src={`data:image/png;base64,${RCDATA}`} />
                    </Grid>
                )
                break;
            case "TButton":
                Text = GetParams(json,"Text")
                
                ReturnComponent.push(
                    <Button variant="contained" style={{color: BackColor(json["Font-color"]),backgroundColor:BackColor(json["Back-color"]) ,position:"absolute", width: `${Width}px`,height:`${Height}px`,left:`${Left}px`, top:`${Top}px`, textTransform:"none"}}>{Text}</Button>
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
                FontSize =  GetParams(json,"Font-size")
                Text = GetParams(json,"Text")
                let FixedWidth = roughScale(Width, 10) + 8
                ReferenceLink = GetParams(json,"Reference")
                FontStyle = GetParams(json,"font-style")
                if(SubLabel === "TCategoryPanel"){
                    ReturnComponent.push(
                        <Grid style={{paddingLeft:`${Left}px`  } }>
                            <BackFontweight>
                               {TextFromServerToBrowser(Text, FontSize, false)} 
                            </BackFontweight>
                            
                        </Grid>
                    )  
                }else{
                    ReturnComponent.push(
                        <Grid style={{position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${FixedWidth}px`,height:`${Height}px` }}>
                            {TextFromServerToBrowser(Text, FontSize, true)}
                        </Grid>
                    )   
                }
                
                break;

            case "TCategoryPanelGroup"://WITH SUB

                ReturnComponent.push(
                    <Grid style={{position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px`, overflowY:"scroll" }}>
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


    return(
        <Grid id="mainForms" style={{position:"absolute"}}>
            {FormDataProcessing(dataForms)}
        </Grid>
    )
}