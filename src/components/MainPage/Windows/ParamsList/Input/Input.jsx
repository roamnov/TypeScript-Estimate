import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import ruLocale from 'date-fns/locale/ru';
import "./Input.css";
import _Dialog from '../Dialog/Dialog.jsx';
import PickList from "../PickList/PickList";


const EditStyle_PickList = 1;
const EditStyle_Calendar = 2;
const EditStyle_Check = 4;
const EditStyle_UpDown = 8;
const EditStyle_Ellipsis = 16;
const EditStyle_CheckList = 32;
const EditStyle_ReadOnly = 64;
const EditStyle_EditList = 128;
const EditStyle_ColorBox = 256;
const EditStyle_AutoList = 512;
const EditStyle_Password = 1024;



const _Input = (props) => {
    const [openlist, setOpenList] = useState(false);
    const [value, setValue] = useState(props.text);
    const [open, setOpen] = useState(false);
    var arraybuttons = [];
    var inp;
    var btn;
/*useEffect(()=> {
    setOpenList(false)
}, [openlist])*/

    if ((props.Style & EditStyle_Calendar) !== 0) {
        inp = <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
            <DatePicker
                label={props.head}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params}
                    sx={{ width: '100%' }}
                    inputProps={{ ...params.inputProps, style: { 'padding-top': '6px', 'padding-bottom': '0px' } }}
                    size="small"
                    margin="dense"
                    InputLabelProps={{
                        shrink: true
                    }}
                />}
            />
        </LocalizationProvider>
        /*<TextField
        id="date"
        label={props.head}
        type="date"
        defaultValue={props.text}
        inputProps={{style: {'padding-top': '6px', 'padding-bottom': '0px', 'content': '\f073'}}} 
            size="small"
            margin="dense"  
        InputLabelProps={{
            shrink: true,
        }}/>*/
    }
    else {
        inp = <TextField label={props.head}
            id="outlined-size-small"
            value={value}
            size="small"
            margin="dense"
            sx={{ width: '100%' }}
            inputProps={{ style: { 'padding-top': '6px', 'padding-bottom': '0px' } }}
            InputLabelProps={{ shrink: true }} />
    }
    if ((props.Style & EditStyle_Ellipsis) !== 0) {

        btn =
            <div>
                <IconButton aria-label="Ellipsis" size="small" sx={{ width: 24, padding: 0 }} onClick={() => setOpen(true)}>
                    <MoreHorizRoundedIcon color="primary" />
                </IconButton>
                <_Dialog open={open} title={props.head} DataType={props.DataType} setOpen={() => setOpen(false)} onSelect={setValue}></_Dialog>
            </div>
        arraybuttons.push(btn);
    }
    if ((props.Style & EditStyle_PickList) !== 0) {
        btn =
            <div>
                <IconButton aria-label="PickList" size="small" onClick={() => setOpenList(!openlist)}>
                    <KeyboardArrowDownRoundedIcon color="primary" />
                </IconButton>
            </div>
        arraybuttons.push(btn);
    }
    return (
        <div style={{ display: 'inline-block', position: 'relative', width: '100%' }}>
            {inp}
            <div style={{ position: 'absolute', top: '25%', right: '2px', display: 'flex', 'align-items': 'center', background: 'white' }}>
                {arraybuttons.map((Itembtn) => { return Itembtn })}
            </div>
            <div style={{ position: "absolute" }}>
                <PickList values={props.values} setOpen={setOpenList} setValue={setValue} open={openlist} />
            </div>

        </div>
    )


}

export default _Input;
