import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Dialog } from '@mui/material';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Button from '@mui/material/Button';
const _Dialog = (props) => {
  function Save (P) 
  {
    P.apply(false)
  }   
    function PaperComponent(prop) {
        return (
            <Draggable
                handle="#draggable-dialog-title"
                cancel={'[class*="MuiDialogContent-root"]'}>
                <Paper {...prop} />
            </Draggable>
        );
    }
    //var open
    return (
        <Dialog
            open={props.open}
            onClose={() => props.setOpen(false)}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title">
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                {props.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setOpen(false)}>Отмена</Button>
                <Button onClick={() => Save(props.setOpen)}>Сохранить</Button>

            </DialogActions>
        </Dialog>
    )
}
export default _Dialog;