@@ -0,0 +1,41 @@
import * as React from 'react';
import ReactDOM from 'react-dom';

export default function Switch(props) {
    function ClickCheckBox(e) {
        let lbl = e.currentTarget
        let stateCheck
        let span = lbl.querySelector(".css-5ryogn")
        if (span)
            if (span.classList.contains("checked")) {
                span.classList.remove("checked")
                stateCheck = 0
            }
            else {
                span.classList.add("checked")
                stateCheck = 1
            }

        if (props.onClick)
            props.onClick(props.idItem, stateCheck)
        return  stateCheck   
    }
    let Switch = <label for="notExistingId" className="css-j204z7-MuiFormControlLabel-root" onClick={(e) => ClickCheckBox(e)}>
        <span className="css-julti5-root" >
            <span className= { props.checked ? "css-5ryogn checked" : "css-5ryogn"}>
                <input className="MuiSwitch-input css-1m9pwf3" type="checkbox" />
                <span className="css-jsexje-Switch-thumb">
                </span>
                <span className="css-8je8zh-TouchRipple-root">
                </span>
            </span>
            <span className="Switch-track css-1yjjitx-Switch-track">
            </span>
        </span>
        <span className="css-ahj2mt-Typography-root">
            {props.label ? props.label : ""}
        </span>
    </label>
    return Switch;
}
