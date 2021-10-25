import  React from 'react';
import { Button, ButtonGroup, Grid, Toolbar } from "@material-ui/core"
import palochka from '../../../static/images/palochka.png';
import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import DescriptionIcon from '@mui/icons-material/Description';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

const InfoPanel = () =>{
    return(
        <Grid style={{}} justifyContent="center">
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
        </Grid>
    )
}

export default InfoPanel;