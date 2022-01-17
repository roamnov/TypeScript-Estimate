import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { containerProps } from '../ComponentInterface';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
//import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import ReportRoundedIcon from '@mui/icons-material/ReportRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import { Grid } from '@material-ui/core';
import { LinearProgress, Step, StepLabel, Stepper } from '@mui/material';
import { XMLrequest } from '../Url';
import ReactDOM from 'react-dom';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalProgress(Json:any) {
  const [open, setOpen] = React.useState(true);
  const [activeStep, setActiveStep] = React.useState(0);
  const [count, setCount] = React.useState<number>(0);
  const [data, setData] = React.useState({});
  const [JSX, setJSX] = React.useState([<></>]);
  const [Title,setTitle] = React.useState();
  const [AllSteps,setAllSteps] = React.useState<any>([]);
  const [path,setPath] = React.useState("");


  React.useEffect(()=>{
    tokenProcessing(data)
  }, [data])

  React.useEffect(()=>{
    console.log(Json.Json)
    tokenProcessing(Json.Json)
  }, [Json])

  function setCharAt(str: string,index: number,chr: any) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

  function EmptyRequest(RequestID:string){
    let params = new Map, data, json:object;
    data = { "Result":"" }
    params.set('prefix', 'project');
    params.set("comand", "ResumeRequest");
    params.set("RequestID",RequestID );
    params.set("WSM", "1");
    json = XMLrequest(params,  data);
    setData(json);
    //tokenProcessing(json);
  }

  const normalise = (value:any, MAX:any) => ((Number(value) - 0) * 100) / (Number(MAX) - 0);  

  function tokenProcessing(json:any){
    //console.log(json.Json)
    if(json.Break !== undefined){
      let returnJSX= [], returnSmth = [], Token,Module, RequestID:any,andResult,jsonResponse;
        
      //Module = json.Module;
      Token = json.Token;
      RequestID= json.Params.RequestID;
      if(Token === "ShowProgressDialog"){
        let Path, ProgID, Sections, Title, SectionsArray, Section:any, Steps = [];
        Path = json.Params.Path;
        ProgID = json.Params.ProgID;
        Sections = json.Params.Sections;
        Title = json.Params.Title;
        SectionsArray = Sections.split(",");
        
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
        setAllSteps(returnSmth);
        setTitle(Title);
        EmptyRequest(RequestID);

      }else if (Token === "SetProgressSection"){
        let Index;
        Index = Number(json.Params.Index);
        console.log(Index)
        if(isNaN(Index)) Index = 0;
        setActiveStep(Index);
        
        EmptyRequest(RequestID);

      }else if(Token === "StepProgress"){
        let Index,MAX;
        Index = json.Params.Index;
        if(isNaN(Index)) Index = 0;  
        MAX = json.Params.Count;
        setCount(normalise(Index,MAX));
        EmptyRequest(RequestID);

      }else if(Token === "SetProgressLabel"){
        let Text;
        Text = json.Params.Text;
        console.log(Text)
        EmptyRequest(RequestID);
      }
    }
  }

  function handleCloseButton(){
    let params = new Map;
    params.set('prefix', 'programs');
    params.set("comand", "StopProcess");
    params.set("WSM", "1");
    //json = XMLrequest(params);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{width:"700px"}}>
      
      <Dialog
        
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{Title} </DialogTitle>
        <DialogContent>
        <Grid container direction="row" justifyContent="space-evenly" alignItems="center" spacing={2} >
          <Grid item id="Steps">
            <Stepper activeStep={activeStep} orientation="vertical" connector={<></>}>
                {AllSteps.map((step:any, index: any) => (
                    <Step key={step}>
                        <StepLabel>
                            {step}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
          </Grid>
          <Grid item>
            <DialogContentText style={{marginTop:"2%"}}>
            
            </DialogContentText>
          </Grid>
        </Grid>
         
         
        
        </DialogContent>
        <DialogActions >
            <div style={{width:"100%", height:"40px"}}>
               <LinearProgress variant="determinate" value={count} />
            </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
