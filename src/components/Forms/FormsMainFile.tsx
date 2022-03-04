import { Button, Grid } from "@mui/material";
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
        switch (color){
            case "Черный":
                break;
            case "Бордовый":
                break;
            case "Зеленый":
                break;
            case "Коричневый":
                break;
            case "Темно-синий":
                break;
            case "Пурпурный":
                break
            case "Тёмно-зеленый":
                break
            case "Серый":
                break
            case "Светло-серый":
                break
            case "Красный":
                break
            case "Светло-зеленый":
                break
            case "Желтый":
                break
            case "Голубой":
                break
            case "Фиолетовый":
                break
            case "Светло-голубой":
                break
            case "Белый":
                break
            case "Подсказка":
                break
            case "":
                break    

            
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
                
                let BackColorArr, BGC
                Text = json.Text
                Height = json.Height
                Width = json.Width
                BackColorArr = json["Back-color"]
                BackColorArr = BackColorArr.split(":")

                ReturnComponent.push(
                    <Button variant="contained" style={{ position:"absolute", width: `${Width}px`,height:`${Height}px`,left:`${Left}px`, top:`${Top}px`}}>{Text}</Button>
                )
                console.log(BackColorArr)
                break;
            case "TSectionCheckBox":
                break;
            case "TSectionEditor":
                break;
        }
        return ReturnComponent;
    }

    function FormDataProcessing(json:any){
        if(dataForms !== undefined){
            
            let val:any, returnAll=[]
            json = json.Form;
            for(const [key, value] of Object.entries(json)) {
                val = value
                if(val.Type !==undefined){
                    returnAll.push(
                      CheckAndReturnComponent(value)  
                    ) 
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