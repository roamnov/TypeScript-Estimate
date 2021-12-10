import React from 'react';
import './TableParams.css';

import TextField from '@mui/material/TextField';
import _Input from "./../Input/Input.jsx"


function Selectinput(EditStyle, value, Head, values, DataType) {
    return (<_Input text={value} Style={EditStyle} head={Head} values={values} DataType = {DataType}/>)

}
const TableParams = (props) => {
var data = props.data;
    function CreateRow(pTD) {
        var td = pTD//.split(",");
        return (
            Selectinput(td[2], td[7], td[0], td[8])
        );
    }

    function CreateTBody() {
        let Params = [];
        let it = [];

        for (let i = 0; i < data[0]["Params"]["Items"].length; i++) {
            it = []//.splice(0, it.length);
            it.push(data[0]["Params"]["Items"][i]["Name"],
                data[0]["Params"]["Items"][i]["ShortName"],
                data[0]["Params"]["Items"][i]["EditStyle"],
                data[0]["Params"]["Items"][i]["CLSID"],
                data[0]["Params"]["Items"][i]["DataType"],
                data[0]["Params"]["Items"][i]["MultiCheckSet"],
                data[0]["Params"]["Items"][i]["Module"],
                data[0]["Params"]["Items"][i]["Value"],
                data[0]["Params"]["Items"][i]["Values"],
                data[0]["Params"]["Items"][i]["DataType"])
            Params.push(it)
        }
        return Params.map((itemsParam) => {
            return CreateRow(itemsParam)
        })
    }


    return <div style={{ width: '200px', top: '50px' }} >
        {CreateTBody()}
        <div id='DocParams'>

        </div>
    </div>

}
export default TableParams;