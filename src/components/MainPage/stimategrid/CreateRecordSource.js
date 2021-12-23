import { useState } from "react";
import { maxint, midint, showElement,hideElement } from "./Helpful";
import {createGrid} from "./CreateGrid"



export function createRecordSource() {
    var me = this, points = new Map(), state = '', bof = true, eof = true, recordIndex = -1, 
        indexFields = '', groupFields = '', editRec = null,
        gen = 0;
    me.recordCount = 0;
    me.activeRecord = 0;
    me.fields = [];
    me.modified = false;
    me.active = false;
    me.defaultFields = false;
    me.onHandleRequest = null;
    me.updatesPending = false;

    function handleRequest(request) {
        if (me.onHandleRequest) {
            var json = me.onHandleRequest(request);
            if (json) me.updatesPending = json.UpdatesPending == 1;
            return json;
        }
    }

    function acquireFields() {
        if (me.active) return;
        var request = {}, json;
        request.command = 'getFields';
        if (indexFields) {
            request.indexFields = indexFields;
            indexFields = '';
        }
        if (groupFields) {
            request.groupFields = groupFields;
            groupFields = '';
        }
        json = handleRequest(request);
        if (json) {
            me.fields = [];
            let sourField, destField, fields = json.Fields;
            for (var i = 0; i < fields.length; i++) {
                sourField = fields[i];
                if (sourField.Name) {
                    destField = [];
                    destField.fieldName = sourField.Name;
                    if (sourField.Title) destField.displayLabel = sourField.Title
                    else destField.displayLabel = destField.fieldName;
                    if (sourField.Width) destField.displayWidth = sourField.Width
                    else destField.displayWidth = 10;
                    if (sourField.Type) destField.dataType = sourField.Type
                    else destField.dataType = 1;
                    if (sourField.Size) destField.dataSize = sourField.Size
                    else sourField.dataSize = 0;
                    if (sourField.Alignment) destField.alignment = sourField.Alignment
                    else destField.alignment = 0;
                    if (sourField.Values) {
                        //todo
                    }
                    me.fields.push(destField);
                }
            }
            me.recordCount = parseInt(json.RecordCount);
            if (json.Selection) me.selection = json.Selection;
            if (json.KeyFieldNames) me.keyFieldNames = json.KeyFieldNames;
        }

    };

    function checkScrollRecord() {};
    function recordIndexChanged() {};
    function sourceStateChanged() {};
    function recordStateChanged() {};

    me.open = function() {
        if (me.active) return;
        if (me.fields.length == 0) {
            acquireFields()
            me.defaultFields = me.fields.length > 0;
        } else me.refresh();
        me.active = true;
        recordIndex = -1;
        me.first();
        sourceStateChanged();
    };

    me.close = function() {
        if (!me.active) return;
        points.clear();
        if (me.defaultFields) me.fields = []; 
        me.active = false;
        sourceStateChanged();
    }

    me.refresh = function() {};

    function loadRecordValues(first, rec) {
        var request = {}, json, attributes, records, record, data;
        request.command = 'getRecords';
        request.first = first;
        request.count = 1;
        json = handleRequest(request);
        if (json) {
            attributes = json.RecordSet.Attributes;    
            records = json.RecordSet.Records;
            if (attributes && records && (records.length > 0)) {
                record = records[0];
                if (record.UpdateStatus) rec.info.updateStatus = parseInt(record.UpdateStatus)
                else rec.info.updateStatus = 0;
                if (record.RecordLevel) rec.info.recordLevel = parseInt(record.RecordLevel)
                else rec.info.recordLevel = 0;
                if (record.RecordState) rec.info.recordState = parseInt(record.RecordState)
                else rec.info.recordState = 0;
                if (record.RecordTitle) rec.info.recordTitle = record.RecordTitle
                else rec.info.recordTitle = "";
                data = record.Data;
                for (let i = 0, fieldName, index, d, v; i < attributes.length; i++) {
                    fieldName = attributes[i];
                    index = me.fields.findIndex(function(f) {
                        return (f.fieldName == fieldName)
                    });
                    if (index != -1) {
                        while (rec.vals.length <= index) {rec.vals.push({})};
                        d = data[i];
                        v = rec.vals[index];
                        if (d.text) {
                            v.text = d.text;
                            v.id = d.id;
                        } else v.text = d;
                    }
                    
                }
            }
        }    

    };

    function getRecordNode(index) {
        var rec = points.get(index);
        if (!rec) {
            rec = {vals: [], info: {}};
            loadRecordValues(index, rec);
            points.set(index, rec);
        };
        return rec;
    };

    me.getRecordState = function () {
        var rec = getRecordNode(me.activeRecord);
        if (rec.info) {
            return rec.info.recordState;
        };
        return 0;
    };

    me.getRecordTitle = function () {
        var rec = getRecordNode(me.activeRecord);
        if (rec.info) {
            return rec.info.recordTitle;
        } else return "";
    };

    me.getRecordLevel = function () {
        var rec = getRecordNode(me.activeRecord);
        if (rec.info) {
            return rec.info.recordLevel;
        } else return 0;
    };

    me.getFieldText = function(fieldName) {
        var index = me.fields.findIndex(function(f) {
            return (f.fieldName == fieldName)
        });
        
        if (index == -1) {
            return "";
        };

        var rec = getRecordNode(me.activeRecord);
        return rec.vals[index].text;
    };

    me.moveBy = function(distance) {
        checkScrollRecord();
        me.activeRecord += distance;
        if (me.activeRecord < 0) me.first()
        else if (me.activeRecord >= me.recordCount) me.last()
        else recordIndexChanged();
    };

    me.first = function() {
        me.activeRecord = 0;
        bof = true;
        eof = me.recordCount == 0;
        recordIndexChanged();
    };

    me.last = function() {
        me.activeRecord = maxint(0, me.recordCount - 1);
        eof = true;
        bof = me.recordCount == 0;
        recordIndexChanged();
    };

    me.setRecordIndex = function(value) {
        me.activeRecord = value;
        this.moveBy(0);
    };

    me.orderRecords = function(indexFieldNames, selection) {
        var request = {}, json;
        request.command = "SortRecords";
        request.fields = indexFieldNames;
        request.recordIndex = me.activeRecord;
        if (selection) request.selection = selection.value;
        json = handleRequest(request);
        if (json) {
            recordIndex = -1;
            points.clear();
            if (editRec) {
                editRec = null;
                recordStateChanged();
            };
            if (json.RecordIndex) me.activeRecord = parseInt(json.RecordIndex);
            if (selection && json.Selection) selection.value = json.Selection;
            recordIndexChanged();
        }
    };

    me.groupRecords = function(groupFieldNames) {
        var request = {}, json;
        request.command = "GroupRecords";
        request.fields = groupFieldNames;
        request.recordIndex = me.activeRecord;
        json = handleRequest(request);
        if (json) {
            recordIndex = -1;
            points.clear();
            if (editRec) {
                editRec = null;
                recordStateChanged();
            };
            if (json.RecordIndex) me.activeRecord = parseInt(json.RecordIndex);
            if (json.RecordCount) me.recordCount = parseInt(json.RecordCount);  
            recordIndexChanged();
        }
    };

    me.collapseGroup = function(collapse) {
        var request = {}, json;
        request.command = "CollapseGroup";
        request.recordIndex = me.activeRecord;
        request.collapsed = collapse?1:0;
        json = handleRequest(request);
        if (json) {
            recordIndex = -1;
            points.clear();
            if (editRec) {
                editRec = null;
                recordStateChanged();
            };
            if (json.RecordIndex) me.activeRecord = parseInt(json.RecordIndex);
            if (json.RecordCount) me.recordCount = parseInt(json.RecordCount);  
            recordIndexChanged();
        }
    };

    me.getGroupRecord = function() {
        var request = {}, json;
        request.command = 'GetRecordGroup';
        request.recordIndex = me.activeRecord;
        json = handleRequest(request);
        if (json) {
            if (json.RecordIndex) {
                return parseInt(json.RecordIndex);
            };
        };
        return -1;
    };

    me.applyFieldFilter = function(filter) {
        var request = {}, json;
        request.command = "ApplyFilter";
        request.recordIndex = me.activeRecord;
        request.fields = filter;
        json = handleRequest(request);
        if (json) {
            recordIndex = -1;
            points.clear();
            if (editRec) {
                editRec = null;
                recordStateChanged();
            };
            if (json.RecordIndex) me.activeRecord = parseInt(json.RecordIndex);
            if (json.RecordCount) me.recordCount = parseInt(json.RecordCount);  
            recordIndexChanged();
        }
    };

    me.postRecord = function() {};
    me.cancelRecord = function() {};
    me.isEditMode = function() {
        return state in ['edit', 'insert'];
    }

    return me;
}