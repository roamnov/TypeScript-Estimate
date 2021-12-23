import {createScrollbar} from "./CreateScrollBar"
import { intintrange, log, showElement, hideElement,delayCall, moddiv, maxint,  showApplicationMask, hideApplicationMask } from "./Helpful";



export function createGrid(panel) {

    var Stimate = {
        appendEvent: function(e, f, el) {
            if (el) {
                el.addEventListener(e, f)
            } else {
              document.addEventListener(e, f);
            }
        },
        deleteEvent: function(e, f, el) {
            if (el) {
                el.removeEventListener(e, f)
            } else {
                document.removeEventListener(e, f);
            }
        }}

    var // константы
        REGION_GROUP = 'group',
        REGION_TITLE = 'title',
        REGION_DATUM = 'datum',

        ROLE_COLUMN = 'column',
        ROLE_COLDATA = 'col-data',
        ROLE_COLLAPSE = 'collapse',
        ROLE_GROUP = 'group',
        ROLE_COLLAPSE_GROUP = 'collapsegroup',
        ROLE_FILTER = 'filter',
        

        GRID_BACKGROUND = '#88b7e0';

    var // размеры и прочее
        titleSize = 24,
        rowHeight = 24,
        indicatorSize = 40,
        groupSize = 0,
        groups = [],
        showIndicator = true,
        filterSize = 0,
        visibleRows = 0,
        firstRecord = 0,
        overflowColumns = false,
        leftRightMover = null,
        columnOffset = 0,
        currentRow = 0, currentCol = 0, childColumnSize = 24, isJustMouseDown = false,
        viewInfo = {horizontal: false};
    
    var me = this, sizeMarker, dragZone, handleColumnField;

    me.columns = {};
    me.defaultColumns = false;
    me.setSource = function(source) {
        if (me.source != source) {
            if (me.defaultColumns) me.columns = {}
        }
        me.source = source;
        if (source) {
            if (me.source && me.defaultColumns) {
                me.columns.fields = [];
                me.columns.levels = [];
                me.columns.title = [];
                var i, f, c, fields = me.source.fields;
                for (i = 0; i < fields.length; i++) {
                    c = {};
                    f = fields[i];
                    c.fieldName = f.fieldName;
                    c.title = f.displayLabel;
                    c.width = f.displayWidth*11;
                    c.level = 0;
                    me.columns.title.push(c);
                };
                prepareLevels();
            };
            buildColumns();
            buildGroups();
            buildRecords();
        };
    };

    function sourceActive() {return me.source != undefined && me.source != null && me.source.active}

    function getPointRegion(x, y) {

        function checkElement(el) {
            var r = el.getBoundingClientRect();
            if ((x >= r.left) && (x <= r.right) && (y >= r.top) && (y <= r.bottom)) {
                return true
            } else return false;
        };
        
        if (checkElement(me.header)) {
            return REGION_TITLE; 
        };
        if (checkElement(me.table)) {
            return REGION_DATUM;
        };
        if (checkElement(me.groups)) {
            return REGION_GROUP;
        }
    };

    function sizeColumn(e) {
        var x = e.x - panel.getBoundingClientRect().x;
        if ((x > handleColumnField.offset) && (x < panel.clientWidth)) {
            sizeMarker.style.left = x + "px";
            handleColumnField.eventSize = x;
        };
    };

    function getFieldAtPoint(x, y, info) {

        function checkColumn(level, colLeft, colTop, width, height) {
            if (level.items && level.expanded) {
                width.value = 0;
                height = childColumnSize;
                for (let i = 0, l, f, field, left = colLeft, w; i < level.items.length; i++) {
                    l = level.items[i];
                    f = l.field;
                    w = {value: f.width};
                    field = checkColumn(l, left, colTop + childColumnSize, w, childColumnSize);
                    if (field) return field;
                    left += w.value;
                    width.value += w.value;                      
                };
            };
            if (intintrange(x, colLeft, colLeft + width.value) && intintrange(y, colTop, colTop + height)) {
                return level.field;
            };
            return null;
        };

        var r = getPointRegion(x, y);
        if (info) info.region = r;
        switch (r) {
            case REGION_TITLE: {
                for (let levels = me.columns.levels, i = 0, left = 0, top = me.header.getBoundingClientRect().top, width, level, field; i < levels.length; i++) {
                    level = levels[i];
                    width = {value: level.field.width};
                    field = checkColumn(levels[i], left, top, width, titleSize);
                    if (field) return field;
                    left += width.value;
                };
                return me.columns.stubField;
            };
            case REGION_GROUP: {
                var rect = me.groups.getBoundingClientRect(), left = rect.left, top = rect.top, bottom = rect.bottom;
                for (let i = 0, el; i < me.groups.childElementCount; i++) {
                    el = me.groups.children[i];
                    rect = el.getBoundingClientRect();
                    if (intintrange(x, rect.left, rect.right)) {
                        if (info) {
                            info.left = rect.left;
                            info.top = rect.top;
                            info.bottom = rect.bottom;
                        }
                        return el.field;
                    };
                    left = rect.right;
                    top = rect.top;
                    bottom = rect.bottom;
                };
                if (info) {
                    info.left = left;
                    info.top = top;
                    info.bottom = bottom;
                }
                return null;
            }
        };
        return null;
    };

    function getFieldColumnRect(field) {
        var rect = me.header.getBoundingClientRect();
            return {
                left: field.offset + rect.left,
                top: rect.top + field.top,
                right: field.offset + field.width,
                bottom: rect.bottom
            }
    }

    function moveColumn(e) {

        if (!isJustMouseDown) {
            isJustMouseDown = true;
            return;
        }

        log('move: ' + e.x + ':' + e.y);

        if (!dragZone) {
            dragZone = document.createElement('div');
            dragZone.classList.add('grid-column');
            dragZone.classList.add('grid-drag-zone');
            panel.appendChild(dragZone);
            dragZone.moveTop = document.createElement('div');
            dragZone.moveTop.className = 'col-move-top';
            dragZone.moveTop.style.display = 'none';
            panel.appendChild(dragZone.moveTop);
            dragZone.moveBottom = document.createElement('div');
            dragZone.moveBottom.className = 'col-move-bottom';
            dragZone.moveBottom.style.display = 'none';
            panel.appendChild(dragZone.moveBottom);
        };
        if (!dragZone.initRect) {
            if (handleColumnField.groupEl) dragZone.initRect = handleColumnField.groupEl.getBoundingClientRect()
            else dragZone.initRect = handleColumnField.el.getBoundingClientRect();
            dragZone.deltaX = e.x - dragZone.initRect.left;
            dragZone.deltaY = e.y - dragZone.initRect.top;
            dragZone.style.left = dragZone.initRect.left + 'px';
            dragZone.style.top = dragZone.initRect.top + 'px';
            dragZone.style.width = dragZone.initRect.width + 'px';
            dragZone.style.height = dragZone.initRect.height + 'px';
            dragZone.textContent = handleColumnField.title;
            dragZone.style.display = '';
        };
        var x = e.x - dragZone.deltaX, y = e.y - dragZone.deltaY;
        dragZone.style.left = x + "px";
        dragZone.style.top = y + 'px';
        var info = {}, field = getFieldAtPoint(x + 5, y + 5, info);
        if (info.region == REGION_GROUP) {
            dragZone.moveTop.style.left = (info.left - 5) + "px";
            dragZone.moveTop.style.top = (info.top - dragZone.moveTop.getBoundingClientRect().height) + "px";
            dragZone.moveBottom.style.left = (info.left - 5) + "px";
            dragZone.moveBottom.style.top = info.bottom + "px";
            showElement(dragZone.moveTop);
            showElement(dragZone.moveBottom);
            dragZone.field = field;
            dragZone.isGroup = true;
            return;
        };
        if ((field != null) && ((field != handleColumnField) || field.groupEl) && (field.parent == handleColumnField.parent)) {
            let rect = getFieldColumnRect(field);
            dragZone.moveTop.style.left = rect.left + "px";
            dragZone.moveTop.style.top = (rect.top - dragZone.moveTop.getBoundingClientRect().height) + "px";
            dragZone.moveBottom.style.left = rect.left + "px";
            dragZone.moveBottom.style.top = rect.bottom + "px";
            showElement(dragZone.moveTop);
            showElement(dragZone.moveBottom);
            dragZone.field = field;
            dragZone.isGroup = false;
        } else {
            hideElement(dragZone.moveTop);
            hideElement(dragZone.moveBottom);
            dragZone.field = null;
        }
    };

    function updateColumns() {

        function updateElement(level, left, width) {
            var field = level.field, childs = level.items;
            if (childs && level.expanded) {
                width = 0;
                for (let i = 0, l = left, w, lev; i < childs.length; i++) {
                    lev = childs[i];
                    w = updateElement(lev, l, lev.field.width);
                    l += w;
                    width += w;
                }
            };
            if (field.el) {
                field.el.style.left = left + "px";
                field.el.style.width = width + "px";
                field.elementWidth = width;
                field.offset = left;
            };
            return width;
        };

        if (overflowColumns) {
            buildColumns();
        } else {
            let levels = me.columns.levels, left;
            if (showIndicator) left = indicatorSize
            else left = 0;
            for (let i = 0, level; i < levels.length; i++) {
                level = levels[i];
                left += updateElement(level, left, level.field.width);
            };
            if (me.columns.fields.length > 1) {
                let field;
                field = me.columns.fields[me.columns.fields.length - 1];
                me.columns.stubField = {
                    offset: field.offset + field.width,
                    el: field.el,
                    parent: me.columns.levels
                }
            };
        };

        buildRecords();
        updateScrollBar();
        updateFilters();
    };

    function updateScrollBar() {
        me.scrollBar.updateBar(visibleRows, me.source.recordCount, firstRecord);
    };
    
    function getRecordState() {
        if (sourceActive()) {
            return me.source.getRecordState();
        };
        return 0;
    };

    function getLevelOffset() {
        if (!viewInfo.horizontal && (groups.length > 0) && sourceActive()) {
            return me.source.getRecordLevel() * rowHeight;   
        };
        return 0;
    };

    function isGroupRecord(checkView) {
        if (groups.length > 0) {
            if (checkView && viewInfo.horizontal) {
                return false;
            };

            if ((getRecordState() & STATUS_GROUPED) != 0) {
                return true;
            };

        };
        return false;
    };

    function getRecordCollapsed() {
        if ((getRecordState() & STATUS_COLLAPSED) != 0) return true
        else return false;
    };

    function setRecordCollapsed(collapse) {
        if (sourceActive()) {
            me.source.collapseGroup(collapse);
            delayCall(function (){
                buildRecords();
                updateScrollBar();
            });

        }
    };

    function getGroupString() {
        if (sourceActive()) {
            return me.source.getRecordTitle()
        } else return "";
    };

    function updateCurrentView() {
        drawRecords();
        updateScrollBar();
    };

    function updateRecordTable() {
        buildRecords();
        updateScrollBar();
    };

    function updateAllGrid() {
        buildColumns();
        buildRecords();
        updateScrollBar();
    }

    function createRecordColumns(tr, isCurrentRow, margin) {
        var td;
        
        td = document.createElement('td');
        td.style.width = margin + 'px';
        td.style.backgroundColor = GRID_BACKGROUND;
        tr.appendChild(td);
        
        for (let i = 0, items = me.columns.fields, div, col, width; i < items.length; i++) {
            col = items[i];
            td = document.createElement('td');
            td.className = 'grid-td';
            td.col = i;
            td.field = col;
            if (isCurrentRow && (i == currentCol)) {
                td.classList.add('grid-item-focused');
            };
            width = col.width - 1;
            if (i == 0) width -= margin;
            td.style.width = width + "px";
            td.role = ROLE_COLDATA;
            div = document.createElement('div');
            div.className = 'grid-cell-inner';
            div.textContent = me.source.getFieldText(col.fieldName);
            td.appendChild(div);
            tr.appendChild(td);
        };
        tr.isGroup = false;
    };

    function createGroupRecord(tr, isCurrentRow, margin) {
        var td, width = -1, tmp;
        td = document.createElement('td');
        td.style.width = margin + 'px';
        td.style.backgroundColor = GRID_BACKGROUND;
        tr.appendChild(td);

        for (let i = 0, items = me.columns.fields, col; i < items.length; i++) {
            col = items[i];
            width += col.width;
        };
        width -= margin;
        td = document.createElement('td');
        td.className = 'grid-td';
        td.style.width = width + 'px';

        tmp = document.createElement('img');
        tmp.src = "data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
        tmp.classList.add("collapse-img");
        if (getRecordCollapsed()) tmp.classList.add("collapse-plus")
        else tmp.classList.add("collapse-minus");
        tmp.role = ROLE_COLLAPSE_GROUP;
        td.appendChild(tmp);

        tmp = document.createElement('span');
        tmp.style.width = "100%";
        tmp.textContent = getGroupString();
        td.appendChild(tmp);

        tr.appendChild(td);
        tr.isGroup = true;
    };

    function drawRecords() {

        function drawRow(r) {

            me.source.activeRecord = firstRecord + r;
            var el = getRowElement(r), isCurrentRow = (r == currentRow), isGroup, margin;
            el.classList.remove('grid-item-selected');
            if (isCurrentRow) el.classList.add('grid-item-selected');
            el = el.getElementsByTagName('tr')[0];

            isGroup = (getRecordState() & STATUS_GROUPED) != 0;
            margin = getLevelOffset();

            if (isGroup || (isGroup != el.isGroup)) {
                while (el.childElementCount > 1) {
                    el.removeChild(el.lastChild)
                };
                if (isGroup) {
                    createGroupRecord(el, isCurrentRow, margin)
                } else {
                    createRecordColumns(el, isCurrentRow, margin)
                };
                el.isGroup = isGroup;
            } else {
                if (isGroup) {
                    let cl = el.children[2];
                    cl.textContent = getGroupString();
                } else {
                    for (let i = 0, cl, col; i < el.childElementCount; i++) {
                        cl = el.children[i];
                        if (cl.field) {
                            col = cl.col;
                            cl.children[0].textContent = me.source.getFieldText(cl.field.fieldName);
                            if (col == currentCol) {
                                cl.classList.remove('grid-item-focused');
                                if (isCurrentRow) cl.classList.add('grid-item-focused');
                            }
                        }
                    };
                };
            }

        }

        var saveActiveRecord = me.source.activeRecord;

        for (var i = 0; i < visibleRows; i++) {
            drawRow(i);
        };

        me.source.activeRecord = saveActiveRecord;
    };

    function buildRecords() {

        if (true) {
            var last;
            while (last = me.data.lastChild) {
                me.data.removeChild(last);
            };
        };
    
        me.table.style.top = (groupSize + filterSize + titleSize) + "px";

        var saveActiveRecord = me.source.activeRecord;

        visibleRows = moddiv(me.data.clientHeight, rowHeight); 
        if (visibleRows > me.source.recordCount) {
            visibleRows = me.source.recordCount;
        }

        function createRecord(r) {
            me.source.activeRecord = firstRecord + r;
            var table = document.createElement('table'), 
            tbody = document.createElement('tbody') , 
            tr = document.createElement('tr'),
            isCurrentRow = (r == currentRow), isGroup;
            tr.row = r;

            if (showIndicator) {
                let td = document.createElement('td');
                td.className = 'grid-indicator';
                td.style.width = (indicatorSize) + 'px';
                tr.appendChild(td);
            };

            isGroup = (getRecordState() & STATUS_GROUPED) != 0;
            if (isGroup) {
                createGroupRecord(tr, isCurrentRow, getLevelOffset());
            } else {
                createRecordColumns(tr, isCurrentRow, getLevelOffset());
            };

            table.className = 'grid-item';
            if (isCurrentRow) {
                table.classList.add('grid-item-selected');
            } else if ((me.source.activeRecord % 2) != 0) {
                table.classList.add('grid-item-alt');
            }; 
            table.style.width = '0pt';
            table.cellSpacing = "0";
            table.cellPadding = "0";
            tr.style.height = rowHeight + "px";
            tr.className = 'grid-row';
            tbody.appendChild(tr);
            table.appendChild(tbody);
            me.data.appendChild(table);
            Stimate.appendEvent('mouseover', function() {
                table.classList.add('grid-item-over');
            }, table);
            Stimate.appendEvent('mouseleave', function() {
                table.classList.remove('grid-item-over');
            }, table);
        };

        if (me.source.recordCount < firstRecord) firstRecord = 0;

        for (var i = 0; i < visibleRows; i++) {
            createRecord(i);
        };

        me.source.activeRecord = saveActiveRecord;

    };

    function applyFilter() {
        if (sourceActive()) {
            var filter = {};
            for (let i = 0, el, f, t; i < me.filter.childElementCount; i++) {
                el = me.filter.children[i];
                f = el.field;
                if (f && el.value) {
                    t = {};
                    Object.defineProperty(t, el.value, {value: null, configurable: true, writable: true, enumerable: true});
                    t.$tag = 1;
                    Object.defineProperty(filter, f.fieldName, {value: t, configurable: true, writable: true, enumerable: true});
                };
            };
            me.source.applyFieldFilter(filter);
            updateRecordTable();
            scrollToRecord(me.source.activeRecord, true);
    };
    };

    function buildFilters() {
        if (filterSize == 0) return;
        var el = me.filter, top = me.filter.getBoundingClientRect().top;
        while (el.childElementCount > 0) {
            let ch = el.lastChild;
            if (ch.field) {
                ch.field.filterText = ch.value;
            };
            el.removeChild(ch);
        };
        for (let i = 0, fields = me.columns.fields, f; i < fields.length; i++) {
            f = fields[i];
            el = document.createElement('input');
            el.style.position = 'absolute';
            el.style.top = "1px";
            el.style.left = f.offset + "px";
            el.style.width = (f.elementWidth - 4) + "px";
            el.style.height = (filterSize - 6) + "px";
            el.field = f;
            el.classList.add('grid-filter');
            el.role = ROLE_FILTER;
            if (f.filterText) {
                el.value = f.filterText;
            };
            el.onkeydown = function(e) {
                if (e.key == 'Enter') {
                    applyFilter();
                }
            }
            me.filter.appendChild(el);
        };
    };

    function updateFilters() {
        if (filterSize == 0) return;
        for (let i = 0, el, f; i < me.filter.childElementCount; i++) {
            el = me.filter.children[i];
            f = el.field;
            if (f) {
                el.style.left = f.offset + "px";
                el.style.width = (f.elementWidth - 4) + "px";
                el.setAttribute('tabindex', me.columns.fields.indexOf(f) + 1);
            }
        }
    }

    function getRowElement(r) {
        return me.data.children[r];
    };

    function getColElement(c, r) {
        var rEl = getRowElement(r);
        if (rEl) {
            rEl = rEl.getElementsByTagName('tr');
            if (rEl) {
                rEl = rEl[0];
                if (showIndicator) {
                    return rEl.children[c + 2]
                } else return rEl.children[c];
            }
        }
        return null;
    };

    function showEditor() {};
    function hideEditor() {};

    function getActiveRecord() {return currentRow + firstRecord};
    function getFirstRecord() {return firstRecord};
    function getLastRecord() {return firstRecord + visibleRows - 1};

    function moveColRow(newCol, newRow) {

        function scrollData(distance) {
            me.source.moveBy(distance);
            if (me.source.activeRecord > getLastRecord()) {
                distance = me.source.activeRecord - getLastRecord()
            } else if (me.source.activeRecord < getFirstRecord()) {
                distance = me.source.activeRecord - getFirstRecord()
            } else distance = 0;
            if (distance != 0) {
                firstRecord += distance;
                currentRow = me.source.activeRecord - firstRecord;
                delayCall(updateCurrentView);
                return true;
            } else {
                currentRow = me.source.activeRecord - firstRecord;
                return false;
            }
        }

        var el, colDelta = newCol - currentCol, rowDelta = newRow - currentRow;
        if (colDelta || rowDelta) {
    
            hideEditor();

            el = getColElement(currentCol, currentRow);
            if (el) el.classList.remove('grid-item-focused');
    
            if (rowDelta != 0 || getActiveRecord() < getFirstRecord() || (getActiveRecord() > getLastRecord())) {
                el = getRowElement(currentRow);
                if (el) el.classList.remove('grid-item-selected');
                if (!scrollData(rowDelta)) {
                    el = getRowElement(currentRow);
                    if (el) el.classList.add('grid-item-selected');
                }
            }
            if (colDelta != 0) {
                if (newCol < 0) newCol = 0;
                if (newCol > me.columns.fields.length -1) newCol = me.columns.fields.length - 1;
                currentCol = newCol;
            }
            el = getColElement(currentCol, currentRow);
            if (el) el.classList.add('grid-item-focused');
    }
    }

    function scrollToRecord(record, moveCurrent) {
        if (sourceActive) {
            if (moveCurrent) {
                if (me.source.activeRecord != record) {
                    hideEditor();
                    if (me.source.isEditMode()) {
                        if (me.source.modified){ source.postRecord()}
                        else {me.source.cancelRecord();}
                    }
                    me.source.setRecordIndex(record);
                }
                let distance;
                if (me.source.activeRecord > getLastRecord()) {
                    distance = me.source.activeRecord - getLastRecord()
                } else if (me.source.activeRecord < getFirstRecord()) {
                    distance = me.source.activeRecord - getFirstRecord()
                } else distance = 0;
                firstRecord += distance;
                currentRow = me.source.activeRecord - firstRecord;
                updateCurrentView();
            } else {
                record = midint(0, me.source.recordCount - visibleRows, record);
                if (record != firstRecord) {
                    firstRecord = record;
                    currentRow = me.source.activeRecord - firstRecord;
                    updateCurrentView();
                }
            }
        }
    }

    function getSelection() {};
    function setSelection(value) {};
    function notifyGrid(notify) {};

    function processLevels(f) {

        function processLevel(level) {
            for (let i = 0, l; i < level.length; i++) {
                l = level[i];
                f.call(me, l);
                if (l.items) {
                    processLevel(l.items);
                }
            }
        };

        processLevel(me.columns.levels);

    }

    function getIndexFieldName() {
        var value = '';

        processLevels(function(level) {
            switch (level.field.sortDirect) {
                case 'up':
                    if (value != '') value += ';';
                    value += level.field.fieldName;
                    break;
                case 'down':
                    if (value != '') value += ';';
                    value += '-';
                    value += level.field.fieldName;
                    break;
            }
        });

        return value;

    };

    function getGroupFieldNames() {
        var value = '';
        for (let i = 0, field, s; i < groups.length; i++) {
            field = groups[i];
            s = field.fieldName;
            if (field.params) {
                s = s + '.' + field.params;
            };
            if (field.sortDirect == 'down') {
                s = '-' + s;
            };
            if (value != '') value += ';';
            value += s;
        };
        return value;
    }

    function checkOrderColumns() {
        if (sourceActive()) {
            showApplicationMask();
            try {
                let selection = {};
                selection.value = getSelection();
                me.source.orderRecords(getIndexFieldName(), selection);
                updateCurrentView();
                scrollToRecord(me.source.activeRecord, true);
            } finally {
                hideApplicationMask();
            };
            notifyGrid(nfStateChanged);
        }
    };

    function checkGroupColumnns() {
        if (sourceActive()) {
            showApplicationMask();
            try {
                me.source.groupRecords(getGroupFieldNames());
                updateRecordTable();
                scrollToRecord(me.source.activeRecord, true);
            } finally {
                hideApplicationMask();
            };
            notifyGrid(nfStateChanged);
        }
    }

    function handleMouseUp(e) {

        if (e.button != 0) return;

        isJustMouseDown = false;

        if (sizeMarker.style.opacity == 1) {
            Stimate.deleteEvent('mousemove', sizeColumn);
            if (handleColumnField.eventSize) {
                handleColumnField.width = handleColumnField.eventSize - handleColumnField.offset;
                updateColumns();
                sizeMarker.style.opacity = 0;
            };
            handleColumnField = null;
            return;
        };


        if (dragZone && dragZone.initRect) {
            Stimate.deleteEvent('mousemove', moveColumn);
            dragZone.initRect = null;
            hideElement(dragZone);
            hideElement(dragZone.moveTop);
            hideElement(dragZone.moveBottom);

            if (dragZone.isGroup) {
                let i = groups.indexOf(handleColumnField);
                if (i != -1) groups.splice(i, 1);
                if (dragZone.field) {
                    i = groups.indexOf(dragZone.field);
                    if (i != -1) groups.splice(i, 0, handleColumnField)
                    else groups.push(handleColumnField);
                } else groups.push(handleColumnField);
                handleColumnField = null;
                dragZone.field = null;
                buildGroups();
                return;
            };

            if (dragZone.field) {
                let items = handleColumnField.parent, i, j, item = dragZone.field.el.level;
                i = items.indexOf(handleColumnField.el.level);
                if (i != -1) {
                    j = items.indexOf(item);
                    if (j != -1) {
                        items.splice(i, 1);
                        items.splice(j, 0, handleColumnField.el.level);
                    }
                };
    
                // todo...
                function addField(level) {
                    if (level.items && level.expanded) {
                        level.items.forEach(addField);
                    } else {
                        me.columns.fields.push(level.field);
                    }
                }
    
                me.columns.fields.length = 0;
                me.columns.levels.forEach(addField);
                
            }
            updateColumns();
            if (handleColumnField.groupEl) {
                let i = groups.indexOf(handleColumnField);
                if (i != -1) {
                    groups.splice(i, 1);
                    buildGroups();
                };
                handleColumnField.groupEl = null;
            }
            handleColumnField = null;
            dragZone.field = null;
            return;
        };

        var el = document.elementFromPoint(e.x, e.y), target, role;
        target = el;
        while (el) {
            role = el.role;
            if (role) break;
            el = el.parentElement;
        };
        if (role) {
            switch (role) {
                case ROLE_COLUMN: {
                    Stimate.deleteEvent('mousemove', moveColumn);
                    handleColumnField = null;
                    var temp, field = el.field;
                    if (!target.classList.contains('column-header-text')) {
                        temp = el.getElementsByClassName('column-header-text');
                        if (temp && (temp.length > 0)) target = temp[0]
                        else target = null;
                    };
                    if (target) {

                        function clearSortDirect(level) {
                            level.field.sortDirect = '';
                            if (level.items) {
                                level.items.forEach(clearSortDirect)
                            }
                        };
                        me.columns.levels.forEach(clearSortDirect);

                        temp = me.header.getElementsByClassName('column-header-text');
                        if (temp) {
                            for (let i = 0, t; i < temp.length; i++) {
                                t = temp[i];
                                if (t != target) {
                                    t.classList.remove('column-sort-asc');
                                    t.classList.remove('column-sort-desc');
                                }
                            }
                        }
                            if (target.classList.contains("column-sort-asc")) {
                            target.classList.remove("column-sort-asc");
                            target.classList.add("column-sort-desc");
                            field.sortDirect = 'down';
                        } else {
                            target.classList.remove("column-sort-desc");
                            target.classList.add("column-sort-asc");
                            field.sortDirect = 'up';
                        };
                        checkOrderColumns();
                    };
                    break;
                };
            };
        };
    }

    function handleMouseDown(e) {

        if (e.button != 0) return;

        var el = document.elementFromPoint(e.x, e.y), role;
        while (el) {
            role = el.role;
            if (role) break;
            el = el.parentElement;
        };
        if (role) {
            switch (role) {
                // start move column
                case ROLE_COLUMN: {
                    if (handleColumnField) return;
                    handleColumnField = el.field;
                    handleColumnField.groupEl = null;
                    Stimate.appendEvent('mousemove', moveColumn);
                    break;
                };
                case ROLE_GROUP: {
                    if (handleColumnField) return;
                    handleColumnField = el.field;
                    handleColumnField.groupEl = el;
                    Stimate.appendEvent('mousemove', moveColumn);
                    break;
                };
                case ROLE_COLDATA: {
                    let newCol = el.col, newRow = el.parentElement.row;
                    moveColRow(newCol, newRow); 
                    break;
                };
                case ROLE_COLLAPSE: {
                    let level = el.parentElement.level;
                    if (level) {
                        if (el.classList.contains('collapse-minus')) {
                            el.classList.remove('collapse-minus');
                            el.classList.add('collapse-plus');
                            level.expanded = false;
                        } else {
                            el.classList.remove('collapse-plus');
                            el.classList.add('collapse-minus');
                            level.expanded = true;
                        };
                        delayCall(function (){
                            buildColumns();
                            buildRecords();
                            updateScrollBar();
                        })
                    };
                    break;
                };
                case ROLE_COLLAPSE_GROUP: {
                    let row = el.parentElement.parentElement.row;
                    if (row != undefined) {
                        moveColRow(currentCol, row);
                        let collapse = getRecordCollapsed();
                        setRecordCollapsed(!collapse);
                    };
                    break;
                }                          
            } 
        }
    }

    function handleKeyDown(e) {
        log(e.key);
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                if (isGroupRecord(true)) {
                    if (getRecordCollapsed()) {
                        let record = me.source.getGroupRecord();
                        if (record != -1) scrollToRecord(record, true);
                    } else setRecordCollapsed(true);
                } else {
                    if ((currentCol == 0) && (getLevelOffset() > 0)) {
                        let record = me.source.getGroupRecord();
                        if (record != -1) scrollToRecord(record, true);
                    } else moveColRow(currentCol - 1, currentRow);
                }; 
                break;
            case 'ArrowRight':
                e.preventDefault();
                if (isGroupRecord(true)) {
                    if (getRecordCollapsed()) setRecordCollapsed(false);
                } else moveColRow(currentCol + 1, currentRow);
                break;
            case 'ArrowUp':
                if (e.ctrlKey) scrollView(-1)
                else moveColRow(currentCol, currentRow - 1);
                break;
            case 'ArrowDown':
                if (e.ctrlKey) scrollView(1)
                else moveColRow(currentCol, currentRow + 1);
                break;
            case 'PageUp':
                if (e.ctrlKey) scrollView(-visibleRows)
                else moveColRow(currentCol, currentRow - visibleRows);
                break;
            case 'PageDown':
                if (e.ctrlKey) scrollView(visibleRows)
                else moveColRow(currentCol, currentRow + visibleRows);
                break;
            case 'Home':
                if (e.ctrlKey) scrollToRecord(-1, true)
                else moveColRow(0, currentRow);
                break;
            case 'End':
                if (e.ctrlKey) scrollToRecord(me.source.recordCount, true)
                else moveColRow(me.columns.fields.length - 1, currentRow);
        }
    }

    function scrollView(distance) {
        if (sourceActive()) {
            var oldFirstRecord = firstRecord;
            if (distance > 0) {
                firstRecord += distance;
                let max = me.source.recordCount - visibleRows;
                if (firstRecord > max) firstRecord = max;
            } else if (distance < 0) {
                firstRecord += distance;
                if (firstRecord < 0) firstRecord = 0; 
            }             
            if (oldFirstRecord != firstRecord) {
                currentRow = me.source.activeRecord - firstRecord;
                delayCall(updateCurrentView);
            }
        }
    }

    function handleMouseWheel(e) {
        if (e.deltaY < 0) {
            scrollView(-1)
        } else if (e.deltaY > 0) {
            scrollView(1)
        }
    };

    function buildColumns() {
        var last, left = 0, levels = me.columns.levels, maxlev = 1, totalWidth = me.header.getBoundingClientRect().width;
        
        while (last = me.header.lastChild) {
            me.header.removeChild(last);
        };

        function getMaxLevel(level) {
            let res = 1, max = 0;
            if (level.items && level.expanded) {
                for (let i = 0; i < level.items.length; i++) {
                    max = maxint(max, getMaxLevel(level.items[i]));
                };
            };
            return res + max;
        };

        for (let i = 0; i < levels.length; i++) {
            maxlev = maxint(maxlev, getMaxLevel(levels[i]));
        };

        childColumnSize = rowHeight;
        titleSize = maxlev * childColumnSize;

        me.header.style.height = titleSize + "px";

        if (showIndicator) {
            let el = document.createElement('div');
            el.className = 'grid-column';
            el.style.position = 'absolute';
            el.style.left = left + 'px';
            el.style.width = indicatorSize + 'px';
            el.style.height = "100%";
            el.style.display = 'flex';
            me.header.appendChild(el);
            left += indicatorSize;
        };

        function createFieldElement(level, left, top, width, height) {
            var el, tmp, field = level.field;
            
            if (level.items && level.expanded) {
                width = 0;
                for (let i = 0, l = left, w, lev, fld; i < level.items.length; i++) {
                    lev = level.items[i];
                    fld = lev.field;
                    w = fld.width;
                    if ((l + w) > totalWidth) {
                        overflowColumns = true;
                        w -= (l + w) - totalWidth;
                        if (w < rowHeight) break;
                        i = level.items.length;
                    }; 
                    w = createFieldElement(lev, l, top + childColumnSize, w, height - childColumnSize);
                    width += w;
                    l += w;
                };
                height = childColumnSize;
            } else me.columns.fields.push(field);

            el = document.createElement('div');
            el.className = 'grid-column';
            el.style.position = 'absolute';
            el.style.left = left + 'px';
            el.style.top = top + 'px';
            el.style.width = width + 'px';
            el.style.height = height + 'px';
            el.style.display = 'flex';
            el.style.alignItems = 'top';
            el.role = ROLE_COLUMN;
            field.offset = left;
            field.top = top;
            field.height = height;
            field.elementWidth = width;
            el.field = field;
            el.level = level;
            field.el = el;

            if (level.items) {
                tmp = document.createElement('img');
                tmp.src = "data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
                tmp.classList.add("collapse-img");
                if (level.expanded) tmp.classList.add("collapse-minus")
                else tmp.classList.add("collapse-plus");
                tmp.role = ROLE_COLLAPSE;
                el.appendChild(tmp);
            }

            tmp = document.createElement('div');
            tmp.style.textAlign = 'center';
            tmp.style.width = "100%";
            tmp.innerHTML = '<span class="column-header-text">' + field.title + '</span>';
            tmp.className = 'grid-column-title';
            el.appendChild(tmp);
            switch (field.sortDirect) {
                case 'up':
                    tmp.children[0].classList.add('column-sort-asc');
                    break;
                case 'down':
                    tmp.children[0].classList.add('column-sort-desc');
                    break;
            }
            me.header.appendChild(el);
            return width;
        };

        me.columns.fields = [];
        overflowColumns = false;
        for (let i = columnOffset, level, field, width; i < levels.length; i++) {
            level = levels[i];
            field = level.field;
            width = field.width;
            if ((left + width) > totalWidth) {
                overflowColumns = true;
                width -= (left + width) - totalWidth;
                if (width < rowHeight) break;
                i = levels.length;
            };
            left += createFieldElement(level, left, 0, width, titleSize);
        };
        me.header.style.height = titleSize + "px";

        if (me.columns.fields.length > 1) {
            let field;
            field = me.columns.fields[me.columns.fields.length - 1];
            me.columns.stubField = {
                offset: field.offset + field.width,
                el: field.el,
                parent: me.columns.levels
            };
        };

        buildFilters();
        if (overflowColumns && !leftRightMover.parentElement) {
            me.header.appendChild(leftRightMover);
        };
    };

    function buildGroups() {
        groupSize = me.groups.getBoundingClientRect().height;
        let last;
        while (last = me.groups.lastChild) {
            me.groups.removeChild(last);
        };
        if (groups.length > 0) {
            me.groups.innerHTML = "";
            groupSize = maxint(groupSize, rowHeight*groups.length);
            me.groups.style.height = groupSize + "px";
            for (let i = 0, el, field, l = 3, w, t = 3; i < groups.length; i++) {
                field = groups[i];
                w = 100;
                el = document.createElement('div');
                el.style.position = 'absolute';
                el.style.left = l + "px";
                el.style.top = t + "px";
                el.style.width = w + "px";
                el.textContent = field.title;
                el.field = field;
                el.classList.add('grid-column');
                el.role = ROLE_GROUP;
                me.groups.appendChild(el);
                t += 7;
                l += w + 3;
            };
            groupSize = me.groups.lastChild.getBoundingClientRect().bottom - me.groups.getBoundingClientRect().top + 3;
            if (groupSize < 43) groupSize = 43;
            me.groups.style.height = groupSize + 'px';
        } else {
            me.groups.style.height = rowHeight + 'px';
            me.groups.innerHTML = "<p>Для группировки перетащите сюда заголовок колонки</p>";
        };
        groupSize = me.groups.getBoundingClientRect().height;
        me.table.style.top = (groupSize + filterSize + titleSize) + "px";
        checkGroupColumnns();
    };

    function prepareLevels() {
        me.columns.levels = [];
        me.columns.fields = [];
        groups = [];
        var title = me.columns.title, parents = [];

        function getParent(value) {
            var level;
            if (intintrange(value, 0, parents.length - 1)) {
                level = parents[value];
                if (level) {
                    if (!level.items) level.items = [];
                    return level.items;
                };
            };
            return me.columns.levels;
        }

        for (let i = 0, level, field, parent; i < title.length; i++) {
            field = title[i];
            level = {field: field};
            if (field.level) level.level = maxint(0, field.level)
            else level.level = 0;
            if (!field.title) field.title = field.fieldName;
            while (parents.length <= level.level) parents.push({});
            parents[level.level] = level;
            parent = getParent(level.level - 1);
            parent.push(level);
            field.parent = parent;
        }
        
    };

    me.setColumns = function(columns) {
        me.columns = columns;
        prepareLevels();
        me.defaultColumns = false;
    };

    me.refreshSource = function() {
        delayCall(updateRecordTable);
    };

    panel.style.userSelect = "none";
    panel.style.overflow = 'hidden';
    panel.className = 'grid-panel';
    panel.tabIndex = 0;
    Stimate.appendEvent('mousedown', handleMouseDown, panel);
    Stimate.appendEvent('mouseup', handleMouseUp, panel);
    Stimate.appendEvent('keydown', handleKeyDown, panel);
    var temp = 0;
    window.onresize = function(e) {
        //log(me.table.getBoundingClientRect().height)
        delayCall(updateAllGrid)
    };

    sizeMarker = document.createElement('div');
    sizeMarker.className = 'grid-size-marker';
    sizeMarker.style.left = "10px";
    sizeMarker.style.top = "0px";
    sizeMarker.style.height = "100%";
    sizeMarker.style.opacity = 0;
    sizeMarker.onmousedown = function(e) {
        if (sizeMarker.sizeEl) {
            handleColumnField = sizeMarker.sizeEl.field;
            if (handleColumnField) {
                sizeMarker.style.opacity = 1;
                Stimate.appendEvent('mousemove', sizeColumn);
            }
        }
    }
    panel.appendChild(sizeMarker);

    var lastOverElement, panelLeftOffset = panel.getBoundingClientRect().left;
    panel.onmousemove = function(e) {
        let el = e.target;
        if (lastOverElement != el) {
            lastOverElement = el;
            while (!el.role) {
                el = el.parentElement;
                if (!el) return;
            }
            sizeMarker.style.left = (el.getBoundingClientRect().right - panelLeftOffset - 4) + "px";
            sizeMarker.sizeEl = el;
        }
    }

    me.panel = panel;

    filterSize = rowHeight + 2;

    if (filterSize > 0) {
        me.filter = document.createElement('div');
        me.filter.className = 'grid-filter';
        me.filter.style.position = 'relative';
        me.filter.style.top = '0px';
        me.filter.style.width = "100%";
        me.filter.style.height = filterSize + "px";
        panel.appendChild(me.filter);
    };

    groupSize = rowHeight + 4;

    if (groupSize > 0) {
        me.groups = document.createElement('div');
        me.groups.className = 'grid-groups';
        me.groups.style.position = 'relative';
        me.groups.style.width = "100%";
        me.groups.style.height = groupSize + "px";
        panel.appendChild(me.groups);
    };

    me.header = document.createElement('div');
    me.header.className = 'grid-header';
    me.header.style.position = 'absolute';
    me.header.style.width = "100%"
    panel.appendChild(me.header);

    leftRightMover = document.createElement('ul');
    leftRightMover.className = "pagination";
    leftRightMover.innerHTML = '<li><a href="#" role="l">❮</a></li><li><a href="#" role="r">❯</a></li>';
    leftRightMover.style.position = "absolute";
    leftRightMover.style.right = "-7px";
    leftRightMover.style.top = "2px";
    leftRightMover.style.width = "40px";
    leftRightMover.style.height = "20px";
    leftRightMover.style.opacity = 1;
    leftRightMover.onclick = function (el) {
        alert(el.target.innerText)
    };
    me.header.appendChild(leftRightMover);

    me.table = document.createElement('div');
    me.table.className = "grid-table";
    me.table.style.position = "absolute";
    me.table.style.width = "100%";
    me.table.style.bottom = "1px";
    panel.appendChild(me.table);

    me.data = document.createElement('div');
    me.data.style.float = "left";
    me.data.style.width = "100%";
    me.data.style.height = "100%";
    me.data.style.backgroundColor = GRID_BACKGROUND;
    me.data.style.zIndex = 1;
    me.data.classList.add("grid-data");
    me.data.classList.add("grid-with-row-lines");
    Stimate.appendEvent('wheel', handleMouseWheel);

    panel.onfocus = function(e) {
        //log('focused')
    }
    panel.onblur = function(e) {
        //log('blured')
    }
    me.table.appendChild(me.data);

    me.scrollBar = new createScrollbar(me.table, function (ratio) {
        var pos = Math.round((me.source.recordCount - visibleRows) * ratio);
        if (pos != firstRecord) {
            firstRecord = pos;
            let max = me.source.recordCount - visibleRows;
            if (firstRecord > max) firstRecord = max;
            currentRow = me.source.activeRecord - firstRecord;
            delayCall(buildRecords);
        }
    });

    return me;
}