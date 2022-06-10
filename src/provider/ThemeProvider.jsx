import { createContext, useState } from "react";
import { get_cookie } from "../components/Url";

let LastDrx = get_cookie("LastLogin").split(",");
LastDrx = LastDrx === undefined? "": LastDrx[0]
console.log(LastDrx)
LastDrx = LastDrx === "МакетыЛК.drx"?  "light": "blue"

export const ThemeContext = createContext({type: "light"})

// ThemeContext.Provider

export const ThemeProvider =({children}) =>{
    
    const [theme, setTheme] = useState("light");

    return(
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    )
}