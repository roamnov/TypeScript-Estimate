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

function log(info) {
    //document.getElementById('btnOpen').innerText = info;
}

export function moddiv(baseval, divider) {
    if (divider > 0) {
      return (baseval - baseval % divider) / divider;
    } else return 0;
}