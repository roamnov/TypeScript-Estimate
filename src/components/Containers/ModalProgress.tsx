import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { containerProps, ModalProgressProps } from '../ComponentInterface';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
//import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import ReportRoundedIcon from '@mui/icons-material/ReportRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import { Grid } from '@material-ui/core';
import { Box, Button, LinearProgress, Modal, NoSsr, Step, StepLabel, Stepper } from '@mui/material';
import URL, { AxiosRequest, XMLrequest } from '../Url';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const ChildModal =(Path:any)=> {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function handleCloseButton (){
    let params = new Map;
    console.log("Отмена")
    params.set('prefix', 'programs');
    params.set("comand", "StopProcess");
    params.set("smart", "1");
    params.set("Path", Path);
    XMLrequest(params);
    setOpen(false);
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <React.Fragment>
      <Button onClick={()=>handleOpen}>Отмена c модальным окном</Button>
      <Modal
        hideBackdrop
        open={open}
        //onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "40%" }}>
          <h2 id="child-modal-title">Подтверждение</h2>
          <p id="child-modal-description">
            Остановить процесс?
          </p>
          <Button onClick={handleCloseButton}>Да</Button>
          <Button onClick={handleClose}>Нет</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}



function ProgressAndSteps(Json:any){
  const [open, setOpen] = React.useState(true);
  const [activeStep, setActiveStep] = React.useState(0);
  const [count, setCount] = React.useState<number>(0);
  const [data, setData] = React.useState({});
  const [JSX, setJSX] = React.useState([<></>]);
  const [Title,setTitle] = React.useState();
  const [AllSteps,setAllSteps] = React.useState<any>([]);
  const [path,setPath] = React.useState("");
  const [PrevToken,setPrevToken] = React.useState("");


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

  async function EmptyRequest(RequestID:string){
    let params = new Map, data, json:object;
    data = { "Result":"" }
    params.set('prefix', 'project');
    params.set("comand", "ResumeRequest");
    params.set("RequestID",RequestID );
    params.set("WSM", "1");
    json = await  XMLrequest(params,  data);
    //await axios.post(URL(params), data).then((res)=> setData(res));
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
        setPath(Path);
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
      }else if(Token === "HideProgressDialog"){
        setOpen(false);
      }
    }
  }

  async function handleCloseButton (){
    let params = new Map;
    console.log("Отмена")
    params.set('prefix', 'programs');
    params.set("comand", "StopProcess");
    params.set("smart", "1");
    params.set("Path", path);
    XMLrequest(params);
    //await axios.get(URL(params)).then((res)=> setData(res));
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div >
      
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
        </Grid>
        </DialogContent>
        <DialogActions >
          <Grid container direction="row" justifyContent="center" alignItems="center">
              <Grid item style={{width:"70%"}}>
                <LinearProgress variant="determinate" value={count} />
              </Grid>          
          </Grid>
        </DialogActions>
    
    </div>
  );
}




export default function ModalProgress(props:ModalProgressProps) {
  const [open, setOpen] = React.useState(true);
  const [activeStep, setActiveStep] = React.useState(0);
  const [count, setCount] = React.useState<number>(0);
  const [data, setData] = React.useState({});
  const [JSX, setJSX] = React.useState([<></>]);
  const [Title,setTitle] = React.useState();
  const [AllSteps,setAllSteps] = React.useState<any>([]);
  const [path,setPath] = React.useState("");
  const [PrevToken,setPrevToken] = React.useState("");


  React.useEffect(()=>{
    tokenProcessing(data)
  }, [data])

  React.useEffect(()=>{
    tokenProcessing(props.Json)
  }, [props.Json])

  function setCharAt(str: string,index: number,chr: any) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

  async function EmptyRequest(RequestID:string){
    let params = new Map, data, json:object, test:any;
    data = { "Result":"" }
    params.set('prefix', 'project');
    params.set("comand", "ResumeRequest");
    params.set("RequestID",RequestID );
    params.set("WSM", "1");
    //json = await  XMLrequest(params,  data);
    await axios.post(URL(params), JSON.stringify(data)).then((res)=> setData(res));
    //test = AxiosRequest(params,  data);
    
    //setData(json);
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
        setPath(Path);
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
        EmptyRequest(RequestID);

      }else if(Token === "HideProgressDialog"){
        setOpen(false);
      }
    }
  }

  const handleCloseButton =()=>{
    let params = new Map;
    console.log("Отмена")
    params.set('prefix', 'programs');
    params.set("comand", "StopProcess");
    params.set("smart", "1");
    params.set("Path", path);
    XMLrequest(params);
    //await axios.get(URL(params)).then((res)=> setData(res));
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div >
      
      <Dialog
        maxWidth={'sm'}
        fullWidth
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
        </Grid>

        </DialogContent>
        <DialogActions >
          <Grid container direction="row" justifyContent="center" alignItems="center">

              <Grid item style={{width:"70%"}}>
                <LinearProgress variant="determinate" value={count} />
              </Grid>
              
                  {props.children}
          
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}
