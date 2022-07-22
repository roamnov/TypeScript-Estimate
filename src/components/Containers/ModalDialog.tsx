import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { containerProps } from '../ComponentInterface';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
//import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import ReportRoundedIcon from '@mui/icons-material/ReportRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import { Grid } from '@material-ui/core';
import { red } from '@mui/material/colors';
import { Button } from '@mui/material';
import Editor from '../Editor/Editor';
import { XMLrequest } from '../Url';
import { Box, IconButton } from "@mui/material";


const Transition = React.forwardRef(function Transition(
  
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function ModalDialog(props: any) {
    const [open, setOpen] = React.useState(true);
    const [data, SetData] = React.useState('')
    React.useEffect(()=>{
      if(!open){
        setOpen(true)
      }
    },[props])
  
    const title= ()=>{
        switch(props.dlgType){
          case "Предупреждение":
            return <ReportRoundedIcon fontSize='large'/>
          case "Ошибка":
            return <ErrorRoundedIcon  fontSize='large' sx={{ color: red[500] }}/>
          case "Информация":
            return <InfoRoundedIcon  fontSize='large'/>
          case "Вопрос":
            return //<QuestionMarkRoundedIcon  fontSize='large'/>
        }
    }
  
    const DefaultButtonOk = ()=>{
      return(
        <Button style={{textTransform: "none"}} onClick={handleClose} variant="outlined">
          Ок
        </Button>
      )
    }
  
    const handleClose = () => {
      setOpen(false);
    };
  

    function onDropDownList(el:any) {
      let res = new Map();
      let params = new Map();
      params.set('prefix', 'programs');
      params.set('comand', 'GetParamValues');
      params.set('ID', el.dataId);
      params.set('Path', props.props.Path);
      let otv = XMLrequest(params).Items
      for (let i = 0; i <= otv.length - 1; i = i + 1) {
          let item = otv[i];
          if (item.id) {
              res.set(otv[i].id, otv[i].text)
          }
          else
              res.set(i, otv[i])
      }
      return res
    }
    
    function onEdit(ev:any, TextChanged:any) {
      let el
      if (ev.type == "change") {
          el = ev.currentTarget
      }
      else {
          el = ev;
          TextChanged = 0
      }
      if (el) {
          let val
          val = el.dataset.value;
          let params = new Map();
          params.set('prefix', 'programs');
          params.set('comand', 'SetParamProperty');
          params.set('ID', el.dataId);
          params.set('Path', el.dataPath);
          if (TextChanged)
              params.set('TextChanged', "1")
          else
              params.set('TextChanged', "0")
          params.set('WSM', "1");
          params.set('Value', val);
          if (el.dataset.checkstate)
              params.set('CheckState', el.dataset.checkstate)
          if (el.dataset.objref)
              params.set('ObjRef', el.dataset.objref);
          let otv = XMLrequest(params);
          if (otv) {
              el.value = otv.Values[0].Value;
              el.setAttribute("data-objref", otv.Values[0].ObjRef)
              el.setAttribute("data-id", otv.Values[0].ID)
              el.setAttribute("data-editval", otv.Values[0].EditVal)
              if(otv.NeedRefresh)
             { let params = new Map();
              params.set('prefix', 'programs');
              params.set("comand", "GetParamDialog");
              params.set("GroupID", "0");///// ПРОВЕРИТЬ
              params.set("Path", el.dataPath);
              params.set("NeedRefresh", "1");
              let data = XMLrequest(params);
              SetData(data.Items)}

          }

      }
  }

    return (
      <div>
        
        <Dialog
      
          open={props.open === undefined? open:props.open }
          TransitionComponent={Transition}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{props.props.Caption}</DialogTitle>
            <DialogContent>
              
            {props.props.Items.map((item:any) => {
             var display =  "flex"
             return <Grid container rowSpacing={0} columnSpacing={{ sm: 0, }}>
                     <Grid sm={6}>{item.Name}</Grid>
                     <Grid sm={6}>
                        <Editor value={item.Value ? item.Value : ""}
                            EditStyle={item.EditStyle} style={{ height: "24px" }}
                            mask={item.EditMask}
                            id={item.ID}
                            CLSID={item.CLSID}
                            Path={props.props.Path}
                            ObjRef={item.ObjRef}
                            EditVal={item.EditVal}
                            SectionID={props.SectionID}
                            //setdata={SetData}
                            onDropDownList={onDropDownList}
                            //onEdit={onEdit}
                            ReportID={props.id}
                            CheckState={item.CheckState}
                            MultiCheckSet={item.MultiCheckSet}
                            Type="ParamItem"
                        />
                    </Grid>
                  </Grid>
                })}
           
            </DialogContent>
          <DialogActions >
            <div id="DialogActionTest">
              {props.buttons?props.buttons:<DefaultButtonOk/>}
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }