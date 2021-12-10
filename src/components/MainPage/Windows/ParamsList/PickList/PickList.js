import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import onClickOutside from "react-onclickoutside";
const PickList = (values) => {
    //const toggle = () => setOpenList(!openlist);
    function SelectItem(P, set, text) {
        set.apply(text)
        P.apply(false)

    }
    var val = [];
    var i;
    if (values.values !== undefined) {
        for (var k in values.values) {
            i = values.values[k];
            if (typeof i === 'object') {
                val.push(String(i.text))
            }
            else {
                val.push(String(i))
            }

        }
    }
    return (
        val.length && values.open ?
            <List style={{ 'background-color': 'white', 'z-index': '111' }} dense={true}>
                {val.map((text) => {
                    return (
                        <ListItem component="div" disablePadding onClick={() => {values.setValue(text); values.setOpen(false)}}>
                            <ListItemButton >
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List> : null
    );
}
export default PickList