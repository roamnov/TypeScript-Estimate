import {makeStyles, ThemeProvider} from "@material-ui/styles";

// import {theme} from "../theme/theme"

export const useStyles = makeStyles((theme: { mixins: { toolbar: any; }; })=>({
  
  customizeToolbar: {
    minHeight: 36
  },

  colorList:{
    color:"white"
  },

  drawer: {
    flexShrink: 0,
    overflowX: "hidden"
  },
  //toolbar: theme.mixins.toolbar,
  dragger: {
    width: "5px",
    cursor: "col-resize",
    padding: "4px 0 0",
    borderTop: "1px solid #ddd",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: "#f4f7f9"
  },
  customDragger:{
    width: "5px",
    height: "100%",
    cursor: "col-resize",
    padding: "4px 0 0",
    borderTop: "1px solid #ddd",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: "red"
  },
  buttonDragger: {
    //width: "1px",
    cursor:"pointer",
   // height: "2.5%",
    padding: "0 0 0 0",
    position: "absolute",
    left: -5,
    top: "50%",
    right: 0,
    bottom: 0,
    zIndex: 101,
    overflowX: "hidden",
  },

    ButtonMargin:{
      
      //marginTop: theme.spacing(1),
      position: "sticky",
      
    },
    formControl: {
      //margin: theme.spacing(1),
     
      position: "sticky",
    },
    selectEmpty: {
      //marginTop: theme.spacing(2),
    },


}))
//