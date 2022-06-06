import { createContext, useState } from "react";

const ThemeContext = createContext({type:"blue"})

// ThemeContext.Provider

export const ThemeProvider =({children}) =>{
    const [theme, setTheme] = useState("blue");

    return(
        <ThemeContext.Provider value={""}>
            {children}
        </ThemeContext.Provider>
    )
}