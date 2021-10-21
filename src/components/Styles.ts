import {makeStyles, ThemeProvider} from "@material-ui/styles";

// import {theme} from "../theme/theme"

export const useStyles = makeStyles((theme: { mixins: { toolbar: any; }; })=>({
  

  drawer: {
    flexShrink: 0
  },
  //toolbar: theme.mixins.toolbar,
  dragger: {
    width: "5px",
    cursor: "ew-resize",
    padding: "4px 0 0",
    borderTop: "1px solid #ddd",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: "#f4f7f9"
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