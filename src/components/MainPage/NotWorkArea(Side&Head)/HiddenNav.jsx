import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import ReactDOM from 'react-dom';
import IconButton from '@mui/material/IconButton';

function ClickMiniButton(e) {
    let b = e.currentTarget;
    let Nav = document.getElementById("HiddenNav")
    if (b.id) {
        let id = b.id.replace(/\D/g, '')
        let state = Nav.state.get(id);
        if(state)
        {
           Nav.f1(state) 
        }
    }
}

function HiddenNavButton() {
    let Nav = document.getElementById("HiddenNav")
    let button
    let buttons = [];
    if (Nav) {
        let state = Nav.state;
        if (state)
            for (let pair of state) {
                button = pair;
                buttons.push(<Tooltip title={button[1].title} >
                    <IconButton aria-label="CancelEdit" size="small" id={"MiniButton" + button[1].id} onClick={(e) => ClickMiniButton(e)}>
                        <img style={{ height: "16px", width: "16px" }} src={button[1].img} />
                    </IconButton>
                </Tooltip>)
            }
    }
    return <>{buttons.map((b) => b)}</>
}
function SetStateNav(state, f1) {
    let Nav = document.getElementById("HiddenNav");
    if (Nav) {
        Nav.f1 = f1;

    }
    let Navstate = Nav.state;
    let st
    if (Navstate) {
        st = Navstate.get(state.id)
        if (!st) {
            Navstate.set(state.id, state)
        }
    }
    else {
        Navstate = new Map
        Navstate.set(state.id, state);
        Nav.state = Navstate;
    }
}
export { HiddenNavButton }
export { SetStateNav }