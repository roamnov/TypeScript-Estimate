import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import  DialogContentText from '@mui/material/DialogContentText';
import { useEffect, useState } from 'react';
import SelectDrxModal from './SelectDrxModal';
import Grid from '@mui/material/Grid';
import SelectWorkPlaceModal from './SelectWorkPlaceModal';
import Button from '@mui/material/Button';
import { TransitionProps } from '@mui/material/transitions/transition';
import React from 'react';
import Slide from '@mui/material/Slide';
import { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Paper from "@mui/material/Paper"
import  Typography  from '@mui/material/Typography';
import { isEmptyObject } from '../../MainPage/Tools/Tools';
import { CreateCokies, XMLrequest } from '../../Url';
import DialogContainer from '../../Containers/DialogContainer';
import ReactDOM from 'react-dom';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  function PaperComponent(props: PaperProps) {
    return (
      <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  }

export default function ModalSignIn(props:any){
    
    const [open, setOpen] = useState(true);
    const [data, setData] = useState<any>(props.data);
    const [drx, setDrx] = useState();
    const [workplace, setWorkPlace] = useState();
    const [error, setError] = useState<string | null>("");

    function CheckAnswerFromServer(answer?: Object) {
      let errorInside: string;
      let element = document.getElementById('renderSignIn')
      setOpen(false)
      switch (answer) {
        case "ConfigName":
          ReactDOM.render(<DialogContainer title={"Ошибка"} contentText={`Файл подключения ${drx} не найден.`}/>,element );
          break;
        case "UserName":
          ReactDOM.render(<DialogContainer title={"Ошибка"} contentText={`Пользователь в системе не зарегистрирован.`}/>,element );
          break;
        case "Password":
          ReactDOM.render(<DialogContainer title={"Ошибка"} contentText={`Пароль неверный.`}/>,element );
          break;
      }

    }

    const Navigate =(jsonEnter: any)=>{
      props.setSecret(jsonEnter);
      setOpen(false);
    }

    function handleEnter(){
      let params = new Map;
      let json,postData;
      params.set("comand", "enter")
      postData={
        ConfigName:drx,
        Workplace:workplace,
        Username:props.secret,
        Password:props.keyFromSelect
      }
      json = XMLrequest(params,postData )
      json["error"]!== undefined? CheckAnswerFromServer(json["error"]["Item"]):Navigate(json) 
    }

    function isEmptyReturn(){
      if(isEmptyObject(props.data["Pkcs7Auth-Result"])){
        return(<>
          <DialogTitle id="alert-dialog-title">
                  Параметры подключения
              </DialogTitle>
              <DialogContent style={{paddingTop:"10px"}}>
                  <Grid  container  direction="column" justifyContent="space-around"    alignItems="stretch" spacing={3} sx={{pt:0}}>  
                    <Grid item>
                      <Typography variant='body1'> 
                        У вас нет назначенных конфигураций.
                      </Typography> 
                    </Grid>
                  </Grid>
              </DialogContent>
              <DialogActions>
                  <Button size="small" variant="outlined" style={{textTransform:"none"}} onClick={handleClose} >Отмена</Button>
              </DialogActions>
            </>
        )
      }else{
        return(<>
          <DialogTitle id="alert-dialog-title">
                  Параметры подключения
              </DialogTitle>
              <DialogContent style={{paddingTop:"10px"}}>
                  <Grid  container  direction="column" justifyContent="space-around"    alignItems="stretch" spacing={3} sx={{pt:0}}>  
                      <SelectDrxModal json={props.data["Pkcs7Auth-Result"].Result} setBackInfo={setDrx}/>
                      <SelectWorkPlaceModal json={props.data["Pkcs7Auth-Result"].Result} drx={drx} setBackInfo={setWorkPlace} /> 
                  </Grid>
              </DialogContent>
              <DialogActions>
                  <Button size="small" variant="outlined" style={{textTransform:"none"}} onClick={handleClose} >Отмена</Button>
                  <Button size="small" variant="outlined" style={{textTransform:"none"}} onClick={handleEnter}>Войти</Button>
              </DialogActions>
            </>
        )
      }
      
    }


    useEffect(()=>{
        setOpen(true);
      }, [props.data])

    const handleClose = () => {
        setOpen(false);
    };
    if(Object.keys(props.data)[0] !== "Pkcs7Auth-Result"){
      return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="xs"
            TransitionComponent={Transition}
            PaperComponent={PaperComponent}
        >
            <DialogTitle id="alert-dialog-title">
                Ошибка
            </DialogTitle>
            <DialogContent style={{paddingTop:"10px"}}>
                <Grid  container  direction="column" justifyContent="space-around"    alignItems="stretch" spacing={3} sx={{pt:0}}>
                  <Grid item>
                    <Typography variant='body1'> 
                      {props.data["Pkcs7Auth-Error"].Error}
                    </Typography> 
                  </Grid> 
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button size="small" variant="outlined" style={{textTransform:"none"}} onClick={handleClose} >Отмена</Button>
            </DialogActions>
      </Dialog>
      )
    }else{
      return(
          <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth
              maxWidth="xs"
              TransitionComponent={Transition}
              PaperComponent={PaperComponent}
          >
              {isEmptyReturn()}
        </Dialog>
      )
  }
}