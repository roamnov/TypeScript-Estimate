import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { ModalProgressProps } from '../ComponentInterface';
import { Grid } from '@material-ui/core';
import { Box, Button, LinearProgress, Modal, Paper, PaperProps, Step, StepLabel, Stepper, styled } from '@mui/material';
import URL, {  XMLrequest } from '../Url';
import axios from 'axios';
import Draggable from 'react-draggable';
import ReactDOM from 'react-dom';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PaperComponent(props: PaperProps) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal(Path:any, bool:boolean) {
  const [open, setOpen] = React.useState(true);

  
  React.useEffect(()=>{
    setOpen(true);
  }, [Path])
 
  const handleClose = () => {
    setOpen(false);
  };

  async function handleCloseButton (){
    let params = new Map;
    params.set('prefix', 'programs');
    params.set("comand", "StopProcess");
    params.set("smart", "1");
    params.set("Path", Path.Path);
    console.log(Path.Path)
    await axios.get(URL(params));
    //XMLrequest(params);
    setOpen(false);
  }

  return (
    <React.Fragment>
    
      <Draggable>
        <Modal hideBackdrop open={open} >
          <Box sx={{ ...style, width: "20%" }}>
            <h2 id="child-modal-title">Подтверждение</h2>
            <p id="child-modal-description">
              Остановить процесс?
            </p>
            <Button onClick={handleCloseButton}>Да</Button>
            <Button onClick={handleClose}>Нет</Button>
          </Box>
        </Modal>
      </Draggable>
    </React.Fragment>
  );
}



export default function ModalProgress(props:ModalProgressProps) {
  const [open, setOpen] = React.useState(true);
  const [activeStep, setActiveStep] = React.useState(0);
  const [count, setCount] = React.useState<number>(0);
  const [data, setData] = React.useState({});
  const [Title,setTitle] = React.useState();
  const [AllSteps,setAllSteps] = React.useState<any>([]);
  const [path,setPath] = React.useState("");
  const [PrevToken,setPrevToken] = React.useState("");
  const [TextLoad,setTextLoad] = React.useState("");
  const [currentLoad, setCurrentLoad] = React.useState("Load");

  React.useEffect(()=>{
    tokenProcessing(data);
  }, [data])

  React.useEffect(()=>{
    tokenProcessing(props.Json);
    OpenDialog();
    setActiveStep(0);
    setCurrentLoad("Load");
    setTextLoad("");
  }, [props.Json])

  function setCharAt(str: string,index: number,chr: any) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}


  async function EmptyRequest(RequestID:string){
    let params = new Map, data;
    data = { "Result":"" }
    params.set('prefix', 'project');
    params.set("comand", "ResumeRequest");
    params.set("RequestID",RequestID );
    params.set("WSM", "1");
    await axios.post(URL(params), JSON.stringify(data)).then((res)=> setData(res.data));
    
  }

  const normalise = (value:any, MAX:any) => ((Number(value) - 0) * 100) / (Number(MAX) - 0);  

  async function tokenProcessing(json:any){
    if(json.Break !== undefined){
      let  returnSmth = [], Token, RequestID:any;
      Token = json.Token;
      RequestID= json.Params.RequestID;
      
      if(Token === "ShowProgressDialog"){
        let Path, Sections, Title, SectionsArray, Section:any;
        Path = json.Params.Path;
        Sections = json.Params.Sections;
        Title = json.Params.Title;
        
        if(Sections !== undefined){
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
        }
        
        setAllSteps(returnSmth);
        setTitle(Title);
        setPath(Path);
        setPrevToken(Token);
        EmptyRequest(RequestID);
        

      }else if (Token === "SetProgressSection"){
        let Index;
        Index = Number(json.Params.Index);
        if(isNaN(Index)) Index = 0;
        setActiveStep(Index);
        setPrevToken(Token);
        EmptyRequest(RequestID);

      }else if(Token === "StepProgress"){
        let Index,MAX;
        Index = json.Params.Index;
        if(isNaN(Index)) Index = 0;  
        MAX = json.Params.Count;
        setCount(normalise(Index,MAX));
        setPrevToken(Token);
        EmptyRequest(RequestID);

      }else if(Token === "SetProgressLabel"){
        let Text;
        Text = json.Params.Text;
        if (PrevToken === "StepProgress"){
          setCurrentLoad("Mix");
          setTextLoad(Text);
          
        }else if (PrevToken === "SetProgressSection" || PrevToken ==="SetProgressLabel"|| PrevToken === "ShowProgressDialog" ){
          setTextLoad(Text);
          setCurrentLoad("Text");
        }
        setPrevToken(Token);
        EmptyRequest(RequestID);

      }else if(Token === "HideProgressDialog"){
        setPrevToken(Token);
        
        
        setOpen(false);
      }
    }else{
      if(props.setData !== undefined){
        props.setData(json);
      }
    }
  }

  function RenderCancelModal(){
    ReactDOM.render(<ChildModal Path={props.path} openIt={open}/> , document.getElementById('RenderModalSub'));
  }

  function OpenDialog(){
    if (props.open){
      setOpen(true)
    }
  }

  async function Asd(){
    let params = new Map;
    
    params.set('prefix', 'programs');
    params.set("comand", "StopProcess");
    params.set("smart", "1");
    params.set("Path", props.path);
    await axios.get(URL(params)).then((res)=> setData(res.data));
    XMLrequest(params);
    
  }

  return (
    <div>
    
      <Dialog  maxWidth={'sm'} fullWidth style={{overflow:"hidden", height:"100%"}}  open={open}  TransitionComponent={Transition}  keepMounted PaperComponent={PaperComponent} >
        <DialogTitle>
           {Title} 
        </DialogTitle>
        <DialogContent style={{paddingLeft:"35px"}}>
          <Grid style={{display:"block"}} container direction="row" justifyContent="space-evenly" alignItems="center" spacing={2} >
            <Grid item id="Steps">
              <Stepper activeStep={activeStep} orientation="vertical" connector={<></>}>
                  {AllSteps.map((step:any) => (
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
        <DialogActions style={{height:"60px"}}>
          <Grid container direction="row" justifyContent="center" alignItems="center" >
           
              <Grid item style={{width:"65%"}}>
                <Grid style={{}}>
                  {currentLoad === "Text" || currentLoad ==="Mix"?TextLoad:<></>}
                </Grid>
                <Grid item style={{marginBottom: currentLoad ==="Mix"?"21px":"01px"}}>
                 {currentLoad === "Load" || currentLoad ==="Mix"?<LinearProgress variant="determinate" value={count} sx={{".MuiLinearProgress-bar": {transition: "none" }}} />: <></>} 
                </Grid>
                
              </Grid>
              <Grid item >
                <Button style={{textTransform:"none"}} onClick={RenderCancelModal}>Отмена</Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}
