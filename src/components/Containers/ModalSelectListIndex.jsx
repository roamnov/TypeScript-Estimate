import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import { XMLrequest } from '../Url';
import ReactDOM from 'react-dom';
import { styled } from '@mui/material/styles';
import * as mime from 'react-native-mime-types';
import { download } from '../MainPage/Tools/Tools';

const StyledList = styled(List)({
  // selected and (selected + hover) states
  '&& .Mui-selected, && .Mui-selected:hover': {
    backgroundColor: "#3d5b75"
  },
  // hover states
  // '& .MuiListItemButton-root:hover': {
  //   backgroundColor: 'orange',
  //   '&, & .MuiListItemIcon-root': {
  //     color: 'yellow',
  //   },
  // },
});


export default function ModalSelectListIndex (props){
    const [open, setOpen] = React.useState(true);
    const [data, setData] = React.useState({});
    const [JSX, setJSX] = React.useState([<></>])
    const [selected,setSelected] = React.useState("0")
    const [ItemsForSelected, setItemsForSelected] = React.useState([])


    React.useEffect(()=>{
      tokenProcessing(data);
    }, [data])

    React.useEffect(()=>{
        tokenProcessing(props.Json);
        setOpen(true);
        
      }, [props.Json])

    const handleClose = () => {
        setOpen(false);
    };

    async function tokenProcessing(json){
      console.log(json)
      if(json.Break !== undefined){
        
        let  returnSmth = [<></>], Token, RequestID;
        Token = json.Token;
        RequestID= json.Params.RequestID;
        
        switch (Token){
          case "SelectListIndex":
            let Items
            
            Items = json.Params.Items
            Items = Items.split(",")
            Items.forEach(function(item, index, array) {
              
              returnSmth.push(
                <>
                 <ListItemButton onClick={UpdateSelected} id={index.toString()} selected={index.toString() === selected}>
                    <ListItemText primary={item} />
                 </ListItemButton>
                </>
              )
            });
              
            setItemsForSelected(Items);
            setJSX(returnSmth);
            break;
          case "ShellExecute":
            let RCDATA =""
            let FileNameShell = json.Params.FileName;
            FileNameShell = FileNameShell.split("\\")
            RCDATA = json.RCDATA
            let mimeType = mime.lookup(FileNameShell.slice(-1)[0]) 
            RCDATA = "data:"+ mimeType+";base64,"+ RCDATA
            download(RCDATA, FileNameShell.slice(-1)[0],mimeType )  
            //triggerBase64Download(RCDATA, FileNameShell.slice(-1)[0])

            let params = new Map;
            let data = {  }
            params.set('prefix', 'project');
            params.set("comand", "ResumeRequest");
            params.set("RequestID",RequestID );
            params.set("WSM", "1");
            json = XMLrequest(params,  data);
            setOpen(false);
                              
            break;
        }
        
      }
    }

    function CloseWindow(json){
      let params = new Map, data, ReqID;
      ReqID = json.Params.RequestID;
      data = { "Result":"0" }
      params.set('prefix', 'project');
      params.set("comand", "ResumeRequest");
      params.set("RequestID",ReqID );
      params.set("WSM", "1");
      XMLrequest(params,  data);
      setOpen(false);
    }
  

    function Confirm(event , jsonProp){
      let params = new Map, data, json, ReqID, ID;
      ReqID = jsonProp.Params.RequestID;
      ID =event.currentTarget.getAttribute("id")
      data = { "Result":"1" , "Index":ID}
      params.set('prefix', 'project');
      params.set("comand", "ResumeRequest");
      params.set("RequestID",ReqID );
      params.set("WSM", "1");
      json = XMLrequest(params,  data);
      tokenProcessing(json);
    }

    function ReturnJSX(ID , json){
      let returnSmth =[<></>], Items =json.Params.Items
      Items = Items.split(",")
      Items.forEach(function(item, index, array) {
              
        returnSmth.push(
          <>
           <ListItemButton onClick={UpdateSelected} id={index.toString()} selected={ID === index.toString()}>
              <ListItemText primary={item} />
           </ListItemButton>
          </>
        )
      });
      return returnSmth
    }

    function UpdateSelected (event){
      
      let ID =event.currentTarget.getAttribute("id")
      ReactDOM.render(<>
              <Grid item >
                <List dense={true}>
                    {ReturnJSX(ID,props.Json)}
                </List>
              </Grid>
              <Grid item >
                <Button id ={ID} onClick={(e)=>Confirm(e,props.Json)}>
                  Выбрать
                </Button>
                <Button onClick={()=>CloseWindow(props.Json)}>
                  Отмена
                </Button>
              </Grid>
      </>, document.getElementById('FormConfirmAndClose'));
    }


    return(
        <Dialog
            open={open}
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
          Выбирите элемент из списка.
        </DialogTitle>
        <DialogContent>
            <Grid container   style={{"flex-flow": "inherit"}}  justifyContent="center"   id={"FormConfirmAndClose"}>
              <Grid item >
                  <List dense={true}>
                      {JSX}
                  </List>
              </Grid>
              <Grid item >
              <Button id="0" onClick={(e)=>Confirm(e,props.Json)}>
                  Выбрать
                </Button>
                <Button onClick={()=>CloseWindow(props.Json)}>
                  Отмена
                </Button>
              </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          
        </DialogActions>
      </Dialog>
    )
}

