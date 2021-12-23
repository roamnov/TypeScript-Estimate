export function delayCall(f) {
    setTimeout(() => {f();}, 10);
}

export function minint(x, y) {
    if (x < y) return x 
    else return y
}

export function maxint(x, y) {
    if (x > y) return x
    else return y
}

export function midint(min, max, val) {
    return maxint(min, minint(max, val))
}

export function intintrange(int, min, max) {
    return int >= min && int <= max
}

export function showElement(el) {
    el.style.display = "";
}

export function hideElement(el) {
    el.style.display = "none";
}

export function log(info) {
    //document.getElementById('btnOpen').innerText = info;
}

export function moddiv(baseval, divider) {
    if (divider > 0) {
      return (baseval - baseval % divider) / divider;
    } else return 0;
}

export function showApplicationMask(parent, text) {
    if (parent) {

        var maskbox = document.createElement("div");
        maskbox.setAttribute("class", "login-form-mask-box");
        maskbox.setAttribute("id", "mask-box");
        parent.appendChild(maskbox);

        var maskicon = document.createElement("div");
        maskicon.setAttribute("class", "login-form-mask-icon");
        maskbox.appendChild(maskicon);

        var maskboxtext = document.createElement("div");
        maskboxtext.setAttribute("class", "login-form-mask-text");
        maskboxtext.innerText = text;
        maskbox.appendChild(maskboxtext);

    };
};
export function hideApplicationMask(parent) {
    if (parent) {
        var el = document.getElementById('mask-box');
        if (el) el.remove();    
    };
};