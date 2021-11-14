import React from "react";

export interface componentProps{
    children?: React.ReactNode[] | React.ReactNode;
    mainTitle?: string;
    mainContent?: string;
    container?: true | false;
    dataSelectMenu?: string;
    posts?: any;

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
    userInfo?: any | string;
    workPlaceInfo?: any | string;
    password?: any | string;
    setBackInfo: (value:any) => void | any | undefined ;

}
export interface AlertLeftCorner extends componentProps{
    alert?: true | false | any;
}
export interface containerProps{
    children?: React.ReactNode[] | React.ReactNode;
}

export interface MainBoxBackId extends componentProps{
    backId?: any | string;
    setBackID: (value:any) => void | any | undefined ;
    setBackName: (value:any) => void | any | undefined ;
}

export interface IdToTree extends componentProps{
    ID:  any |string;
    Name:  any |string;
}


export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }