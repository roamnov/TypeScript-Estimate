import { Splitter, SplitterItem, SplitterBar } from 'smart-webcomponents-react/splitter';
import { Tree, TreeItem, TreeItemsGroup } from 'smart-webcomponents-react/tree';
import { XMLrequest } from '../../../../components/Url';
export default function SectionDocuments(props) {
  let params = new Map();
  params.set('prefix', 'documents');
  params.set('comand', 'GetSectionDocs');
  params.set('SectionID', props.id);
  let documents = XMLrequest(params);
  function AddGroup(items) {
    let parent = items.shift()

    let Group = <TreeItemsGroup>
      {parent.Name}
      {items.map((it)=>{return AddItem(it)})}
    </TreeItemsGroup>


    return Group
  }
  function AddItem(item) {
    return <TreeItem>{item.Name}</TreeItem>
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
    let TreeDoc = <Tree showRootLines showLines hasThreeStates style = {{width: "100%"}} >
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
    <SplitterItem size="80%" collapsible id={"item_Param_Grid_" + props.id}>
      <Splitter style={{ height: "100%", width: "100%" }}>
        <SplitterItem size="20%" collapsible id={"item_Param_" + props.id}>
          <div style={{ height: "100%" }}>
            Параметры
          </div>
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