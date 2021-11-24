import  React from 'react';
import { Button, ButtonGroup, Grid, Toolbar } from "@material-ui/core"
import palochka from '../../../static/images/palochka.png';
import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import DescriptionIcon from '@mui/icons-material/Description';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import URL from '../../Url';
import axios from 'axios';
import { ImgURL } from "../../Url";





const SectionTools = () =>{
    const [menuBar, setMenuBar] = React.useState([])
    const [buttons, setButtons] = React.useState([])

    React.useEffect(() => {
       GetSectionTools();
    }, [])

    const GetSectionTools = async () =>{
        let params = new Map();
        params.set('prefix','tools');
        params.set('comand','GetSectionTools');
        params.set('SectionID', '143');
        await axios.get(URL(params)).then((response) =>{
            setButtons(response.data["Buttons"]);
            setMenuBar(response.data["MenuBar"])
        })

    }
    
    const RenderButtons=(ButtonsLocal: any)=>{
        if(typeof ButtonsLocal !== undefined){
            let items = []
            
            console.log(ButtonsLocal.lenght)
            for (const [key, value] of Object.entries(ButtonsLocal)) {
                console.log(backValue(value, 'Image'));
                items.push(ImgURL(backValue(value, 'Image')))                
              }
              return items
        }
    }

    const backValue = (value:any, param:string)=>{
        return value[param]
    }
    

    return(
        <Grid style={{}} justifyContent="center">
            <button onClick={GetSectionTools}> НАЖМИ ДЛЯ ЗАПРОСА</button>
            {RenderButtons(buttons)}
        </Grid>
    )
}

export default SectionTools;


function imgUrl(): any {
    throw new Error('Function not implemented.');
}
/*
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