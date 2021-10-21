import React, {useEffect, useState} from "react";
import { Paper, Grid, MenuItem, FormControl, InputLabel} from "@mui/material";
import {useStyles} from "../Styles";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {menuSelect} from "../ComponentInterface";
import axios from 'axios'
import URL from "../Url";



const SelectWorkPlace= (props : menuSelect)=>{
    const styles = useStyles();
    const [workplace, setWorkPlace] = useState('');
    const [workplaces, setWorkPlaces] = useState([]);

    React.useEffect(() => {
        axios.get(URL('getworkplacelist',`ConfigName=${props.drxInfo}&UserName=${props.userInfo}`)).then((response) => {
            setWorkPlaces(response.data);
            });
        }, [props.userInfo]);

    function MenuItems(userList:any) {
        let array = [];
    
        for (const [key, value] of Object.entries(userList)) {
            array.push(`${value}`);  
        }
        return(
            array.map((nameUserList:React.ReactFragment, key ) => { 
            return(
            <MenuItem key={key} value={key}>{nameUserList}</MenuItem> );
            }
            ))
        }
    

    function BackValue(workplacesList:any,valuee: any){
        return workplacesList[`item${valuee}`]}

    const handleChange = (event: SelectChangeEvent) => {
        props.setBackInfo(BackValue(workplaces, event.target.value))
    };

    return(
        <Grid item xs> 
        <FormControl fullWidth className={styles.formControl}>
            <InputLabel>Рабочее место</InputLabel>
              <Select  value={props.workPlaceInfo} onChange={handleChange}  >
                {MenuItems(workplaces)}
              </Select>
          </FormControl>
      </Grid>
    )
}

export default SelectWorkPlace;