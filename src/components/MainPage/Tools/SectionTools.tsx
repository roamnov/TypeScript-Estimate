import  React from 'react';
import {  Grid, IconButton, Tooltip, } from "@material-ui/core"
import URL from '../../Url';
import axios from 'axios';
import { ImgURL } from "../../Url";


//
//https://mui.com/components/toggle-button/
//
const SectionTools = () =>{
    const [menuBar, setMenuBar] = React.useState([])
    const [buttons, setButtons] = React.useState([])
    const [imgf, setImgf] = React.useState();

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
            let items = [];
            for (const [key, value] of Object.entries(ButtonsLocal)) {
                items.push(
                    <label key={key}>
                        <Tooltip title={key}> 
                            <IconButton color='primary'  component="span">
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