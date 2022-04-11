import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React,{useState,useEffect} from "react";
import { DialogContainerProps } from "../ComponentInterface";



export default function SignInDialog(props:DialogContainerProps){
    const [open, setOpen] = useState(true);

    useEffect(()=>{
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
