import { Splitter, SplitterItem, SplitterBar } from 'smart-webcomponents-react/splitter';
import { Tree, TreeItem, TreeItemsGroup } from 'smart-webcomponents-react/tree';
import { XMLrequest } from '../../../../components/Url';
import Params from './Params';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
export default function SectionDocuments(props) {

  let params = new Map();
  params.set('prefix', 'documents');
  params.set('comand', 'GetSectionDocs');
  params.set('SectionID', props.id);

  let documents = XMLrequest(params);
  function ClickDoc(ev) {
    if (ev.target.classList.length > 1) {
      return false
    }
    let dataSource = new Map();
    let doc = ev.currentTarget.ariaLevel
    let p = document.getElementById("ParamsDoc" + props.id)
    let container = p.children[0]
    let dataP, param, id
    if (container) {
      id = container.children[0].id
      id = id.split("_")
      id = id[2]
      if (p.dataSource) {
        dataSource = p.dataSource
        dataSource.set(id, container);
        p.dataSource = dataSource
        param = dataSource.get(doc)
      }
      else {
        dataSource.set(id, container);
        p.dataSource = dataSource
      }

    }

    if (!param) {
      let params = new Map();
      params.set('prefix', 'documents');
      params.set('comand', 'GetDocumentLayout');
      params.set('SectionID', props.id);
      params.set('DocCfgID', doc);
      let documents = XMLrequest(params);
      if (documents.Params) {
        container = document.createElement("div")
        // container.id = 
        p.innerHTML = ''
        p.appendChild(container)
        // p.innerHTML = ''
        var par = <Params id={doc} SectionID={props.id} data={documents.Params} />
        ReactDOM.render(par, container)
        //p.innerHTML = ""
        //p.appendChild(container.children[0])
      }
    }
    else {
      p.innerHTML = ""
      p.appendChild(param)
    }
    ev.stopPropagation();
  }
  function AddGroup(items) {
    let parent = items.shift()

    let Group = <TreeItemsGroup
      ariaLevel={parent.DocCfgID} onClick={ClickDoc}>
      {parent.Name}
      {items.map((it) => { return AddItem(it) })}
    </TreeItemsGroup>


    return Group
  }
  function AddItem(item) {
    return <TreeItem ariaLevel={item.DocCfgID} onClick={ClickDoc}>{item.Name}</TreeItem>
  }
  function CreateDocuments(data) {
    let list = [], items = [], DeepNext
    let dataSource = []
    for (let i = 0; i <= data.length - 1; i++) {
      let Deep = data[i].Deep ? data[i].Deep : 0
      if (data[i + 1])
        DeepNext = data[i + 1].Deep ? data[i + 1].Deep : 0
      if ((DeepNext - Deep) == 1) {
        items.push(data[i])
        while ((DeepNext - Deep) == 1) {
          i++
          items.push(data[i])
          if (data[i + 1])
            DeepNext = data[i + 1].Deep ? data[i + 1].Deep : 0
          else
            DeepNext = 0
        }
        list.push(AddGroup(items))
        items = []
      }
      else
        list.push(AddItem(data[i]))

    }
    let TreeDoc = <Tree showRootLines showLines hasThreeStates style={{ border: 0, width: "100%" }} >
      {
        list
      }
    </Tree>
    return TreeDoc
  }
  return <Splitter style={{ height: "100%", width: "100%" }} id={"Tree_Doc_" + props.id}>
    <SplitterItem size="20%" collapsible id={"item_Tree_Doc_" + props.id}>
      <div style={{ height: "100%" }} >
        {
          CreateDocuments(documents)
        }
      </div>
    </SplitterItem>
    <SplitterItem size="80%" id={"item_Param_Grid_" + props.id}>
      <Splitter style={{ height: "100%", width: "100%" }}>
        <SplitterItem size="20%" id={"item_Param_" + props.id}>
          <div style = {{height: "calc(100% - 37px)", overflow: "auto"}} id={"ParamsDoc" + props.id}>

          </div>
          <Button style ={{bottom: 0, width: "100%"}} variant="contained">Применить</Button>
        </SplitterItem>
        <SplitterItem size="80%" id={"item_Grid_" + props.id}>
          <div style={{ height: "100%", width: "100%" }}>
            Грид
          </div>
        </SplitterItem>
      </Splitter>
    </SplitterItem>
  </Splitter>
}