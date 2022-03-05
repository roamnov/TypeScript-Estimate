import { Button, Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import React,{useEffect, useState} from "react";
import { XMLrequest } from "../Url";




export default function FormsMainFile(props:any){
    const [dataForms, setDataForms] = useState();
 

    useEffect(()=>{
        GetSectionForms();
    },[]);

    useEffect(()=>{
       // if(dataForms !== undefined){
        //     FormDataProcessing(dataForms)
        // }
    },[dataForms])

    const GetSectionForms=()=>{//GET /forms~GetSectionForm?LicGUID=8C5F5163443EBAC78D42B78939951952&SectionID=482 HTTP/1.0
        let params = new Map, json;
        params.set('prefix', 'forms');
        params.set("comand", "GetSectionForm");
        params.set("SectionID", props.id);/////
        json = XMLrequest(params);
        setDataForms(json);
        
    }

    function BackColor(color:any){
        let colorArr = color.split(":")
        if (color === undefined) return "rgb(240,240,240)"
        if(colorArr[1] === undefined){
            switch (color){
                case "Черный":
                    return "black"
                case "Бордовый":
                    return "rgb(124,10,2)"
                case "Зеленый":
                    return "green"
                case "Коричневый":
                    return "brown"
                case "Темно-синий":
                    return "darkblue"
                case "Пурпурный":
                    return "purple"
                case "Тёмно-зеленый":
                    return "darkgreen"
                case "Серый":
                    return "gray"
                case "Светло-серый":
                    return "lightgray"
                case "Красный":
                    return "red"
                case "Светло-зеленый":
                    return "lightgreen"
                case "Желтый":
                    return "yellow"
                case "Голубой":
                    return "rgb(0, 191, 255)"
                case "Фиолетовый":
                    return "rgb(138, 43, 226)"
                case "Светло-голубой":
                    return "aqua"
                case "Белый":
                    return "white"
                case "Подсказка":
                    return "rgb(245, 245, 220)"
                case "":
                    break 
            }
        }else{
            return `rgb(${colorArr[0]},${colorArr[1]},${colorArr[2]})`
        }

        
    }
    
    
    function CheckAndReturnComponent(json:any){
        let ReturnComponent =[],Enabled, Height, Left, Top,Name, Width,  RCDATA, Text
        Left = json.Left;
        Top = json.Top;
        switch(json.Type){
            case "TImage":
                RCDATA = json.RCDATA
                ReturnComponent.push(
                    <Grid  style={{ position:"absolute" ,left:`${Left}px`, top:`${Top}px`}}>
                         <img src={`data:image/png;base64,${RCDATA}`} />
                    </Grid>
                )
                break;
            case "TButton":
                
                // console.log(json)
                Text = json.Text
                Height = json.Height
                Width = json.Width
                ReturnComponent.push(
                    <Button variant="contained" style={{color: BackColor(json["Font-color"]),backgroundColor:BackColor(json["Back-color"]) ,position:"absolute", width: `${Width}px`,height:`${Height}px`,left:`${Left}px`, top:`${Top}px`, textTransform:"none"}}>{Text}</Button>
                )
                
                break;
            case "TSectionCheckBox":
                
                Height = json.Height
                Width = json.Width
                Text = json.Text
                ReturnComponent.push(
                    <Grid style={{ position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px`}}  >
                        <FormControlLabel style={{width:"max-content"}} control={<Checkbox defaultChecked />} label={Text} />
                    </Grid>
                )
                break;
            case "TSectionEditor":
                console.log(json)
                Height = json.Height
                Width = json.Width
                Text = json.Text
                ReturnComponent.push(
                    <Grid style={{position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px`  }}>
                        <TextField variant="standard"  defaultValue={Text}  />
                    </Grid>
                    
                )
                break;
            case "TSectionPanel1":
                Height = json.Height
                Width = json.Width
                ReturnComponent.push(
                    <Grid style={{position:"absolute" ,left:`${Left}px`, top:`${Top}px`, width: `${Width}px`,height:`${Height}px`  }}>
                        {FormDataProcessing(json)}
                    </Grid>
                )
                break;
            
        }
        return ReturnComponent;
    }

    function FormDataProcessing(json:any){
        if(dataForms !== undefined){
            console.log(json)
            let val:any, returnAll=[]
            json = json.Form;
            for(const [key, value] of Object.entries(json)) {
                val = value
                if(val.Type !==undefined ){
                    
                        returnAll.push( CheckAndReturnComponent(value)) 
                    
                    
                }
            } 
            return returnAll 
        }
        
    }


    return(
        <Grid id="mainForms" style={{position:"absolute"}}>
            {FormDataProcessing(dataForms)}
        </Grid>
    )
}