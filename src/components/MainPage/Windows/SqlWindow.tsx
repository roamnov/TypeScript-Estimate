import { Grid } from "@material-ui/core";
import { padding } from "@material-ui/system";
import CodeEditor from '@uiw/react-textarea-code-editor';

import React, { createElement, useCallback, useEffect, useState } from "react";


  

const SqlWindow =() =>{
    const [code, setCode] = React.useState(    ``  );
    return (
            
            <CodeEditor
                
                value={code}
                language="sql"
                placeholder="Please enter SQL code."
                onChange={(evn) => setCode(evn.target.value)}
                padding={5}
                
                style={{
                fontSize: 12,
                backgroundColor: "#f5f5f5",
                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                height: "100vh",
                }}
            />
    
    )
}

export default SqlWindow;