import React from "react";

export interface componentProps{
    children?: React.ReactNode[] | React.ReactNode;
    mainTitle?: string;
    mainContent?: string;
    container?: true | false;
    dataSelectMenu?: string;
    posts?: any;
    isLoading?: any;

    //--ГРИДЫ
    justify?: "space-around" | "space-between" | "space-evenly" | "center" | "flex-end" | "flex-start" | undefined;
    xs?: 'auto'|true|1|2|3|4|5|6|7|8|9|10|11|12;
    sm?: 'auto'|true|1|2|3|4|5|6|7|8|9|10|11|12;
    md?: 'auto'|true|1|2|3|4|5|6|7|8|9|10|11|12;
    lg?: 'auto'|true|1|2|3|4|5|6|7|8|9|10|11|12;
    xl?: 'auto'|true|1|2|3|4|5|6|7|8|9|10|11|12;
    spacing?:any;
    alignItems?:  "baseline" | "stretch" | "center" | "flex-end" | "flex-start" | undefined;
    partPrimary?:'auto'|true|1|2|3|4|5|6|7|8|9|10|11|12;
    partSecondary?:'auto'|true|1|2|3|4|5|6|7|8|9|10|11|12;
    component_index?: string;
}

export interface overlayProps extends componentProps{
    color?: string;
}

export interface inputProps{
    value: any|string;
    setValue: (value:any) => void | any;
    rows?: 1|2|3|4|5|6|7|8|9|10|11|12;
}
export interface menuSelect extends componentProps{
    drxInfo?: any|string;
    userInfo: any | string;
    workPlaceInfo?: any | string;
    password: any | string;
    setBackInfo: (value:any) => void | any | undefined ;

}
export interface AlertLeftCorner extends componentProps{
    alert?: true | false | any;
}
export interface containerProps{
    children?: React.ReactNode[] | React.ReactNode;
}

export interface MainBoxBackClick extends componentProps{
    backId?: any | string;
   
    setSelected: (value:any) => void | any | undefined;
}

export interface IdToTree extends componentProps{
    ID:  any |string;
    CLSID:  any |string;
}


export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  export interface InfoAboutClick extends componentProps{
    id: string | undefined;
    clsic?: string | undefined;
    name: string | undefined;
  }

  export interface InfoAboutClickDown extends componentProps{
    infoClick:{ 
        id: string | undefined;
        clsic?: string | undefined;
        name: string | undefined;
    }
    
   
  }

  export interface DocsAndReports extends componentProps{
    id: string | undefined;
    clsic?: string | undefined;
    name?: string | undefined;
  }

  export interface containerProps extends componentProps{
    children?: React.ReactNode[] | React.ReactNode;
    content?: string | JSX.Element[] | Element;
    buttons?: any | JSX.Element[] | Element;
    open?:boolean;
    needToClose?:boolean;
    dlgType?: string;
}

export interface FooterProps{
    children?: React.ReactNode[] | React.ReactNode;
    value?: number;
    open?:boolean;
    ID?:string;
}

export interface SectionToolsProps{
    SectionID?: string;
}

export interface ModalProgressProps{
    Json: object;
    children?: React.ReactNode[] | React.ReactNode;
    open:Boolean;
}

export interface ProjectEnterInfo extends componentProps{
    Json?: object;
    setData: (value:any) => void | any;
    open?:Boolean;
}

export interface DialogContainerProps{
    title:string,
    contentText:any,

}

export interface Test {
    tools: object,
    id: string
}