import  React from 'react';
import {  Grid, IconButton, Tooltip, } from "@mui/material"
import URL, { XMLrequest } from '../../Url';
import axios from 'axios';
import { ImgURL } from "../../Url";


//
//https://mui.com/components/toggle-button/
//
const SectionTools = () =>{
    const [testProgramButton, setestProgramButton] = React.useState();
    const [menuBar, setMenuBar] = React.useState([]);
    const [buttons, setButtons] = React.useState([]);
    const [imgf, setImgf] = React.useState();

    React.useEffect(() => {
       GetSectionTools();
      
    }, [])
    
  


    const GetSectionTools = async () =>{
        let params = new Map(), json;
        params.set('prefix','tools');
        params.set('comand','GetSectionTools');
        params.set('SectionID', '143');
        json = XMLrequest(params)
        setButtons(json["Buttons"]);
        setMenuBar(json["MenuBar"])
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
        Module = json.Module;
        Token = json.Token;
        Break = json.Break
        console.log(json);
        
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