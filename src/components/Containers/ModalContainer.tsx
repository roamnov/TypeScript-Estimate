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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalContainer(props: containerProps) {
  const [open, setOpen] = React.useState(true);

  const title= ()=>{
      switch(props.dlgType){
        case "Предупреждение":
          return <ReportRoundedIcon fontSize='large'/>
        case "Ошибка":
          return <ErrorRoundedIcon  fontSize='large'/>
        case "Информация":
          return <InfoRoundedIcon  fontSize='large'/>
        case "Вопрос":
          return //<QuestionMarkRoundedIcon  fontSize='large'/>
      }
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      
      <Dialog
    
        open={props.open === undefined? open:props.open }
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{props.dlgType}</DialogTitle>
        <DialogContent>
        <Grid container direction="row" justifyContent="space-evenly" alignItems="center" spacing={2} >
          <Grid item>
              {title()}
          </Grid>
          <Grid item>
            <DialogContentText style={{marginTop:"2%"}}>
            {props.content}
            </DialogContentText>
          </Grid>
        </Grid>
         
         
        
        </DialogContent>
        <DialogActions >
          <div id="DialogActionTest">
            {props.buttons}
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
