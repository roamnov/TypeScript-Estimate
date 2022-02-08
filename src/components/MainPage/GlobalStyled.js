import styled, { createGlobalStyle } from 'styled-components';
import * as React from 'react';
import ReactDOM from 'react-dom';

const GlobalStyleTree = createGlobalStyle`

.hiddenBlock
{
    display: block;
    height: 0px;
    opacity: 0;
    z-index: -99999;
    transition-property: opacity, height;
    transition: transform .3s;
}
.showBlock
{
    display: block;
    height: 100%;
    opacity: 1;
    transition-property: opacity, height;
    transition-duration: 1s;
}
.react-checkbox-tree {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: reverse;
    -ms-flex-direction: row-reverse;
    flex-direction: row-reverse;
    font-size: 16px
}

.react-checkbox-tree>ol {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto
}

.react-checkbox-tree ol {
    margin: 0;
    padding-left: 0;
    list-style-type: none
}

.react-checkbox-tree ol ol {
    padding-left: 24px
}

.react-checkbox-tree button {
    line-height: normal;
    color: inherit
}

.react-checkbox-tree button:disabled {
    cursor: not-allowed
}

.react-checkbox-tree .rct-bare-label {
    cursor: default
}

.react-checkbox-tree label {
    margin-bottom: 0;
    cursor: pointer
}

.react-checkbox-tree label:hover, .react-checkbox-tree label.SelectItemTree{
    background: rgba(51, 51, 204, .1)

}

.react-checkbox-tree label:active, .react-checkbox-tree label:focus {
    background: rgba(51, 51, 204, .15)
}

.react-checkbox-tree:not(.rct-native-display) input {
    display: none
}

.react-checkbox-tree.rct-native-display input {
    margin: 0 5px
}

.react-checkbox-tree .rct-icon {
    display: inline-block;
    text-align: center;
    text-rendering: auto;
    font-family: "Font Awesome 5 Free", FontAwesome, sans-serif;
    font-weight: 400;
    font-variant: normal;
    font-style: normal;
    position: relative;
}

.rct-disabled>.rct-text>label {
    opacity: .75;
    cursor: not-allowed
}

.rct-disabled>.rct-text>label:hover {
    background: 0 0
}

.rct-disabled>.rct-text>label:active {
    background: 0 0
}

.rct-text {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center
}

.rct-options {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    margin-left: .5rem;
    text-align: right
}

.rct-option {
    opacity: .75;
    border: 0;
    background: 0 0;
    cursor: pointer;
    padding: 0 4px;
    font-size: 18px
}

.rct-option:hover {
    opacity: 1
}

.rct-option+.rct-option {
    margin-left: 2px
}

.rct-checkbox, .rct-collapse, .rct-node-icon {
    padding: 0 5px
}

.rct-checkbox *, .rct-collapse *, .rct-node-icon * {
    display: inline-block;
    margin: 0;
    width: 14px
}

.rct-collapse {
    -ms-flex-item-align: stretch;
    align-self: stretch;
    border: 0;
    background: 0 0;
    line-height: normal;
    color: inherit;
    font-size: 12px
}

.rct-collapse.rct-collapse-btn {
    cursor: pointer;
    padding: 0;
}

.rct-collapse>.rct-icon-expand-close {
    opacity: .5
}

.rct-collapse>.rct-icon-expand-close:hover {
    opacity: 1
}

.rct-native-display .rct-checkbox {
    display: none
}

.rct-node-clickable {
    cursor: pointer
}

.rct-node-clickable:hover {
    background: rgba(51, 51, 204, .1)
}

.rct-node-clickable:focus {
    outline: 0;
    background: rgba(51, 51, 204, .2)
}



.rct-title {
    padding: 0 5px
}

.rct-icons-fa5 .rct-icon-expand-close {
    background: url("data:image/svg+xml;base64,77u/PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMjYgMjYiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+DQogIDxwYXRoIGQ9Ik0xMS40MTQwNjMgMy41ODU5MzhMOC41ODU5MzggNi40MTQwNjNMMTUuMTcxODc1IDEzTDguNTg1OTM4IDE5LjU4NTkzOEwxMS40MTQwNjMgMjIuNDE0MDYzTDIwLjgyODEyNSAxM1oiIGZpbGw9IiMyQzJDMkEiIC8+DQo8L3N2Zz4=");
    height:16px;
    width:16px;

}

.rct-icons-fa5 .rct-icon-expand-open{
    background: url("data:image/svg+xml;base64,77u/PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMjYgMjYiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+DQogIDxwYXRoIGQ9Ik02LjQxNDA2MyA3LjU4NTkzOEwzLjU4NTkzOCAxMC40MTQwNjNMMTMgMTkuODI4MTI1TDIyLjQxNDA2MyAxMC40MTQwNjNMMTkuNTg1OTM4IDcuNTg1OTM4TDEzIDE0LjE3MTg3NVoiIGZpbGw9IiMyQzJDMkEiIC8+DQo8L3N2Zz4=");
    height:16px;
    width:16px;
}

.rct-icons-fa5 .rct-icon-uncheck {
    background: url("data:image/svg+xml;base64,77u/PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMjYgMjYiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+DQogIDxwYXRoIGQ9Ik0yMS4xMjUgMkMyMi43MTA5MzggMiAyNCAzLjI4OTA2MyAyNCA0Ljg3NUwyNCAyMS4xMjVDMjQgMjIuNzEwOTM4IDIyLjcxMDkzOCAyNCAyMS4xMjUgMjRMNC44NzUgMjRDMy4yODkwNjMgMjQgMiAyMi43MTA5MzggMiAyMS4xMjVMMiA0Ljg3NUMyIDMuMjg5MDYzIDMuMjg5MDYzIDIgNC44NzUgMkwyMS4xMjUgMiBNIDIxLjEyNSAwTDQuODc1IDBDMi4xODM1OTQgMCAwIDIuMTgzNTk0IDAgNC44NzVMMCAyMS4xMjVDMCAyMy44MTY0MDYgMi4xODM1OTQgMjYgNC44NzUgMjZMMjEuMTI1IDI2QzIzLjgxNjQwNiAyNiAyNiAyMy44MTY0MDYgMjYgMjEuMTI1TDI2IDQuODc1QzI2IDIuMTgzNTk0IDIzLjgxNjQwNiAwIDIxLjEyNSAwWiIgZmlsbD0iIzJDMkMyQSIgLz4NCjwvc3ZnPg==");
    height:16px;
    width:16px;
    top:1px;
}

.rct-icons-fa5 .rct-icon-check::before {
    content: "\f14a"
}

.rct-icons-fa5 .rct-icon-half-check::before {
    opacity: .5;
    content: "\f14a"
}

.rct-icons-fa5 .rct-icon-leaf{
    background: url("data:image/svg+xml;base64,77u/PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+DQogIDxwYXRoIGQ9Ik02IDNMNiAyOUwyNiAyOUwyNiA5LjU5Mzc1TDI1LjcxODc1IDkuMjgxMjVMMTkuNzE4NzUgMy4yODEyNUwxOS40MDYyNSAzIFogTSA4IDVMMTggNUwxOCAxMUwyNCAxMUwyNCAyN0w4IDI3IFogTSAyMCA2LjQzNzVMMjIuNTYyNSA5TDIwIDlaIiBmaWxsPSIjMzMzM0NDIiAvPg0KPC9zdmc+");
    height:16px;
    width:16px;
}

.rct-icons-fa5 .rct-icon-parent-open {
    background: url("data:image/svg+xml;base64,77u/PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMjYgMjYiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+DQogIDxwYXRoIGQ9Ik0zIDNDMS4zNDM3NSAzIDAgNC4zNDM3NSAwIDZMMCAyMEMwIDIxLjAzNTE1NiAwLjU0Mjk2OSAyMS45MzM1OTQgMS4zNDM3NSAyMi40Njg3NUMxLjQ2ODc1IDIyLjU1MDc4MSAxLjU4MjAzMSAyMi42MjUgMS43MTg3NSAyMi42ODc1QzEuNzU3ODEzIDIyLjcxMDkzOCAxLjgwMDc4MSAyMi43MzA0NjkgMS44NDM3NSAyMi43NUMyLjE5MTQwNiAyMi45MTAxNTYgMi41NzAzMTMgMjMgMi45Njg3NSAyM0wxOC45Njg3NSAyM0MyMC41NzAzMTMgMjMgMjIuMDY2NDA2IDIyLjAzNTE1NiAyMi42ODc1IDIwLjU2MjVMMjIuNjg3NSAyMC41MzEyNUwyNS43ODEyNSAxMi4yMTg3NUwyNS43ODEyNSAxMi4xODc1QzI2LjA3ODEyNSAxMS40NTcwMzEgMjYuMDg1OTM4IDEwLjYwOTM3NSAyNS42NTYyNSA5Ljk2ODc1QzI1LjIyMjY1NiA5LjMxNjQwNiAyNC40MjU3ODEgOSAyMy42MjUgOUwyMiA5QzIyIDcuMzQzNzUgMjAuNjU2MjUgNiAxOSA2TDExIDZDMTEgNC4zNDM3NSA5LjY1NjI1IDMgOCAzIFogTSA3LjYyNSAxMUwyMy42MjUgMTFDMjMuOTI5Njg4IDExIDIzLjk5MjE4OCAxMS4wODIwMzEgMjQgMTEuMDkzNzVDMjQuMDA3ODEzIDExLjEwNTQ2OSAyNC4wNTQ2ODggMTEuMTYwMTU2IDIzLjkzNzUgMTEuNDM3NUwyMy45Mzc1IDExLjVMMjAuODQzNzUgMTkuNzgxMjVMMjAuODEyNSAxOS44MTI1QzIwLjU1NDY4OCAyMC4zNTkzNzUgMTkuNTY2NDA2IDIxIDE4Ljk2ODc1IDIxTDIuOTY4NzUgMjFDMi42NjQwNjMgMjEgMi42MzI4MTMgMjAuOTE3OTY5IDIuNjI1IDIwLjkwNjI1QzIuNjE3MTg4IDIwLjg5NDUzMSAyLjU3MDMxMyAyMC44Mzk4NDQgMi42ODc1IDIwLjU2MjVMMi42ODc1IDIwLjUzMTI1TDUuNzgxMjUgMTIuMjE4NzVDNS43ODUxNTYgMTIuMjA3MDMxIDUuODA4NTk0IDEyLjE5OTIxOSA1LjgxMjUgMTIuMTg3NUM2LjA3MDMxMyAxMS42NDA2MjUgNy4wMjczNDQgMTEgNy42MjUgMTFaIiBmaWxsPSIjMzMzNUNDIiAvPg0KPC9zdmc+");
    height:16px;
    width:16px;
    top: 1px;
}

.rct-icons-fa5 .rct-icon-parent-close{
    background: url("data:image/svg+xml;base64,77u/PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMjYgMjYiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+DQogIDxwYXRoIGQ9Ik0zIDJDMS4zNDM3NSAyIDAgMy4zNDM3NSAwIDVMMCAyMkMwIDIzLjY1NjI1IDEuMzQzNzUgMjUgMyAyNUwyMyAyNUMyNC42NTYyNSAyNSAyNiAyMy42NTYyNSAyNiAyMkwyNiA4QzI2IDYuMzQzNzUgMjQuNjU2MjUgNSAyMyA1TDExIDVDMTEgMy4zNDM3NSA5LjY1NjI1IDIgOCAyIFogTSAzIDdMMjMgN0MyMy41NTA3ODEgNyAyNCA3LjQ0OTIxOSAyNCA4TDI0IDIyQzI0IDIyLjU1MDc4MSAyMy41NTA3ODEgMjMgMjMgMjNMMyAyM0MyLjQ0OTIxOSAyMyAyIDIyLjU1MDc4MSAyIDIyTDIgOEMyIDcuNDQ5MjE5IDIuNDQ5MjE5IDcgMyA3WiIgZmlsbD0iIzMzMzVDQyIgLz4NCjwvc3ZnPg==");
    height:16px;
    width:16px;
    top: 1px;
}

.rct-icons-fa5 .rct-icon-expand-all::before {
    content: "\f0fe"
}

.rct-icons-fa5 .rct-icon-collapse-all::before {
    content: "\f146"
}

.rct-direction-rtl {
    direction: rtl
}

.rct-direction-rtl ol ol {
    padding-right: 24px;
    padding-left: 0
}

.rct-direction-rtl.rct-icons-fa5 .rct-icon-expand-close::before {
    content: "\f053"
}

* {
    -webkit-box-sizing: border-box;
    box-sizing: border-box
}

body {
    padding: 0;
    margin: 0;
    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #606c71
}

a {
    color: #1e6bb8;
    text-decoration: none
}

a:hover {
    text-decoration: underline
}

.btn {
    display: inline-block;
    margin-bottom: 1rem;
    color: rgba(255, 255, 255, .7);
    background-color: rgba(255, 255, 255, .08);
    border-color: rgba(255, 255, 255, .2);
    border-style: solid;
    border-width: 1px;
    border-radius: .3rem;
    -webkit-transition: color .2s, background-color .2s, border-color .2s;
    transition: color .2s, background-color .2s, border-color .2s
}

.btn:hover {
    color: rgba(255, 255, 255, .8);
    text-decoration: none;
    background-color: rgba(255, 255, 255, .2);
    border-color: rgba(255, 255, 255, .3)
}

.btn+.btn {
    margin-left: 1rem
}



.react-checkbox-tree {
    color: #444;
    font-family: Roboto, sans-serif
}

.clickable-labels {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex
}

.clickable-labels>* {
    width: 50%
}

.expand-all-container {
    max-width: 400px
}

.rct-node-icon .far {
    width: 1em;
    text-align: center
}


`;
const GlobalStyleDBview = createGlobalStyle`

@import url("http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"); 
#SectionsDBview {
    display: flex;
    height: 100%;
    position: relative;
    flex-direction: column;
}
#DBviewTree {
    width: 30%;
}
#DBviewData{
width: 67%;
/*height: inherit;*/
position: relative;
}
/* Базовый контейнер табов */
.tabs {
  min-width: 320px;
  position: absolute;
  padding: 0px;
  margin: 0 auto;
  margin-left: 20px; 
  width: 100%;
  height: 100%;
  display:none;
}
.tabs.activetabs
{
    display: block;
}
.tabs input
{
    display: none;
    margin: 3px 3px 0px 5px  
}
/* стили секций с содержанием */
.tabs section {
  display: none;
  padding: 10px;
  background: #fff;
  border: 1px solid #ddd;
  height: calc(100% - 40px);
}

.tabs section.contentactive {
  display: block;
  position: absolute;
    width: 100%;
}
/* стили вкладок (табов) */
.tabs label.tablbl {
  display: inline-block;
  margin: 0 0 -1px;
  padding-left: 15px;
    padding-right: 15px;
    padding-top: 5px;
    padding-bottom: 5px;
  font-weight: 600;
  text-align: center;
  color: #aaa;
  border: 1px solid #ddd;
  background: #f1f1f1;
  border-radius: 3px 3px 0 0;
}

/* изменения стиля заголовков вкладок при наведении */
.tabs label:hover {
  color: #888;
  cursor: pointer;
}
/* стили для активной вкладки */
.tabs label.activetab {
  color: #555;
  border: 1px solid #ddd;
  border-top: 2px solid #628cb6;
  border-bottom: 1px solid #fff;
  background: #fff;
}
/* активация секций с помощью переключателя :checked */

/* медиа запросы для различных типов носителей */ 




`;
const GlobalStyleGrid = createGlobalStyle`
.login-form-mask-box {
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 2;
	background-color: white;
	padding: 5px 10px 5px 10px;
	display: inline-block;
	position: absolute;
	text-align: center;
}

.login-form-mask-icon {
	width: 128px;
	height: 15px;
	display: inline-block;
	background-position: center;
	
}

.login-form-mask {
	opacity: 0.5;
	background-color: #ccc;
	position: absolute;
	zoom: 1;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	z-index: 1;
}
.lazy-scroll {
	position: relative;
	background: rgba(92, 148, 212, 0.418);
	width: 9px;
	border-radius: 4px;
	z-index: 2;
	cursor: pointer;
	opacity: 0;
	transition: opacity 0.25s linear;
}

.grid-table:hover .lazy-scroll,
.grid-table:active .lazy-scroll {
  opacity: 1;
}

.grid-panel {
	border: 2px solid #88b7e0;
}

.grid-column {
	border-right: 1px solid #d0d0d0;
	border-bottom: 1px solid #d0d0d0;
	color: #404040;
	font: 400 13px/19px 'Open Sans', 'Helvetica Neue', helvetica, arial, verdana, sans-serif;
	outline: 0;
	background-color: #fff;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	-ms-box-sizing: border-box;
	-webkit-box-sizing: border-box;
    overflow: hidden;
}

.column-header-text {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 2px;
}
.grid-column:hover {
    background-image: none;
    background-color: #eaeff4;
}

.grid-column:active {
    background-image: none;
    background-color: #9cc5e9;
}

.grid-column-size {
	cursor: col-resize;
    z-index: 2;
}

.grid-size-marker {
	width: 3px;
	background-color: #0f0f0f;
	position: absolute;
	cursor: col-resize;
	z-index: 7;
}

.grid-drag-zone {
	position: fixed;
	opacity: 0.6;
	z-index: 7;
	padding: 4px;
}

.col-move-top, .col-move-bottom {
	width: 9px;
	height: 9px;
	position: fixed;
	top: 0;
	line-height: 0;
	font-size: 0;
	overflow: hidden;
	z-index: 20000;
	background: no-repeat left top transparent;
}

.col-move-top {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGMERBNEVBOTc4RUQxMUUyQTFFQkQ0M0Y5RUJBMDMxNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGMERBNEVBQTc4RUQxMUUyQTFFQkQ0M0Y5RUJBMDMxNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkYwREE0RUE3NzhFRDExRTJBMUVCRDQzRjlFQkEwMzE2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkYwREE0RUE4NzhFRDExRTJBMUVCRDQzRjlFQkEwMzE2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k/H0TQAAAThJREFUeNpiZEAAxv4tycai0vynIdz/DK+efDIt8p17FswBAiYkxUyPbr3mQ+IzPLoN5sPVsCCb/OXTL3ZGBkYGEAKp+frxJzsDlIduMti2/xAbGf7//wtU9h9FFqSLec7RnCygGuWf3//I8YtwBzIyghT/Z/jw5ut6Dk7WRwyMjHdTrCdPA5nMfHzHrRMsrKyh/CI8gYxQGxiBOgSAfBZWltBj228cB6ljBpl+/tDdPx/ffbuiZSrrxMrGzM3wnxHsnJ/ffr9e2Lk/a8Os49eA6r4yQ4Pl74PrL7++fv7xqp6Foh0zGyPXz6+/38xu2lN4dOs1UFC+BeLfyG7nBGIlKy/N6Km706+Yu2tEA/mKUHFGBuRggbI5gFgMiPmB+CMQvwLiH7BIYUQNOjCfFYp/QzE8/AACDAATU2xb7K2RJAAAAABJRU5ErkJggg==');

	/*background-image: url('../images/col-move-top.png');*/
}
.col-move-bottom {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxNjFBMTkyMjc5MkExMUUyQTFFQkQ0M0Y5RUJBMDMxNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxNjFBMTkyMzc5MkExMUUyQTFFQkQ0M0Y5RUJBMDMxNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjE2MUExOTIwNzkyQTExRTJBMUVCRDQzRjlFQkEwMzE2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE2MUExOTIxNzkyQTExRTJBMUVCRDQzRjlFQkEwMzE2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+2nCebQAAAThJREFUeNpiZEAFjH2bk1WEJXnnvnn+OanYd+5doNh/mCQTssKW5dHqIlJ8+1hYmGxFJHn2Ny2NVgOJoytmbF4WrS6nJrabiYlBBiTPzMwiI68utqd5WQxcAyPExBh1OVXR3UzMTDKMYGGIzYz/mRj+/Pv75MGNVy510UtvgUxm5hXg8Hv+4N2BJ3de7wep+/8fYs7ju6/3P7//7gC/EKc/SB3IHDYgFgJiMc9YY/OYYvtZDP8ZgXr+MSzrO5K2bfHpk0C5V0D8jgVI/AXij0D8U0iMRxmkEAQZGJkYBMW43gDFHwPxD5A6mOLvQPybi5cDJAg08z8DyGwuXnYQ/zMQ/0EPOrBjQdYzwgLrPyNqJCCxmYFYHIiVgZgf6jRQpLyE2o6iGMTmAGJuqKd/AfFXqHvB4QMQYAAOWGBjZyBLhwAAAABJRU5ErkJggg==');

	/*background-image: url('../images/col-move-bottom.png');*/
}

.grid-with-row-lines .grid-item {
	border-style: none;
	border-width: 0px 0 0;
	border-color: #e9e9e9;
}

.grid-data {
	position: relative;
	border-spacing: 0px;
	-webkit-border-vertical-spacing: 0px;
	-webkit-border-horizontal-spacing: 0px;
}

.grid-item {
	color: #404040;
	font: 300 13px/19px 'Open Sans', 'Helvetica Neue', helvetica, arial, verdana, sans-serif;
	background-color: #fff;
	table-layout: fixed;
	outline: none;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -webkit-box-sizing: border-box;
	border-spacing: 0px;
}

.grid-item-alt {
    background-color: #f6f6f6;
}

.grid-indicator {
    background-color: #728dc0;
}

.grid-groups {
    background-color: #728dc0;
	display: table;
	text-align: center;
	align-items: center;
	color: white;
}

.grid-filter {
	display: table;
	padding: 0px;
}

.grid-filter:focus { 
	outline:none;
	border-color:#9ecaed;
	box-shadow:0 0 10px #9ecaed;
}

.grid-item-selected {
    color: #404040;
    background-color: #ffefbb;
}

.grid-item-focused {
    outline: solid;
	outline-color: #88b7e0;
	outline-width: 1px;
}
.grid-row {
	outline: none;
	box-sizing: border-box;
	border-spacing: 0px;
}

.grid-item-over {
    color: #404040;
    background-color: #eaeff4;
}

.grid-td {
	overflow: hidden;
	border-width: 0;
	vertical-align: top;
	margin: 0px;
	border-spacing: 0px;
	padding: 0px;
	border-color:#ededed;
	border-style:solid;
	border-width:1px 0;
	border-top-color:#fafafa;	
	border-right: 1px solid #d0d0d0;
}

.grid-cell-inner {
	position: relative;
	text-overflow: ellipsis;
	padding: 1px 3px 1px;
	overflow: hidden;
	white-space: nowrap;
}

.collapse-img {
    width: 15px;
    height: 15px;
    background-image: url('data:image/gif;base64,R0lGODlhQAAUAMZaACYmJllZWRzE9y3I9y3J9y7I9y7J92HW+Xfc+oWFhYiIiJiYmKGhoaampqmpqby8vILf+6Xk+aXm+6fk+abm+6jn+6nn+67n+q/n+q7o+rDo+7Po+7Pp+8nJyd/f38Xu/Mfv/Mjv/M3u+8rw/NDv+9Dy/dXw+tfx/Nfy/Nny/Nry/Nzy+93y+9/z+9zz/N70/eLi4unp6ezs7O3t7e7u7uDz++H0++P0++L1/eP2/eX1++b1++f2++T2/eX2/eb3/ef3/ej2++j3/er3/Ov3/O33/On4/er4/ev4/ev4/u/4++34/Oz5/u35/u74/O/4/O75/u/5/u/6/vLy8vH4+/L5+/P5+/D4/PD6/vH6/v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEKAH8ALAAAAABAABQAAAfIgH+Cg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmahkxCm4QdU59/PQgfo38NDjCRDwqJLwIEEpEZBzuJDTMMHo8PAACJKgIYAxSPEwICNrl/Mgs0jb8BwYgoAiIXBCCNEQIQAi3NfzEJM4vT1Ikn2CQcAiWLyRDgNc3P0Yrp6ogpAiQaDIRYlOEbPQE3cu3qtUgBMGCvELkQsIFABUYHlCk7ECTXqk84BBSw0GiHjRY1bgR5kijUKCMIRqCamQXKzJs4c+rcybNnoUAAOw==');

    /*background-image: url(../images/arrows.gif);*/
	vertical-align: top;
    border: 0;
    cursor: pointer;
}

.collapse-plus {
    background-position: -2px -2px
}
.collapse-plus:hover {
    background-position:-34px -2px
}

.collapse-minus {
    background-position: -18px -3px
}
.collapse-minus:hover {
    background-position:-50px -3px
}

.column-sort-asc::after {
    content: "\f176";
    font: 14px/1 FontAwesome;
    color: #919191;
    text-align: center;
    margin-left: 3px;
    width: 14px;
}
.column-sort-desc:after {
    content: "\f175";
    font: 14px/1 FontAwesome;
    color: #919191;
    text-align: center;
    margin-left: 3px;
    width: 14px;
}

ul.pagination {
    display: inline-block;
    padding: 0;
    margin: 0;
    z-index: 7;
}

ul.pagination li {
    display: inline;
}

ul.pagination li a {
    color: black;
    float: left;
    padding: 1px 3px;
    text-decoration: none;
    transition: background-color .3s;
    border: 1px solid #ddd;
    font-size: 14px;
}

ul.pagination li a:hover:not(.active) {
    background-color: #ddd;
}
`
const GlobalStyleDocTabs = createGlobalStyle`
#DocTabsBtn {
    display: flex;
    overflow: hidden;
}
#DocTabsContent
{
    /*position: absolute;*/
    width: 100%;
    /*height: 100%;*/
}
.TabDoc {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ddd;
    text-decoration: none;
    padding: .25rem .75rem;
    color: #B3B3B3;
    background: #E7E7E7;
    margin-left: .25rem;
    max-width: 150px;
    white-space: nowrap; 
}

.TabDocActiv {
    font-weight: bold;
    border-bottom-color: #fff;
    background: #fff;
    color: #186baa;
    
}
.TabDocContent
{
    display: none;
    position: relative;
    height: inherit;
    margin-top: 20px;
}
.TabDocContent.TabDocContentActiv
{
    display: block;
   /* position: absolute;
    width: 100%;*/
}
.TabDoc span {
    width: calc(100% - 25px);
    height: 100%;
    cursor: pointer;
    overflow: hidden;
}
.TabDocActiv span
{
    cursor: default !important;
}
.TabDoc.TabDocActiv .btnCloseTab {
    background: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M15.125 12.28125L12.28125 15.125L22.21875 25L12.28125 34.875L15.125 37.71875L25.0625 27.84375L35 37.71875L37.8125 34.875L27.90625 25L37.8125 15.125L35 12.28125L25.0625 22.15625Z"  /></svg>');
    cursor: pointer;
    height: 20px;
    width: 20px;
    display: block;
}
.btnCloseTab:hover {
    background: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path fill = "red" d="M15.125 12.28125L12.28125 15.125L22.21875 25L12.28125 34.875L15.125 37.71875L25.0625 27.84375L35 37.71875L37.8125 34.875L27.90625 25L37.8125 15.125L35 12.28125L25.0625 22.15625Z"  /></svg>') !important;
}
.TabDoc .btnCloseTab
{
display: none;
}
.btnScrollTabDocLeft
{
    position: absolute;
   height: 30px;
   width: 30px;
   background: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 3C8.832031 3 3 8.832031 3 16C3 23.167969 8.832031 29 16 29C23.167969 29 29 23.167969 29 16C29 8.832031 23.167969 3 16 3 Z M 16 5C22.085938 5 27 9.914063 27 16C27 22.085938 22.085938 27 16 27C9.914063 27 5 22.085938 5 16C5 9.914063 9.914063 5 16 5 Z M 14.21875 9.28125L12.78125 10.71875L18.0625 16L12.78125 21.28125L14.21875 22.71875L20.21875 16.71875L20.90625 16L20.21875 15.28125Z" fill="red" /></svg>'); 
}
.btnScrollTabDocRight
{
    position: absolute;
   height: 30px;
   width: 30px;
   background: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 3C8.832031 3 3 8.832031 3 16C3 23.167969 8.832031 29 16 29C23.167969 29 29 23.167969 29 16C29 8.832031 23.167969 3 16 3 Z M 16 5C22.085938 5 27 9.914063 27 16C27 22.085938 22.085938 27 16 27C9.914063 27 5 22.085938 5 16C5 9.914063 9.914063 5 16 5 Z M 17.78125 9.28125L11.78125 15.28125L11.09375 16L11.78125 16.71875L17.78125 22.71875L19.21875 21.28125L13.9375 16L19.21875 10.71875Z" fill="red" /></svg>'); 
}
`
const GlobalStyleDropList = createGlobalStyle`
.css-b62m3t-container {
    position: relative;
    box-sizing: border-box;
}
.css-7pg0cj-a11yText {
    z-index: 9999;
    border: 0px;
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    width: 1px;
    position: absolute;
    overflow: hidden;
    padding: 0px;
    white-space: nowrap;
}
.css-1s2u09g-control {
    -webkit-box-align: center;
    align-items: center;
    background-color: rgb(255, 255, 255);
    border-color: rgb(204, 204, 204);
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    cursor: default;
    display: flex;
    flex-wrap: wrap;
    -webkit-box-pack: justify;
    justify-content: space-between;
   /* min-height: 38px;*/
    position: relative;
    transition: all 100ms ease 0s;
    box-sizing: border-box;
    outline: 0px !important;
}
.css-1d8n9bt {
    -webkit-box-align: center;
    align-items: center;
    display: grid;
    flex: 1 1 0%;
    flex-wrap: wrap;
    padding: 2px 8px;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
}
.css-14el2xx-placeholder {
    color: rgb(128, 128, 128);
    grid-area: 1 / 1 / 2 / 3;
    margin-left: 2px;
    margin-right: 2px;
    box-sizing: border-box;
}
.css-1hac4vs-dummyInput {
    background: 0px center;
    border: 0px;
    caret-color: transparent;
    font-size: inherit;
    grid-area: 1 / 1 / 2 / 3;
    outline: 0px;
    padding: 0px;
    width: 1px;
    color: transparent;
    left: -100px;
    opacity: 0;
    position: relative;
    transform: scale(0.01);
}
.css-1wy0on6 {
    -webkit-box-align: center;
    align-items: center;
    align-self: stretch;
    display: flex;
    flex-shrink: 0;
    box-sizing: border-box;
}
.css-1okebmr-indicatorSeparator {
    align-self: stretch;
    background-color: rgb(204, 204, 204);
    margin-bottom: 8px;
    margin-top: 8px;
    width: 1px;
    box-sizing: border-box;
}
.css-tlfecz-indicatorContainer {
    color: rgb(204, 204, 204);
    display: flex;
    /*padding: 8px;*/
    transition: color 150ms ease 0s;
    box-sizing: border-box;
}
.css-8mmkcg {
    display: inline-block;
    fill: currentcolor;
    line-height: 1;
    stroke: currentcolor;
    stroke-width: 0;
}
.css-1pahdxg-control:hover {
    border-color: rgb(38, 132, 255);
}

.css-1pahdxg-control {
    -webkit-box-align: center;
    align-items: center;
    background-color: rgb(255, 255, 255);
    border-color: rgb(38, 132, 255);
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    box-shadow: rgb(38 132 255) 0px 0px 0px 1px;
    cursor: default;
    display: flex;
    flex-wrap: wrap;
    -webkit-box-pack: justify;
    justify-content: space-between;
    min-height: 38px;
    position: relative;
    transition: all 100ms ease 0s;
    box-sizing: border-box;
    outline: 0px !important;
}
.css-tlfecz-indicatorContainer:hover {
    color: rgb(153, 153, 153);
}
.css-1s2u09g-control:hover {
    border-color: rgb(179, 179, 179);
}
.css-26l3qy-menu {
    top: 100%;
    background-color: rgb(255, 255, 255);
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 0px 1px, rgb(0 0 0 / 10%) 0px 4px 11px;
    margin-bottom: 8px;
    margin-top: 4px;
    position: absolute;
    width: 100%;
    z-index: 1;
    box-sizing: border-box;
}
.css-9gakcf-option {
    background-color: rgb(38, 132, 255);
    color: rgb(255, 255, 255);
    cursor: default;
    display: block;
    font-size: inherit;
    padding: 0px 12px;
    width: 100%;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    box-sizing: border-box;
}
.css-11unzgr {
    max-height: 300px;
    overflow-y: auto;
    /*padding-bottom: 4px;
    padding-top: 4px;*/
    position: relative;
    box-sizing: border-box;
}
.css-1n7v3ny-option {
    background-color: rgb(222, 235, 255);
    color: inherit;
    cursor: default;
    display: block;
    font-size: inherit;
    padding: 8px 12px;
    width: 100%;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    box-sizing: border-box;
}
.css-165luzk-option {
    background-color: transparent;
    color: rgb(204, 204, 204);
    cursor: default;
    display: block;
    font-size: inherit;
    padding: 0px 12px;
    width: 100%;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    box-sizing: border-box;
}
.css-yt9ioa-option {
    background-color: transparent;
    color: inherit;
    cursor: default;
    display: block;
    font-size: inherit;
    padding: 0px 12px;
    width: 100%;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    box-sizing: border-box;
}
`
const GlobalStyleCheckBox = createGlobalStyle`
.label-cbx {
    user-select: none;
    cursor: pointer;
    margin-bottom: 0;
  }
  .label-cbx input:checked + .checkbox {
    border-color: #628cb6;
  }
  .label-cbx input:checked + .checkbox svg path {
    fill: #628cb6;
  }
  .label-cbx input:checked + .checkbox svg polyline {
    stroke-dashoffset: 0;
  }
  .label-cbx:hover .checkbox svg path {
    stroke-dashoffset: 0;
  }
  .label-cbx .checkbox {
    position: relative;
    top: 2px;
    float: left;
    margin-right: 8px;
    width: 20px;
    height: 20px;
    border: 2px solid #C8CCD4;
    border-radius: 3px;
  }
  .label-cbx .checkbox svg {
    position: absolute;
    top: -2px;
    left: -2px;
  }
  .label-cbx .checkbox svg path {
    fill: none;
    stroke: #628cb6;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 71px;
    stroke-dashoffset: 71px;
    transition: all 0.6s ease;
  }
  .label-cbx .checkbox svg polyline {
    fill: none;
    stroke: #FFF;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 18px;
    stroke-dashoffset: 18px;
    transition: all 0.3s ease;
  }
  .label-cbx > span {
    pointer-events: none;
    vertical-align: middle;
  }
  
  .cntr {
    left: 0;
    width: 100%;
    position: relative;
  }
  
  .invisible {
    position: absolute;
    z-index: -1;
    width: 0;
    height: 0;
    opacity: 0;
  }
`
export {GlobalStyleTree}
export {GlobalStyleDBview}
export {GlobalStyleGrid}
export {GlobalStyleDocTabs}
export {GlobalStyleDropList}
export {GlobalStyleCheckBox}