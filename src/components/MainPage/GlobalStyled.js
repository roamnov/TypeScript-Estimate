import styled, { createGlobalStyle } from 'styled-components';
import * as React from 'react';
import ReactDOM from 'react-dom';

const GlobalStyleTree = createGlobalStyle`
::-webkit-scrollbar { 
    width: 0px;  
    background: transparent;  
}
html {
    -ms-overflow-style: none;  /* IE 10+ */
    scrollbar-width: none; /* Firefox */
}

#FolderIcon
{
    width: 24px;
    height: 24px;
    background: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 2400"><path fill="#dbb065" d="M1.5 35.5L1.5 4.5 11.793 4.5 14.793 7.5 38.5 7.5 38.5 35.5z"/><path fill="#967a44" d="M11.586,5l2.707,2.707L14.586,8H15h23v27H2V5H11.586 M12,4H1v32h38V7H15L12,4L12,4z"/></svg>');
}

ul>li {
    list-style-type: none
}

.tree-leaf-1, .tree-leaf-0 {
    letter-spacing: 0;
    cursor: pointer;
}

.ul-item-list {
    transition: height 1s;
}

.tree-leaf-1:hover {
    cursor: pointer;
    font-weight: 600
}

.tree-leaf-0 span:hover {
    cursor: pointer;
    font-weight: 600;
}

.tree-leaf-1 span.active, .tree-leaf-0 span.active {
    text-decoration: underline;
    cursor: pointer;
    font-weight: 600;
}

li>button>svg:first-child:hover {
    transform: scale(1.2);
}

li>button>svg+svg>path {
    color: goldenrod;
}
`;
const GlobalStyleDBview = createGlobalStyle`
#DBviewTree {
    width: 30%;
}
#DBviewData{
width: 67%;
/*height: inherit;*/
position: relative;
}
#DBviewTabsButtons {
    display: flex;
    cursor: pointer;
}

#SectionsDBview {
    display: flex;
    height: 100%;
    position: relative;
   /* position: absolute;
    width: 100%;*/
}

.DBviewTabs {
    width: 100%;
    overflow-x: scroll;
    font-family: sans-serif;
}
#DBviewData .ActivTabs
{
    display: block;
    height: inherit;
}
#DBviewData .noActivTabs
{
    display: none;
}
.DBviewTabs .ContentTab, .DBviewTabs input[type='radio'] {
    display: none;
}

.DBviewTabs .ContentTab {
    background-color: #fff;
    width: inherit;
    height: inherit;
    max-width: 100%;
    padding: 20px;
    float: left;
    /*position: absolute;*/
}

.DBviewTabs >input + label {
    display: inline-block;
    border: 1px solid #ddd;
    text-decoration: none;
    padding: 0.25rem 0.75rem;
    color: #B3B3B3;
    background: #E7E7E7;
    margin-left: 0.25rem;
    
}

.DBviewTabs input:checked+label {
    font-weight: bold;
    border-bottom-color: #fff;
    background: #fff;
    color: #186baa;
}

.DBviewTabs input:checked+label+.ContentTab {
    display: block;
}
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
export  {GlobalStyleTree}
export {GlobalStyleDBview}
export {GlobalStyleGrid}
export {GlobalStyleDocTabs}