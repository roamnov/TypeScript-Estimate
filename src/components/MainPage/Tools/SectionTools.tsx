import  React from 'react';
import {  Button, Grid, IconButton, Tooltip, } from "@mui/material"
import URL, { XMLrequest } from '../../Url';
import axios from 'axios';
import { ImgURL } from "../../Url";
import { ButtonForST } from './ComponentsForSectionToolsButtons';
import ModalContainer from '../../Containers/ModalContainer';
import items from "./Items.json"
import AlertMini from '../../AlertMini';



//
//https://mui.com/components/toggle-button/
//
const SectionTools = () =>{
    const [testProgramButton, setTestProgramButton] = React.useState([<></>]);
    const [menuBar, setMenuBar] = React.useState([]);
    const [buttons, setButtons] = React.useState([]);
    const [value, setValue] = React.useState();

    React.useEffect(() => {
       GetSectionTools();
    }, [])
    
    React.useEffect(() => {
        console.log("USEEFFECTG")
    }, [value])
  


    const GetSectionTools = async () =>{
        let params = new Map(), json;
        params.set('prefix','tools');
        params.set('comand','GetSectionTools');
        params.set('SectionID', '143');
        json = XMLrequest(params)
        setButtons(json["Buttons"]);
        setMenuBar(json["MenuBar"])
    }


    

    const  tokenProcessing= async (json: any )=>{
        let returnJSX= [], returnButton = [], Token,Module, Break , Message, DlgType, Buttons,
        RequestID,andResult,  pressedButton, params = new Map, data, jsonResponse, a = 0;
    
                
        
            Module = json.Module;
            Token = json.Token;
            Break = json.Break;
            RequestID= json.RequestID;
            if ( Token === "MessageBox"){
                console.log(json);
                console.log(items);
                Message = json.Params.Message;
                Buttons = json.Params.Buttons;
                DlgType = json.Params.DlgType;
                for (const [key, value] of Object.entries(items.Buttons)) {
                
                    andResult = value & Buttons;
                    
                    if (andResult!==0){
                        returnButton.push(<Button value={key} onClick={(e)=>{pressedButton = e.currentTarget.textContent}}>{key}</Button>)
                    }
                }
                    for (const [key, value] of Object.entries(items.DlgType)) {
                        if (value === DlgType){
                            DlgType = key;
                        }
                }

            returnJSX.push(  <ModalContainer dlgType={DlgType} text={Message} buttons={returnButton} /> )
            setTestProgramButton(returnJSX);
            data = {
                "Result":{
                    "Result": "6" 
                }
            }
            params.set('prefix', 'project');
            params.set("comand", "ResumeRequest");
            params.set("RequestID",RequestID );
            params.set("WSM", "1");
            json = XMLrequest(params, pressedButton);
            a += 1
            }
        
    }


    const handeleExecToolprogram =(event:any , type?:string)=>{///tools~ExecToolProgram
        let Path = event.currentTarget.getAttribute("id"),  params = new Map(), json, Type, Module, Token, Break;
        Path = event.currentTarget.getAttribute("id");
        Type = event.currentTarget.parentElement.id;
        params.set('prefix', 'tools');
        params.set("comand", "ExecToolProgram")
        params.set("Path", Path)
        params.set("Type", type)
        //params.set("Checked", "0")
        params.set("WSM", "1")
        json = XMLrequest(params);
        tokenProcessing(json)
    }
    
    const RenderButtons=(ButtonsLocal: any)=>{
        if(typeof ButtonsLocal !== undefined){
            let items = [], Path, Type:string;
            for (const [key, value] of Object.entries(ButtonsLocal)) {
                //console.log(value)
                Path = backValue(value, 'Path');
                Type = backValue(value, 'Type');
                items.push(
                    <label id={Type} key={key} >
                        <Tooltip title={key} id={Type} arrow > 
                            <IconButton id={Path}  color='primary'  component="span" onClick={(e: any) => handeleExecToolprogram(e,Type)} >
                                {ImgURL(backValue(value, 'Image'))}
                            </IconButton>
                        </Tooltip>
                    </label>
                    )
                }
              return items
            }
        }

    const backValue = (value:any, param:string)=>{
        return value[param]
    }
    

    return(
        <Grid style={{}} justifyContent="center">
           
            {RenderButtons(buttons)}
            {testProgramButton}
        </Grid>
    )
}

export default SectionTools;


/* <button onClick={GetSectionTools}> НАЖМИ ДЛЯ ЗАПРОСА</button>
React.useEffect(() => {
        console.log(buttons)
        console.log(menuBar)
    }, [menuBar])

React.useEffect(() => {
        let params = new Map();
        params.set('prefix','tools');
        params.set('comand','GetSectionTools');
        params.set('SectionID', '143');
        axios.get(URL(params)).then((response) =>{
            setButtons(response.data["Buttons"]);
            setMenuBar(response.data["MenuBar"])
      
        })
    }, [])


<Toolbar />
          <ButtonGroup size="small" variant="text" aria-label="text button group">
            <Button >Настройки</Button>
            <Button>Сервис</Button>
            <Button>Справочники</Button>
        </ButtonGroup>
        <img src={palochka} />
        <HomeIcon  />
        <FolderIcon />
        <TouchAppIcon/>
        <DescriptionIcon />
        <RequestPageIcon />
        <SaveAltIcon/>
*/