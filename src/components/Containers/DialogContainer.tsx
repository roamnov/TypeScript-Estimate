import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, DialogContentText,  } from '@mui/material';
import { DialogContainerProps } from '../ComponentInterface';



export default function DialogContainer (props:DialogContainerProps){
    const [open, setOpen] = React.useState(true);

    React.useEffect(()=>{
        setOpen(true);
      }, [props.contentText])

    const handleClose = () => {
        setOpen(false);
    };

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.contentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
        </DialogActions>
      </Dialog>
    )
}