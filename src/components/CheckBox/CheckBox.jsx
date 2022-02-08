import * as React from 'react';
import ReactDOM from 'react-dom';

export default function CheckBox(props) {
    function ClickCheckBox(e) {
        let lbl = e.currentTarget
        if (props.onClick)
            props.onClick()
    }
    let Check = <div class="cntr" style = {props.style ? props.style : ""}>
        <label for="cbx" class="label-cbx">
            <input id="cbx" type="checkbox" class="invisible" />
            <div class="checkbox">
                <svg width="20px" height="20px" viewBox="0 0 20 20">
                    <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                    <polyline points="4 11 8 15 16 6"></polyline>
                </svg>
            </div>
            <span>{props.label ? props.label : ""}</span>
        </label>
    </div>
    return Check;
}

