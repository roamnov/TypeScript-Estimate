import  React from 'react';
import {  Backdrop,  Button, Grid, IconButton, LinearProgress, Step, StepLabel, Stepper, TextField } from "@mui/material"
import { XMLrequest } from '../../Url';

import { ImgURL } from "../../Url";
import ModalContainer from '../../Containers/ModalContainer';
import items from "./Items.json"
import AlertMini from '../../AlertMini';
import { SectionToolsToFooter } from '../../ComponentInterface';

const steps = [
    {
      label: 'Select campaign settings',
      description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
    },
    {
      label: 'Create an ad group',
      description:
        'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
      label: 'Create an ad',
      description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
  ];

  
export function VerticalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(1);
  
    return (
    
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                
              >
                {step.label}
              </StepLabel>
             
            </Step>
          ))}
        </Stepper>
      
    );
  }

//
//https://mui.com/components/toggle-button/
//
const SectionTools = (props:SectionToolsToFooter) =>{
    const [Program, setProgram] = React.useState([<></>]);
    const [requestId,setRequestId] = React.useState();
    const [menuBar, setMenuBar] = React.useState([]);
    const [inputText, setInputText] = React.useState();
    const [buttons, setButtons] = React.useState([]);
    const [value, setValue] = React.useState();
    const [progress, setProgress] = React.useState<number>(0);
    const [activeStep, setActiveStep] = React.useState(0);
    let IndexS = 0;

    React.useEffect(() => {
       GetSectionTools();
    }, [])


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


    function ChangeStatusProgress( RequestID:any){
        let params = new Map, data, json, progr:number;
        data = { "Result":"" }
        params.set('prefix', 'project');
        params.set("comand", "ResumeRequest");
        params.set("RequestID",RequestID );
        params.set("WSM", "1");
        json = XMLrequest(params,  data);
     /**/
        while(json.Break !== undefined){
            progr = Number(json.Params.Index);
            console.log(json);
            setProgress(progr);
            IndexS = progr;
            props.setChildren(progr);
          
            json = XMLrequest(params,  data);
        }
        
        
        tokenProcessing(json)
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
    
    function ShowProgressDialog(RequestID:string){
        let params = new Map, data, json:object;
        params.set('prefix', 'project');
        params.set("comand", "ResumeRequest");
        params.set("RequestID",RequestID );
        params.set("WSM", "1");
    }

    function EmptyRequest(RequestID:string){
        let params = new Map, data, json:object;
        params.set('prefix', 'project');
        params.set("comand", "ResumeRequest");
        params.set("RequestID",RequestID );
        params.set("WSM", "1");
        json = XMLrequest(params,  data);
        tokenProcessing(json);
    }

    function setCharAt(str: string,index: number,chr: any) {
        if(index > str.length-1) return str;
        return str.substring(0,index) + chr + str.substring(index+1);
    }

    function  tokenProcessing (json: any, DataJSX?:any ){///project~ResumeRequest?LicGUID=D100CAB54337ED32E087B59F6CE41511&RequestID=18892&WSM=1 HTTP/1.1
        if(json.Break !== undefined){
            
            let returnJSX= [], returnSmth = [], Token,Module, RequestID:any,andResult,jsonResponse;
        
            Module = json.Module;
            Token = json.Token;
            RequestID= json.Params.RequestID;
            setRequestId(RequestID);
            //console.log(RequestID)
            if ( Token === "MessageBox"){
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

            }else if(Token === "ChangeStatusProgress"){
                let Count,Stop,Title, Index;
                Count = json.Params.Count;
                Stop = json.Params.Stop;
                Title = json.Params.Title;
                Index = json.Params.Index;
                //props.setChildren(json);
                returnJSX.push(
                    <div style={{width:"13%"}}>
                        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}  >
                                <LinearProgress variant="determinate" value={IndexS} />
                        </Backdrop>
                    </div>

                )
                //setTestProgramButton(returnJSX);
                ChangeStatusProgress(RequestID);
                
            }else if(Token === "InputText"){
                console.log(json)
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

            }else if(Token === "ShowProgressDialog"){
                let Path, ProgID, Sections, Title, SectionsArray, Section:any, Steps = [];
                Path = json.Params.Path;
                ProgID = json.Params.ProgID;
                Sections = json.Params.Sections;
                Title = json.Params.Title;
                SectionsArray = Sections.split(",");
                //console.log(json)
                
                for (const [key, value] of Object.entries(SectionsArray)) {
                    let FixedSection:any;
                    FixedSection = value;
                    Section = value;

                    for (const [key, value] of Object.entries(Section)){
                        if(value ===  Section[Number(key)+1] && value === '"'){
                           FixedSection = setCharAt(FixedSection, Number(key), "");
                        }
                    }
                    if(FixedSection[0] === '"' && FixedSection[FixedSection.length -1]=== '"'){
                        FixedSection = setCharAt(FixedSection, 0, "");
                        FixedSection = setCharAt(FixedSection, FixedSection.length - 1, "");
                    }
                    returnSmth.push(FixedSection)
                }
                console.log(returnSmth)
                Steps.push(
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {returnSmth.map((step, index) => (
                            <Step key={step}>
                                <StepLabel>
                                    {step}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                )

                returnJSX.push(<ModalContainer content={Steps} />)
                setProgram(returnJSX);
                //EmptyRequest(RequestID);
            }else if(Token === "SetProgressLabel"){
                EmptyRequest(RequestID);
            }else if(Token === "SetProgressSection"){
                console.log(json)
            }

        }
        else{
            setProgram([<></>]);
        }
        
        
    }


    const handeleExecToolprogram =(event:any , type?:string)=>{///tools~ExecToolProgram
        let Path = event.currentTarget.getAttribute("id"),  params = new Map(), json, Type, Module, Token, Break;
        Path = event.currentTarget.getAttribute("id");
        params.set('prefix', 'tools');
        params.set("comand", "ExecToolProgram");
        params.set("Path", Path);
        params.set("Type", type);
        //params.set("Checked", "0") УЗНАТЬ КАК WSM ПОЛУЧАТЬ ////////////////////////////////////////////////////////
        params.set("WSM", "1");
        json = XMLrequest(params);
       // console.log(json)
        tokenProcessing(json);
        
    }
    
    const RenderButtons=(ButtonsLocal: any)=>{
        if(typeof ButtonsLocal !== undefined){
            let items = [], Path, Type:string;
            for (const [key, value] of Object.entries(ButtonsLocal)) {
                //console.log(value)
                Path = backValue(value, 'Path');
                Type = backValue(value, 'Type');
                items.push(
                            <IconButton id={Path}  color='primary'  component="span" onClick={(e: any) => handeleExecToolprogram(e,Type)} >
                     
                                {ImgURL(backValue(value, 'Image'))}
                             
                            </IconButton>
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