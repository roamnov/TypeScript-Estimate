import * as React from 'react';
import ReactDOM from 'react-dom';
export default function DropList(props) {
  let DropList, list;
  if (props.list)
  {
    props.list.split(',')
  }
  DropList = <div class = "droplist">
    <label>{props.text}</label>
    <div style={{ width: props.width }}>
      <span></span>
    </div>
    <div class = "droplist list">
      <ul>

      </ul>
    </div>
  </div>
  return DropList
}