export function createScrollbar(view, event) {
    this.view = view;
    view.insertAdjacentHTML('beforeend', '<div class="lazy-scroll">');
    var bar = view.lastChild;
    bar.style.zIndex = 2;

    var lastPageY, scrollTop = 0, maxScroll = 0;
    
    Stimate.appendEvent('mousedown', function(e) {
        lastPageY = e.pageY;

        Stimate.appendEvent('mousemove', drag);
        Stimate.appendEvent('mouseup', stop)

        return false;
    }, bar);

    function drag(e) {
        if (true) {
            scrollTop += (e.pageY - lastPageY);
            lastPageY = e.pageY;
            scrollTop = midint(0, maxScroll, scrollTop);
            bar.style.top = scrollTop + "px";
            if (event) {
                event(scrollTop / maxScroll)
            }
        }
    };

    function stop(e) {
        Stimate.deleteEvent('mousemove', drag);
        Stimate.deleteEvent('mouseup', stop);
    };

    this.updateBar = function (visibleRows, recordCount, scrollPos) {
        var scrollRatio = visibleRows / recordCount;
        
        if (scrollRatio < 1) {
            var top, barSize, totalSize = this.view.getBoundingClientRect().height,
                right = (this.view.clientWidth - bar.clientWidth) * -1,
                height = Math.max(scrollRatio * 100, 5);
            barSize = totalSize / 100 * height;
            maxScroll = totalSize - barSize;
            if (scrollPos != undefined) {
                scrollTop = maxScroll / (recordCount - visibleRows) * scrollPos;
                top = scrollTop + 'px';
            } else top = bar.style.top
            if (!top) {
                top = "0px";
            };
            bar.style.cssText = 'height:' + height + "%; top: " + top + ';right:' + right + 'px';
            showElement(bar);
        } else hideElement(bar);
    };

    return this;
};